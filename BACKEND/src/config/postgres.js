import dotenv from "dotenv";
dotenv.config();
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER || "your_pg_user",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "your_db_name",
  password: process.env.PGPASSWORD || "your_pg_password",
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
});

export default pool;
