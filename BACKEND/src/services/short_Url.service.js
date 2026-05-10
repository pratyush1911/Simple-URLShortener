import pool from "../config/postgres.js";
import { generateNanoId, ensureUrlWithProtocol } from "../utils/helper.js";

export const shortUrlService = async (url) => {
  const short_url = generateNanoId(7);
  const fullUrl = ensureUrlWithProtocol(url);

  const result = await pool.query(
    "INSERT INTO urls (full_url, short_url, clicks) VALUES ($1, $2, $3) RETURNING *",
    [fullUrl, short_url, 0],
  );

  return result.rows[0];
};
