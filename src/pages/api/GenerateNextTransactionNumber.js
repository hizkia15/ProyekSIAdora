import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const query =
        "SELECT MAX(CAST(SUBSTRING(no_transaksi, 4) AS SIGNED)) as max_no_transaksi FROM transaksi_penjualan";
      const result = await handlerQuery({ query });

      let lastTransactionNumber = "no_1"; // Nomor awal jika tidak ada data dalam tabel

      if (result && result.length > 0 && result[0].max_no_transaksi !== null) {
        const nextNumber = result[0].max_no_transaksi + 1;
        lastTransactionNumber = `no_${nextNumber}`;
      }

      res.status(200).json(lastTransactionNumber);
    } catch (error) {
      console.error("Failed to fetch the last transaction number:", error);
      res.status(500).send("Failed to fetch the last transaction number");
    }
  }
}
