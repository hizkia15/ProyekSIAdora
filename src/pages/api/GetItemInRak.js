import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = req.query;
    const { rak } = query;
    const queryDB =
      "select item.id_item,item.stok,item.nama as namaItem,satuan.nama as namaSatuan,jenis.nama as namaJenis,rak.id_rak,nama_rak " +
      "from item inner join jenis on item.id_jenis_item=jenis.id_jenis inner join satuan on item.id_satuan=satuan.id_satuan " +
      "inner join rak on rak.id_rak=item.id_rak " +
      "where rak.id_rak=? and item.status=1 ";
    const values = [rak];
    try {
      const hasil = await handlerQuery({ query: queryDB, values });
      res.status(200).send(hasil);
    } catch (e) {
      res.status(500).send("GAGAL MENDAPAT ITEM");
    }
  }
}
