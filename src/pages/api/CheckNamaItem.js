import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { NamaItem, IdItem } = req.body;
    let query;
    let values;
    if (IdItem !== undefined) {
      query = "select nama from item where nama=? and id_item!=?";
      values = [NamaItem, IdItem];
    } else {
      query = "select nama from item where nama=?";
      values = [NamaItem];
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
