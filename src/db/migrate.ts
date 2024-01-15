import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createConnection } from 'mysql2';
import { drizzle } from 'drizzle-orm/mysql2';
import { DB_STRING } from '../config';
import * as schema from './schema';

const connection = createConnection(DB_STRING);

const db = drizzle(connection, { schema, mode: 'planetscale'});

(async () => {
await migrate(db, { migrationsFolder: './drizzle' });
connection.end();
})();