import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { Nama, Stok_Minimum, Rak, Satuan, Jenis, IdItem, Margin } = req.body;
    const query =
      "UPDATE item set nama=?, stok_min=?, id_rak=?, id_satuan=?,id_jenis_item=?,margin=? where id_item=?";

    const values = [Nama, Stok_Minimum, Rak, Satuan, Jenis, Margin, IdItem];

    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENGUPDATE ITEM");
    } catch (e) {
      res.status(500).send("GAGAL MENGUPDATE ITEM");
    }
  }
}
