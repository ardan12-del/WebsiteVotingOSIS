import db from "../db.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  const { token, candidate } = req.body;

  const [check] = await db.query(
    "SELECT * FROM tokens WHERE token=? AND used_token=0",
    [token]
  );

  if (check.length === 0) {
    return res.status(400).json({
      message: "Token invalid atau sudah dipakai"
    });
  }

  await db.query(
    "UPDATE candidates SET votes=votes+1 WHERE id=?",
    [candidate]
  );

  await db.query(
    "UPDATE tokens SET used_token=1 WHERE token=?",
    [token]
  );

  await db.query(
    "INSERT INTO votes(candidate_id, token) VALUES(?, ?)",
    [candidate, token]
  );

  res.status(200).json({
    message: "Voting berhasil"
  });
}
