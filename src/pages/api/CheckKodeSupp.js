import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { kode_supplier, id_supplier } = req.body;
    let query;
    let values;
    if (id_supplier !== undefined) {
      query =
        "select kode_supplier from supplier where kode_supplier=? and id_supplier!=?";
      values = [kode_supplier, id_supplier];
    } else {
      query = "select kode_supplier from supplier where kode_supplier=?";
      values = [kode_supplier];
    }

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
