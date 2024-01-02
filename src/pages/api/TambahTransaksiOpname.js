import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { Id_User } = req.body;
    const date = new Date();
    const No_Opname =
      "OPN" +
      date.getDate().toString() +
      (date.getMonth() + 1).toString() +
      date.getFullYear().toString().toString() +
      date.getHours().toString() +
      date.getMinutes().toString() +
      date.getSeconds().toString() +
      date.getMilliseconds().toString();
    const query1 =
      "INSERT INTO transaksi_stok_opname(no_opname,idUser) VALUES(?,?)";

    const values1 = [No_Opname, Id_User];

    const query2 =
      "select ? as no_opname,stok_fisik,stok,stok_fisik-stok as selisih,item.id_item " +
      "from (select id_item,stok_fisik,idUser from detail_opname_temp inner join transaksi_opname_temp on transaksi_opname_temp.id_opname_temp=detail_opname_temp.id_opname_temp where idUser=?)as a " +
      "inner join item on item.id_item=a.id_item " +
      "where item.status=1 " +
      "order by item.id_item ";
    const values2 = [No_Opname, Id_User];
    const query3 =
      "INSERT INTO detail_transaksi_stok_opname(no_opname,stok_fisik,stok_sistem,selisih,id_item) VALUES(?,?,?,?,?)";

    const query4 =
      "Delete from detail_opname_temp where id_opname_temp=(select id_opname_temp from transaksi_opname_temp where idUser=?)";

    const query5 =
      "update transaksi_opname_temp set time_stamp=null where idUser=?";

    const values45 = [Id_User];

    try {
      await handlerQuery({ query: query1, values: values1 });
      const hasilQuery2 = await handlerQuery({
        query: query2,
        values: values2,
      });

      for (let i = 0; i < hasilQuery2.length; i++) {
        await handlerQuery({
          query: query3,
          values: [
            hasilQuery2[i].no_opname,
            hasilQuery2[i].stok_fisik,
            hasilQuery2[i].stok,
            hasilQuery2[i].selisih,
            hasilQuery2[i].id_item,
          ],
        });
      }

      await handlerQuery({ query: query4, values: values45 });
      await handlerQuery({ query: query5, values: values45 });
      res.status(200).send("BERHASIL MENAMBAHKAN TRANSAKSI STOK OPNAME");
    } catch (e) {
      res.status(500).send("GAGAL MENAMBAHKAN TRANSAKSI STOK OPNAME");
    }
  }
}
