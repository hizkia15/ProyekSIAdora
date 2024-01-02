import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nama } = req.body;
    const query = "select id_item from item where item.nama like ?";
    const values = ["%" + nama + "%"];
    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send(hasil);
    } catch (e) {
      res.status(500).send("Gagal mengambil data");
    }
  }
}
