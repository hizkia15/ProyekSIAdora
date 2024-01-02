import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sendNamaRak, tujuan } = req.body;
    if (tujuan === "add") {
      const query = "select nama_rak from rak where nama_rak=?";
      const values = [sendNamaRak];

      try {
        const hasil = await handlerQuery({ query, values });
        if (hasil.length === 0) {
          res.status(200).send("BISA");
        } else {
          res.status(200).send("TIDAK BISA");
        }
      } catch (e) {
        res.status(500).send(e.message);
      }
    } else if (tujuan === "edit") {
      const { id } = req.body;
      const query = "select nama_rak from rak where nama_rak=? and id_rak!=?";
      const values = [sendNamaRak, id];
      try {
        const hasil = await handlerQuery({ query, values });
        if (hasil.length === 0) {
          res.status(200).send("BISA");
        } else {
          res.status(200).send("TIDAK BISA");
        }
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  }
}
