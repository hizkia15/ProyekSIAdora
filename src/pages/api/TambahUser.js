import handlerQuery from "../../../lib/db";
import { v4 as uuidv4 } from "uuid";
import { sha256 } from "js-sha256";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password, role } = req.body;
    const query =
      "INSERT INTO user(username,password,role,salt,status) VALUES(?,?,?,?,1)";
    const salt = uuidv4();
    const hashedPass = sha256(salt + password);
    const values = [username, hashedPass, role, salt];

    try {
      const hasil = await handlerQuery({ query, values });
      res.status(200).send("BERHASIL MENAMBAHKAN USER");
    } catch (e) {
      res.status(500).send("GAGAL MENAMBAHKAN USER");
    }
  }
}
