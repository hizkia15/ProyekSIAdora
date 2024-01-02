import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { Nama_Supplier, Kode_Supplier, Alamat, Kota, No_HP, Id_Supplier } =
      req.body;
    const query =
      "UPDATE supplier set nama_supplier=?, kode_supplier=?, alamat=?, no_hp=?, id_kota=? where id_supplier=?";
    const values = [
      Nama_Supplier,
      Kode_Supplier,
      Alamat,
      No_HP,
      Kota,
      Id_Supplier,
    ];

    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENGUPDATE DATA SUPPLIER");
    } catch (e) {
      res.status(500).send("GAGAL MENGUPDATE DATA SUPPLIER");
    }
  }
}
