import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = req.query;
    const { no } = query;
    const queryDB =
      "select no_detail_penjualan,item.nama as namaItem,jumlah,subtotal,harga_per_satuan,jenis.nama as namaJenis,satuan.nama as namaSatuan,total " +
      "from detail_transaksi_penjualan inner join item on item.id_item=detail_transaksi_penjualan.id_item " +
      "inner join satuan on item.id_satuan=satuan.id_satuan inner join jenis on item.id_jenis_item=jenis.id_jenis " +
      "inner join transaksi_penjualan on detail_transaksi_penjualan.no_transaksi=transaksi_penjualan.no_transaksi " +
      "where transaksi_penjualan.no_transaksi=?";
    const values = [no];

    try {
      const hasil = await handlerQuery({ query: queryDB, values });
      res.status(200).send(hasil);
    } catch (e) {
      res.status(500).send("GAGAL MENDAPAT DETAIL TRANSAKSI PENJUALAN");
    }
  }
}
