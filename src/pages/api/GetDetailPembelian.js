import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = req.query;
    const { faktur } = query;
    const queryDB =
      "select no_detail_pembelian,item.nama as nama,jumlah,subtotal,harga_per_satuan,satuan.nama as namaSatuan,total " +
      "from detail_transaksi_pembelian inner join item on item.id_item=detail_transaksi_pembelian.id_item " +
      "inner join satuan on satuan.id_satuan=item.id_satuan " +
      "inner join transaksi_pembelian on detail_transaksi_pembelian.no_faktur=transaksi_pembelian.no_faktur " +
      "where transaksi_pembelian.no_faktur=?";
    const values = [faktur];
    try {
      const hasil = await handlerQuery({ query: queryDB, values });
      res.status(200).send(hasil);
    } catch (e) {
      res.status(500).send("GAGAL MENDAPATKAN DETAIL PEMBELIAN");
    }
  }
}
