import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { NoOpname } = req.body;

    const query =
      "select no_opname from transaksi_stok_opname where no_opname=?";
    const values = [NoOpname];

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
