import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { DB_STRING } from './src/config';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: DB_STRING,
  },
} satisfies Config;