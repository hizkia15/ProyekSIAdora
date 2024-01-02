import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { namaJenis } = req.body;
    const query = "INSERT INTO jenis(nama) VALUES(?)";
    const values = [namaJenis];

    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENAMBAHKAN JENIS ITEM");
    } catch (e) {
      res.status(500).send("GAGAL MENAMBAHKAN JENIS ITEM");
    }
  }
}
