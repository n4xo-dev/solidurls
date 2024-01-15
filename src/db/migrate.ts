import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createConnection } from 'mysql2';
import { drizzle } from 'drizzle-orm/mysql2';
import { DB_STRING } from '../config';

const connection = createConnection(DB_STRING);

const db = drizzle(connection);

(async () => {
await migrate(db, { migrationsFolder: './drizzle' });
connection.end();
})();