import handlerQuery from "../../../lib/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { Nama_Supplier, Kode_Supplier, Alamat, No_HP, Kota } = req.body;
    const query =
      "INSERT INTO supplier(nama_supplier, kode_supplier, alamat, no_hp, id_kota, status) VALUES(?,?,?,?,?,1)";
    const values = [Nama_Supplier, Kode_Supplier, Alamat, No_HP, Kota];

    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENAMBAHKAN DATA SUPPLIER");
    } catch (e) {
      res.status(500).send("GAGAL MENAMBAHKAN DATA SUPPLIER");
    }
  }
}
