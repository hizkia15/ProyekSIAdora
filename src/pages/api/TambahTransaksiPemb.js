import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { faktur, idUser, supplier, sendDetail } = req.body;
    const query1 =
      "INSERT INTO transaksi_pembelian(no_faktur,idUser,id_supplier,total) VALUES(?,?,?,?)";

    let total = 0;
    for (let i = 0; i < sendDetail.length; i++) {
      total = total + parseInt(sendDetail[i].Subtotal);
    }
    const values1 = [faktur, idUser, supplier, total];
    const query2 =
      "INSERT INTO detail_transaksi_pembelian(no_faktur,id_item,jumlah,subtotal,harga_per_satuan) VALUES(?,?,?,?,?)";

    const query3 =
      "SELECT harga FROM history_harga_jual WHERE tgl_akhir is null and id_item=?";

    const query4 = "SELECT margin FROM item WHERE id_item=?";
    const query5 =
      "UPDATE history_harga_jual set tgl_akhir=current_timestamp(),tgl_awal=tgl_awal where tgl_akhir is null and id_item=?";
    const query6 = "INSERT INTO history_harga_jual(harga,id_item) VALUES(?,?)";

    try {
      await handlerQuery({ query: query1, values: values1 });
      for (let i = 0; i < sendDetail.length; i++) {
        await handlerQuery({
          query: query2,
          values: [
            faktur,
            sendDetail[i].IdItem,
            sendDetail[i].Jumlah_Item,
            sendDetail[i].Subtotal,
            sendDetail[i].Harga_Beli,
          ],
        });
        const hargaJual = await handlerQuery({
          query: query3,
          values: [sendDetail[i].IdItem],
        });

        const margin = await handlerQuery({
          query: query4,
          values: [sendDetail[i].IdItem],
        });

        const hargaJualLama =
          hargaJual.length !== 0 ? hargaJual[0].harga : undefined;

        const valueMargin = margin[0].margin;

        const hargaJualBaru =
          parseInt(sendDetail[i].Harga_Beli) +
          (parseInt(sendDetail[i].Harga_Beli) * parseInt(valueMargin)) / 100;

        if (hargaJualBaru !== hargaJualLama) {
          await handlerQuery({
            query: query5,
            values: [sendDetail[i].IdItem],
          });
          await handlerQuery({
            query: query6,
            values: [hargaJualBaru, sendDetail[i].IdItem],
          });
        }
      }
      res.status(200).send("BERHASIL MENAMBAHKAN TRANSAKSI PEMBELIAN");
    } catch (e) {
      res.status(500).send("GAGAL MENAMBAHKAN TRANSAKSI PEMBELIAN");
    }
  }
}
