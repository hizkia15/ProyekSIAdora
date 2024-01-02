import handlerQuery from "../../../lib/db";

// Fungsi untuk mendapatkan nomor detail transaksi
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const query =
        "SELECT MAX(CAST(no_detail_penjualan AS SIGNED)) as max_no_detail_penjualan FROM detail_transaksi_penjualan";

      const result = await handlerQuery({ query });

      let lastDetailTransactionNumber = 1; // Nomor awal jika tidak ada data dalam tabel

      if (
        result &&
        result.length > 0 &&
        result[0].max_no_detail_penjualan !== null
      ) {
        const nextNumber = result[0].max_no_detail_penjualan + 1;
        lastDetailTransactionNumber = nextNumber;
      }

      res.status(200).json(lastDetailTransactionNumber);
    } catch (error) {
      console.error("Failed to fetch the last transaction number:", error);
      res.status(500).send("Failed to fetch the last transaction number");
    }
  }
}
