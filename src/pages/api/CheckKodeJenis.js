// import handlerQuery from "../../../lib/db";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { sendKodeJenis, tujuan } = req.body;
//     if (tujuan === "add") {
//       const query = "select kode from jenis where kode=?";
//       const values = [sendKodeJenis];

//       try {
//         const hasil = await handlerQuery({ query, values });
//         if (hasil.length === 0) {
//           res.status(200).send("available");
//         } else {
//           res.status(200).send("not available");
//         }
//       } catch (e) {
//         res.status(500).send(e.message);
//       }
//     } else if (tujuan === "edit") {
//       const { id } = req.body;
//       const query = "select kode from jenis where kode=? and id_jenis!=?";
//       const values = [sendKodeJenis, id];
//       try {
//         const hasil = await handlerQuery({ query, values });
//         if (hasil.length === 0) {
//           res.status(200).send("available");
//         } else {
//           res.status(200).send("not available");
//         }
//       } catch (e) {
//         res.status(500).send(e.message);
//       }
//     }
//   }
// }
