import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'
import env from '@/env'


if (!env.TURSO_CONNECTION_URL || !env.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO environment variable is not set')
}

const client = createClient({
  url: env.TURSO_CONNECTION_URL!,
  authToken: env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client, { schema })
