// This is a client-safe database interface
// Only contains types and utilities that don't import node-specific modules

import type { InferModel } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type * as schema from "@/schema";

export type Tables = typeof schema;
export type DbClient = {
  schema: Tables;
};

// Export type helpers
export type InferTable<T extends keyof Tables> =
  Tables[T] extends PgTable<any> ? InferModel<Tables[T], "select"> : never;
