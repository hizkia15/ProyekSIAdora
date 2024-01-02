import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = req.query;
    const { idItem } = query;
    const queryDB =
      "select jenis.nama as nama_jenis,satuan.nama as nama_satuan,margin from " +
      "item inner join jenis on item.id_jenis_item=jenis.id_jenis inner join " +
      "satuan on satuan.id_satuan=item.id_satuan " +
      "where item.id_item=?";
    const values = [idItem];

    try {
      const hasil = await handlerQuery({ query: queryDB, values });
      res.status(200).send(hasil);
    } catch (e) {
      res.status(500).send("GAGAL MENDAPAT INFO");
    }
  }
}
