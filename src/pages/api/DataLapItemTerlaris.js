import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = req.query;
    const { Awal, Akhir } = query;
    let queryDB;
    let values;
    if (Awal !== "" && Akhir !== "") {
      queryDB =
        "SELECT item.nama as nama_item,satuan.nama as nama_satuan,jenis.nama as nama_jenis,sum(detail_transaksi_penjualan.jumlah) as jumlah_terjual " +
        "from detail_transaksi_penjualan inner join item on item.id_item = detail_transaksi_penjualan.id_item inner join satuan on satuan.id_satuan=item.id_satuan " +
        "inner join jenis on jenis.id_jenis=item.id_jenis_item " +
        "inner join transaksi_penjualan on transaksi_penjualan.no_transaksi=detail_transaksi_penjualan.no_transaksi " +
        "where time_stamp between ? and ?" +
        "group by detail_transaksi_penjualan.id_item " +
        "order by jumlah_terjual desc LIMIT 5";
      values = [Awal, Akhir];
    } else {
      queryDB =
        "SELECT item.nama as nama_item,satuan.nama as nama_satuan,jenis.nama as nama_jenis,sum(detail_transaksi_penjualan.jumlah) as jumlah_terjual " +
        "from detail_transaksi_penjualan inner join item on item.id_item = detail_transaksi_penjualan.id_item inner join satuan on satuan.id_satuan=item.id_satuan " +
        "inner join jenis on jenis.id_jenis=item.id_jenis_item " +
        "group by detail_transaksi_penjualan.id_item " +
        "order by jumlah_terjual desc LIMIT 5";
      values = [];
    }

    try {
      const hasil = await handlerQuery({ query: queryDB, values });
      res.status(200).send(hasil);
    } catch (e) {
      res.status(500).send("GAGAL MENDAPATKAN DATA");
    }
  }
}
