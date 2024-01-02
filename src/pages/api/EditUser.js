import handlerQuery from "../../../lib/db";
import { v4 as uuidv4 } from "uuid";
import { sha256 } from "js-sha256";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { role, password, id } = req.body;
    if (password !== "") {
      const salt = uuidv4();
      const hashedPass = sha256(salt + password);
      const query = "UPDATE user SET password=?,salt=?,role=? where idUser=?";
      const values = [hashedPass, salt, role, id];
      try {
        const hasil = await handlerQuery({ query, values });
        res.status(200).send("Berhasil mengupdate User");
      } catch (e) {
        res.status(500).send("GAGAL MENGUPDATE USER");
      }
    } else if (password === "") {
      const query = "UPDATE user set role=? where idUser=?";
      const values = [role, id];
      try {
        const hasil = await handlerQuery({ query, values });
        res.status(200).send("BERHASIL MENGUPDATE USER");
      } catch (e) {
        res.status(500).send("GAGAL MENGUPDATE USER");
      }
    }
  }
}
