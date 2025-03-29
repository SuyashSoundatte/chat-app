import * as dotenv from "dotenv"
dotenv.config();

import pg, { PoolClient } from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  idleTimeoutMillis: 10000,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});


export const ConnectDB = async ()=> {
  try {
    await pool.connect();
    // return client;
    console.log("Connected to DB")
  } catch (err) {
    console.error(`Error connecting to the database at ${new Date().toISOString()}:`, err);
    throw new Error('Failed to connect to the database');
  }
};

export const queryDB = async (text: string, params?: any[]): Promise<any> => {
  try {
    const res = await pool.query(text, params);
    return res.rows;
  } catch (err) {
    console.error('Error executing query:', err);
    throw new Error('Query execution failed');
  }
};
