import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'
import 'dotenv/config'

if (!process.env.TURSO_CONNECTION_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO environment variable is not set')
}

export const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client, { schema })
