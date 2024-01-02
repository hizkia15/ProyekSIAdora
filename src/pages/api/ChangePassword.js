import handlerQuery from "../../../lib/db";
import { v4 as uuidv4 } from "uuid";
import { sha256 } from "js-sha256";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { passwordBaru, UserId } = req.body;
    const salt = uuidv4();
    const hashedPass = sha256(salt + passwordBaru);
    const query = "UPDATE user set password=?,salt=? where idUser=?";
    const values = [hashedPass, salt, UserId];
    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("Berhasil mengupdate password");
    } catch (e) {
      res.status(500).send("Gagal mengupdate password");
    }
  }
}
