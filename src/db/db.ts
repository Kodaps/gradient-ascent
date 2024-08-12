
//import mysql from "mysql2/promise"
//import { drizzle } from "drizzle-orm/mysql2"

import { drizzle } from 'drizzle-orm/xata-http';
import { getXataClient } from './xata'; // Generated client
const xata = getXataClient({ apiKey: process.env.XATA_API_KEY || '', branch: 'main' });
export const db = drizzle(xata);

/*
export const connection = await mysql.createConnection({
  host: process.env["DATABASE_HOST"],
  user: process.env["DATABASE_USER"],
  password: process.env["DATABASE_PASSWORD"],
  database: process.env["DATABASE_NAME"],
})



export const db = drizzle(connection);
*/

/*
const poolConnection = mysql.createPool({
  host: process.env["DATABASE_HOST"],
  user: process.env["DATABASE_USER"],
  password: process.env["DATABASE_PASSWORD"],
  database: process.env["DATABASE_NAME"],
});

export const db = drizzle(poolConnection);
*/