import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { id, status } = req.body;
    const query = "UPDATE kota SET status=? where id_kota=?";
    const values = [status, id];

    try {
      const hasil = await handlerQuery({ query, values });
      if (hasil.affectedRows === 0) {
        throw new Error("DATA YANG AKAN DIUPDATE TIDAK DITEMUKAN");
      }
      res.status(200).send("BERHASIL MENGUPDATE STATUS KOTA");
    } catch (e) {
      res.status(500).send("GAGAL MENGUPDATE STATUS KOTA");
    }
  }
}
