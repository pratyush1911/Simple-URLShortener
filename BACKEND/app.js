import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import short_url from "./src/routes/short_Url.route.js";
dotenv.config({ path: "./.env" });
import pool from "./src/config/postgres.js";
import { redirectFromShortUrl } from "./src/controller/short_Url.controller.js";
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch((err) => console.error("PostgreSQL connection error:", err));
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);
app.listen(3000, () => {
  console.log("server running on port http://localhost:3000");
});
