import handlerQuery from "../../../lib/db";
import { sha256 } from "js-sha256";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { x, y } = JSON.parse(req.body);
    const query =
      "select password,salt,role,idUser,username,status from user where BINARY username=?";
    const obj = {
      query: query,
      values: [x],
    };
    try {
      const hasil = await handlerQuery(obj);
      if (hasil.length === 1) {
        if (hasil[0].status === 0) {
          res.status(200).send({ data: "Maaf Akun Anda Non-Aktif" });
        } else {
          const salt = hasil[0].salt;
          const password = hasil[0].password;
          const tryHash = sha256(salt + y);
          if (tryHash === password) {
            res.status(200).send({
              data: [hasil[0].username, hasil[0].role, hasil[0].idUser],
            });
          } else {
            res
              .status(200)
              .send({ data: "Maaf Username atau Password anda salah" });
          }
        }
      } else {
        res
          .status(200)
          .send({ data: "Maaf Username atau Password anda salah" });
      }
    } catch (e) {
      res.status(500).send({ data: e.message });
    }
  }
}
