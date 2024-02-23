// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  int,
  mysqlTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `LinkHub_${name}`);

export const users = createTable("users", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  username: text("username"),
  email: text("email"),
  authId: text("authId"),
  avatar: varchar("avatar", { length: 256 }),
  background: varchar("background", { length: 256 }).default("default"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

export const links = createTable("links", {
  id: int("id").primaryKey().autoincrement(),
  userId: text("user_id"),
  link: text("link"),
  username: text("username"),
  content: text("content"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});
