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
        "SELECT time_stamp,transaksi_pembelian.no_faktur,kode_supplier,item.nama as nama_item,jumlah,harga_per_satuan,subtotal,total " +
        "FROM detail_transaksi_pembelian inner join transaksi_pembelian on detail_transaksi_pembelian.no_faktur=transaksi_pembelian.no_faktur " +
        "inner join item on item.id_item =detail_transaksi_pembelian.id_item  " +
        "inner join supplier on supplier.id_supplier=transaksi_pembelian.id_supplier " +
        "where time_stamp between ? and ? " +
        "order by time_stamp,detail_transaksi_pembelian.no_faktur";
      queryJumlah =
        "SELECT sum(jumlah) as jumlah " +
        "FROM detail_transaksi_pembelian inner join transaksi_pembelian on detail_transaksi_pembelian.no_faktur=transaksi_pembelian.no_faktur " +
        "where time_stamp between ? and ? ";
      queryTotal =
        "SELECT sum(total) as total " +
        "FROM transaksi_pembelian " +
        "where time_stamp between ? and ? ";
      values = [Awal + " 00:00:00", Akhir + " 23:59:59"];
    } else {
      queryUtama =
        "SELECT time_stamp,transaksi_pembelian.no_faktur,kode_supplier,item.nama as nama_item,jumlah,harga_per_satuan,subtotal,total " +
        "FROM detail_transaksi_pembelian inner join transaksi_pembelian on detail_transaksi_pembelian.no_faktur=transaksi_pembelian.no_faktur " +
        "inner join item on item.id_item =detail_transaksi_pembelian.id_item  " +
        "inner join supplier on supplier.id_supplier=transaksi_pembelian.id_supplier " +
        "order by time_stamp,detail_transaksi_pembelian.no_faktur";
      queryJumlah =
        "SELECT sum(jumlah) as jumlah " + "FROM detail_transaksi_pembelian";
      queryTotal = "SELECT sum(total) as total " + "FROM transaksi_pembelian";

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
          hasil[i].time_stamp = dayjs(hasil[i].time_stamp)
            .locale("id")
            .format("LL");
        }

        total[0].total = rupiah.format(total[0].total);
      } else if (tujuan === "EXCEL") {
        for (let i = 0; i < hasil.length; i++) {
          hasil[i].time_stamp = dayjs(hasil[i].time_stamp)
            .locale("id")
            .format("LL");
        }
      }

      res.status(200).send({ hasil, jumlah, total });
    } catch (e) {
      res.status(500).send("GAGAL MENDAPATKAN DATA");
    }
  }
}
