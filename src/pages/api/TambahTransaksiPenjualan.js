import { v4 as uuidv4 } from "uuid";
import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data, detailPenjualan, idUser } = req.body;

    const {
      Jenis_Pelanggan,
      Tipe_Pembayaran,
      Total_Tagihan,
      Biaya_Racik,
      PotonganRupiah,
    } = data;

    const date = new Date();

    const no_transaksi =
      "PNJ" +
      date.getDate().toString() +
      (date.getMonth() + 1).toString() +
      date.getFullYear().toString().toString() +
      date.getHours().toString() +
      date.getMinutes().toString() +
      date.getSeconds().toString() +
      date.getMilliseconds().toString();

    const query1 =
      "INSERT INTO transaksi_penjualan(no_transaksi,jenis_pelanggan,jenis_pembayaran,total,biaya_racik,diskon,idUser) VALUES(?,?,?,?,?,?,?)";

    const values1 = [
      no_transaksi,
      Jenis_Pelanggan,
      Tipe_Pembayaran,
      Total_Tagihan,
      Biaya_Racik,
      PotonganRupiah,
      idUser,
    ];

    const query2 =
      "INSERT INTO detail_transaksi_penjualan(no_transaksi,id_item,jumlah,subtotal,harga_per_satuan) VALUES(?,?,?,?,?)";

    try {
      await handlerQuery({ query: query1, values: values1 });
      for (let i = 0; i < detailPenjualan.length; i++) {
        await handlerQuery({
          query: query2,
          values: [
            no_transaksi,
            detailPenjualan[i].id_item,
            detailPenjualan[i].jumlah,
            detailPenjualan[i].subtotal,
            detailPenjualan[i].harga,
          ],
        });
      }
      res.status(200).send("BERHASIL MENAMBAH TRANSAKSI PENJUALAN");
    } catch (e) {
      res.status(500).send("GAGAL MENAMBAH TRANSAKSI PENJUALAN");
    }
  }
}
