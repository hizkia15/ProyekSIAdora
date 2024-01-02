import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { idUser, id_item, stok_fisik } = req.body;

    const query =
      "INSERT INTO detail_opname_temp(id_item,stok_fisik,id_opname_temp) " +
      "VALUES(?,?,(SELECT id_opname_temp from transaksi_opname_temp where idUser=?))";
    const values = [id_item, stok_fisik, idUser];

    const queryTimeStamp =
      "UPDATE transaksi_opname_temp set time_stamp=current_timestamp() where idUser=?";

    const valuesTimeStamp = [idUser];
    try {
      const hasil = await handlerQuery({ query, values });
      const time_stamp = await handlerQuery({
        query: queryTimeStamp,
        values: valuesTimeStamp,
      });
      res.status(200).send("BERHASIL MENYIMPAN DETAIL OPNAME");
    } catch (e) {
      res.status(500).send("GAGAL MENYIMPAN DETAIL OPNAME");
    }
  } else if (req.method === "PATCH") {
    const { idUser, id_item, stok_fisik } = req.body;

    const query =
      "update detail_opname_temp set stok_fisik=? " +
      "where id_item=? and id_opname_temp=(select id_opname_temp from transaksi_opname_temp where idUser=?)";
    const values = [stok_fisik, id_item, idUser];
    const queryTimeStamp =
      "UPDATE transaksi_opname_temp set time_stamp=current_timestamp() where idUser=?";

    const valuesTimeStamp = [idUser];
    try {
      const hasil = await handlerQuery({ query, values });
      const time_stamp = await handlerQuery({
        query: queryTimeStamp,
        values: valuesTimeStamp,
      });
      res.status(200).send("BERHASIL MENGUPDATE DETAIL OPNAME");
    } catch (e) {
      res.status(500).send("GAGAL MENGUPDATE DETAIL OPNAME");
    }
  }
}
