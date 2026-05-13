import db from "../db.js";

export default async function handler(req, res) {

  const [rows] = await db.query(
    "SELECT * FROM candidates"
  );

  res.status(200).json(rows);
}
