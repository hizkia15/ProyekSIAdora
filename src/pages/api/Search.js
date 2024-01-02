import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { Search, Jenis, Satuan } = req.body;
    let query =
      "select id_item,item.nama as namaItem,stok,stok_min,item.status,rak.nama_rak as namaRak,satuan.nama as namaSatuan,jenis.nama as namaJenis " +
      "from item inner join rak on item.id_rak=rak.id_rak inner join satuan on " +
      "satuan.id_satuan=item.id_satuan inner join jenis on jenis.id_jenis=item.id_jenis_item ";
    let query2 =
      "select count(id_item) " +
      "from item inner join rak on item.id_rak=rak.id_rak inner join satuan on " +
      "satuan.id_satuan=item.id_satuan inner join jenis on jenis.id_jenis=item.id_jenis_item ";
    if (Search !== undefined || Jenis !== undefined || Satuan !== undefined) {
      query = query + "where ";
      query2 = query2 + "where ";
      if (Search !== undefined) {
        query = query + "namaItem like ''%?%''";
        query2 = query2 + "namaItem like ''%?%''";
      }
      if (Jenis !== undefined) {
        if (Search === undefined) {
          query = query + " id_jenis=?";
          query2 = query2 + " id_jenis=?";
        } else {
          query = query + " and id_jenis=?";
          query2 = query2 + " and id_jenis=?";
        }
      }
      if (Satuan !== undefined) {
        if (Search !== undefined || Jenis !== undefined) {
          query = query + " and id_satuan=?";
          query2 = query2 + " and id_satuan=?";
        } else {
          query = query + " id_satuan=?";
          query2 = query2 + " id_satuan=?";
        }
      }
    }

    query = query + "order by id_item LIMIT 0,10";
    const values = [];
    if (Search !== undefined) {
      values.add(Search);
    }
    if (Jenis !== undefined) {
      values.add(Jenis);
    }
    if (Satuan !== undefined) {
      values.add(Satuan);
    }

    try {
      const hasil = await handlerQuery({ query, values });
      const jumlah = await handlerQuery({ query: query2, values });
      res.status(200).send({ hasil, jumlah });
    } catch (e) {
      res.status(500).send("Gagal mengambil data");
    }
  }
}
