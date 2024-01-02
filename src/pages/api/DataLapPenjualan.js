import { rupiah } from "../../../components/AllComponent";
import handlerQuery from "../../../lib/db";
import dayjs from "dayjs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = req.query;
    const { Awal, Akhir, tujuan } = query;
    let queryUtama;
    let queryJumlah;
    let queryTotal;
    let values;

    if (Awal !== "" && Akhir !== "") {
      queryUtama =
        "SELECT time_stamp,transaksi_penjualan.no_transaksi,jenis_pelanggan,jenis_pembayaran,item.nama as nama_item,jumlah,harga_per_satuan,subtotal,biaya_racik,diskon,total " +
        "FROM detail_transaksi_penjualan inner join transaksi_penjualan on detail_transaksi_penjualan.no_transaksi=transaksi_penjualan.no_transaksi " +
        "inner join item on item.id_item =detail_transaksi_penjualan.id_item " +
        "where time_stamp between ? and ? " +
        "order by time_stamp,detail_transaksi_penjualan.no_transaksi";
      queryJumlah =
        "SELECT sum(jumlah) as jumlah " +
        "FROM detail_transaksi_penjualan inner join transaksi_penjualan on detail_transaksi_penjualan.no_transaksi=transaksi_penjualan.no_transaksi " +
        "where time_stamp between ? and ?";
      queryTotal =
        "SELECT sum(total) as total " +
        "FROM transaksi_penjualan " +
        "where time_stamp between ? and ? ";
      values = [Awal + " 00:00:00", Akhir + " 23:59:59"];
    } else {
      queryUtama =
        "SELECT time_stamp,transaksi_penjualan.no_transaksi,jenis_pelanggan,jenis_pembayaran,item.nama as nama_item,jumlah,harga_per_satuan,subtotal,biaya_racik,diskon,total " +
        "FROM detail_transaksi_penjualan inner join transaksi_penjualan on detail_transaksi_penjualan.no_transaksi=transaksi_penjualan.no_transaksi " +
        "inner join item on item.id_item =detail_transaksi_penjualan.id_item " +
        "order by time_stamp,detail_transaksi_penjualan.no_transaksi";
      queryJumlah =
        "SELECT sum(jumlah) as jumlah " + "FROM detail_transaksi_penjualan";
      queryTotal = "SELECT sum(total) as total " + "FROM transaksi_penjualan";
      values = [];
    }
    try {
      const hasil = await handlerQuery({ query: queryUtama, values });
      const jumlah = await handlerQuery({ query: queryJumlah, values });
      const total = await handlerQuery({ query: queryTotal, values });
      if (tujuan === "PDF") {
        for (let i = 0; i < hasil.length; i++) {
          hasil[i].harga_per_satuan = rupiah.format(hasil[i].harga_per_satuan);
          hasil[i].subtotal = rupiah.format(hasil[i].subtotal);
          hasil[i].total = rupiah.format(hasil[i].total);
          hasil[i].biaya_racik = rupiah.format(hasil[i].biaya_racik);
          hasil[i].time_stamp = dayjs(hasil[i].time_stamp)
            .locale("id")
            .format("LL");
          hasil[i].jenis_pelanggan = hasil[i].jenis_pelanggan.toUpperCase();
          hasil[i].jenis_pembayaran = hasil[i].jenis_pembayaran.toUpperCase();
          hasil[i].diskon = rupiah.format(hasil[i].diskon);
        }
        total[0].total = rupiah.format(total[0].total);
      } else if (tujuan === "EXCEL") {
        for (let i = 0; i < hasil.length; i++) {
          hasil[i].time_stamp = dayjs(hasil[i].time_stamp)
            .locale("id")
            .format("LL");
          hasil[i].jenis_pelanggan = hasil[i].jenis_pelanggan.toUpperCase();
          hasil[i].jenis_pembayaran = hasil[i].jenis_pembayaran.toUpperCase();
        }
      }

      res.status(200).send({ hasil, jumlah, total });
    } catch (e) {
      res.status(500).send("GAGAL MENDAPATKAN DATA");
    }
  }
}
