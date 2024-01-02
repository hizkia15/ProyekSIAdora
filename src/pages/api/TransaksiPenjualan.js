// api/TransaksiPenjualan.js
import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        transactionNumber,
        timestamp,
        totalBeforeDiscount,
        compoundingFee,
        discount,
        idUser,
      } = req.body;

      const query = `
        INSERT INTO transaksi_penjualan (no_transaksi,  total, biaya_racik, diskon, idUser)
        VALUES (?, ?, ?, ?, ?)
      `;

      const values = [
        transactionNumber,
        totalBeforeDiscount,
        compoundingFee,
        discount,
        idUser,
      ];

      await handlerQuery({ query, values });

      res.status(200).send("Transaction data inserted successfully");
    } catch (error) {
      console.error("Failed to insert transaction data:", error);
      res.status(500).send("Failed to insert transaction data");
    }
  }
}
