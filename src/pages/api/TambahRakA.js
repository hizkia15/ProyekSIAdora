import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { namaRak } = req.body;
    const query = "INSERT INTO rak(nama_rak) VALUES(?)";
    const values = [namaRak];

    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENAMBAHKAN RAK");
    } catch (e) {
      res.status(500).send("GAGAL MENAMBAHKAN RAK");
    }
  }
}
