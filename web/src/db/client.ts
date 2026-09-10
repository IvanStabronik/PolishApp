import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Db = PostgresJsDatabase<typeof schema>;

const globalForDb = globalThis as unknown as {
  slowariumSql?: ReturnType<typeof postgres>;
  slowariumDb?: Db;
};

function getConnectionString(): string {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  return connectionString;
}

/**
 * Lazy postgres.js + Drizzle client (ADR-002).
 * Always cache on globalThis so getSql() works under NODE_ENV=production
 * (Vercel serverless). Skipping the sql cache in prod used to break /api/ready.
 * prepare:false is required for Neon transaction pooler; max:1 suits serverless.
 */
export function getDb(): Db {
  if (globalForDb.slowariumDb) {
    return globalForDb.slowariumDb;
  }

  const sql =
    globalForDb.slowariumSql ??
    postgres(getConnectionString(), {
      max: process.env.VERCEL || process.env.NODE_ENV === "production" ? 1 : 10,
      prepare: false,
    });

  globalForDb.slowariumSql = sql;

  const db = drizzle(sql, { schema });
  globalForDb.slowariumDb = db;
  return db;
}

export function getSql(): ReturnType<typeof postgres> {
  getDb();
  if (!globalForDb.slowariumSql) {
    throw new Error("SQL client not initialized");
  }
  return globalForDb.slowariumSql;
}

/** Convenience proxy — throws only on first query/access if DATABASE_URL missing. */
export const db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const real = getDb();
    const value = Reflect.get(real, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export const sql = new Proxy({} as ReturnType<typeof postgres>, {
  get(_target, prop, receiver) {
    const real = getSql();
    const value = Reflect.get(real, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
