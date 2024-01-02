import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { namaRak, id } = req.body;
    const query = "UPDATE rak set nama_rak=? where id_rak=?";
    const values = [namaRak, id];

    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENGUPDATE RAK");
    } catch (e) {
      res.status(500).send("GAGAL MENGUPDATE RAK");
    }
  }
}
