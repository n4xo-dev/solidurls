import { drizzle } from 'drizzle-orm/mysql2'
import { createPool } from 'mysql2'
import { DB_STRING } from '../config'
import * as schema from './schema'
// create the connection
const connection = createPool(DB_STRING)

export const db = drizzle(connection, { schema, mode: 'planetscale' })
