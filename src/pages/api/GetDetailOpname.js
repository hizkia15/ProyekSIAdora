import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = req.query;
    const { opname } = query;
    const queryDB =
      "select no_detail_opname,stok_fisik,stok_sistem,selisih,item.nama as nama,satuan.nama as namaSatuan " +
      "from detail_transaksi_stok_opname inner join item on item.id_item = detail_transaksi_stok_opname.id_item " +
      "inner join satuan on item.id_satuan=satuan.id_satuan where no_opname=?";
    const values = [opname];
    try {
      const hasil = await handlerQuery({ query: queryDB, values });
      res.status(200).send(hasil);
    } catch (e) {
      res.status(500).send("GAGAL MENDAPATKAN DETAIL TRANSAKSI STOK OPNAME");
    }
  }
}
