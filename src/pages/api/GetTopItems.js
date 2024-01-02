import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const topItemsQuery = `
      SELECT i.nama AS Nama_Item, SUM(dt.jumlah) AS Jumlah_Item_Terjual, s.nama AS Satuan
      FROM transaksi_penjualan tp
      JOIN detail_transaksi_penjualan dt ON tp.no_transaksi = dt.no_transaksi
      JOIN item i ON dt.id_item = i.id_item
      JOIN satuan s ON i.id_satuan = s.id_satuan
      WHERE MONTH(tp.time_stamp) = MONTH(CURRENT_DATE()) AND YEAR(tp.time_stamp) = YEAR(CURRENT_DATE())
      GROUP BY i.nama, s.nama
      ORDER BY Jumlah_Item_Terjual DESC
      LIMIT 10;
    `;

    const topItemsResult = await handlerQuery(topItemsQuery);

    res.status(200).json(topItemsResult);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
