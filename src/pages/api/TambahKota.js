import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { namaKota, tipe } = req.body;
    const query = "INSERT INTO kota(nama_kota,tipe) VALUES(?,?)";
    const values = [namaKota.toUpperCase(), tipe];

    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENAMBAHKAN KOTA");
    } catch (e) {
      res.status(500).send("GAGAL MENAMBAHKAN KOTA");
    }
  }
}
