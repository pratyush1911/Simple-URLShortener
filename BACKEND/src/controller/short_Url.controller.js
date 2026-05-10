import { shortUrlService } from "../services/short_Url.service.js";
import { generateNanoId } from "../utils/helper.js";
import pool from "../config/postgres.js";

export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  const shortUrl = await shortUrlService(url);
  res.send(process.env.APP_URL + shortUrl.short_url);
};

export const redirectFromShortUrl =async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT full_url FROM urls WHERE short_url = $1",
      [id],
    );
    if (result.rows.length > 0) {
      res.redirect(result.rows[0].full_url);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (err) {
    console.error("Error fetching URL:", err);
    res.status(500).json({ error: "Database error" });
  }
}
