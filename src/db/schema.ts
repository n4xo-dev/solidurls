import { index, mysqlTable, serial, timestamp, varchar, } from "drizzle-orm/mysql-core";

export const shortURLsTable = mysqlTable('short_urls', {
    id: serial("id").primaryKey(),
    url: varchar("url", { length: 1024 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
}, (table) => ({ urlIdx: index("url_idx").on(table.url) }));
