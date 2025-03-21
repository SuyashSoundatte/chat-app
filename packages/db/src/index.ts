import * as dotenv from "dotenv"
dotenv.config();

import pkg, { PoolClient } from "pg"
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  connectionTimeoutMillis: 5000,
  ssl: Boolean(process.env.DB_SSL || true)
});


export const ConnectDB = async(): Promise<PoolClient | undefined>=>{
  try {
    const client = await pool.connect();
    return client;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
}

