import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import schema from "@/schema";

// Mark this module as server-only
import "server-only";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
