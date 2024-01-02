import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { namaKota, id, tipe } = req.body;
    const query = "UPDATE kota set nama_kota=?,tipe=? where id_kota=?";
    const values = [namaKota.toUpperCase(), tipe, id];

    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENGUPDATE KOTA");
    } catch (e) {
      res.status(500).send("GAGAL MENGUPDATE KOTA");
    }
  }
}
