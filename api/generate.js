import db from "../db.js";

function randomToken(length = 10) {

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result;
}

export default async function handler(req, res) {

  for (let i = 0; i < 400; i++) {

    const token = randomToken();

    await db.query(
      "INSERT INTO tokens(token) VALUES(?)",
      [token]
    );
  }

  res.status(200).json({
    message: "400 token berhasil dibuat"
  });
}
