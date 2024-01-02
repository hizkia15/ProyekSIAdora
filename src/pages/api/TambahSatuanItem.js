import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { namaSatuan } = req.body;
    const query = "INSERT INTO satuan(nama) VALUES(?)";
    const values = [namaSatuan];

    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENAMBAHKAN SATUAN ITEM");
    } catch (e) {
      res.status(500).send("GAGAL MENAMBAHKAN SATUAN ITEM");
    }
  }
}
