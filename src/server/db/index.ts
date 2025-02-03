// src/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

import * as schema from "./schema";

config({ path: ".env" }); // or .env.local

const sql = neon(process.env.POSTGRES_URL!);

/* Drizzle only cares about the table definitions (your images table)

It ignores other exports (like the createTable function)

It uses TypeScript type information to filter what's relevant */

export const db = drizzle(sql, { schema });
