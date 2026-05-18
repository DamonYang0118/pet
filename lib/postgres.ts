import { Pool } from "pg";

declare global {
  var petSpaPostgresPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required for booking writes.");
  }

  return new Pool({
    connectionString,
    max: 4,
    ssl:
      process.env.POSTGRES_SSL === "false"
        ? false
        : {
            rejectUnauthorized: false
          }
  });
}

export function getPostgresPool() {
  const pool = globalThis.petSpaPostgresPool ?? createPool();

  if (process.env.NODE_ENV !== "production") {
    globalThis.petSpaPostgresPool = pool;
  }

  return pool;
}
