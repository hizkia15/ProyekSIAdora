import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sendKodeSupplier, tujuan } = req.body;
    if (tujuan === "add") {
      const query = "select kode_supplier from supplier where kode_supplier=?";
      const values = [sendKodeSupplier];

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
      const query = "select kode_supplier from supplier where kode_supplier=? and id_supplier!=?";
      const values = [sendKodeSupplier, id];
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
