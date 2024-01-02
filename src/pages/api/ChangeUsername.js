import handlerQuery from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { UsernameBaru, IdUser } = req.body;
    const query = "update user set username=? where idUser=?";
    const values = [UsernameBaru, IdUser];
    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENGUPDATE USERNAME");
    } catch (e) {
      res.status(500).send("GAGAL MENGUPDATE USERNAME");
    }
  }
}
