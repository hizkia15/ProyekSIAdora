import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sendFaktur } = req.body;

    const query = "select no_faktur from transaksi_pembelian where no_faktur=?";
    const values = [sendFaktur];

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
