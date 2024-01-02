import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sendKodeKota, tujuan } = req.body;
    if (tujuan === "add") {
      const query = "select kode_kota from kota where kode_kota=?";
      const values = [sendKodeKota];

      try {
        const hasil = await handlerQuery({ query, values });
        if (hasil.length === 0) {
          res.status(200).send("available");
        } else {
          res.status(200).send("not available");
        }
      } catch (e) {
        res.status(500).send(e.message);
      }
    } else if (tujuan === "edit") {
      const { id } = req.body;
      const query = "select kode_kota from kota where kode_kota=? and id_kota!=?";
      const values = [sendKodeKota, id];
      try {
        const hasil = await handlerQuery({ query, values });
        if (hasil.length === 0) {
          res.status(200).send("available");
        } else {
          res.status(200).send("not available");
        }
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  }
}
