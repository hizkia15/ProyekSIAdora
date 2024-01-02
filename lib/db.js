import serverlessMysql from "serverless-mysql";
import { dbConfig } from "../next.config";

export const db = serverlessMysql({
  config: {
    host: dbConfig.MYSQL_HOST,
    database: dbConfig.MYSQL_DATABASE,
    user: dbConfig.MYSQL_USER,
    password: dbConfig.MYSQL_PASSWORD,
  },
});

export default async function handlerQuery({ query, values }) {
  try {
    const hasil = await db.query(query, values);
    await db.end();
    return hasil;
  } catch (e) {
    throw new Error("Terjadi masalah saat mengakses db");
  }
}
