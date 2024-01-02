import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { itemId, quantity } = req.body;

    if (itemId && quantity !== undefined) {
      try {
        // Lakukan pemeriksaan stok terlebih dahulu
        const checkStokQuery = "SELECT stok FROM item WHERE id_item = ?";
        const checkStokValues = [itemId];
        const checkStokResult = await handlerQuery({
          query: checkStokQuery,
          values: checkStokValues,
        });

        if (checkStokResult.length > 0) {
          const currentStok = checkStokResult[0].stok;

          if (currentStok >= quantity) {
            // Update stok hanya jika stok mencukupi
            const updateStokQuery =
              "UPDATE item SET stok = stok - ? WHERE id_item = ?";
            const updateStokValues = [quantity, itemId];
            await handlerQuery({
              query: updateStokQuery,
              values: updateStokValues,
            });
            res.status(200).send("BERHASIL MEMBAYAR");
          } else {
            res.status(400).send("STOK TIDAK CUKUPI");
          }
        } else {
          res.status(404).send("ITEM TIDAK DITEMUKAN");
        }
      } catch (e) {
        res.status(500).send("GAGAL MEMBAYAR");
      }
    } else {
      res.status(400).send("PERMINTAAN TIDAK VALID");
    }
  }
}
