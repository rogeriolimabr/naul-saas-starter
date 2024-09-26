import dotenv from 'dotenv'
import path from 'path'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { client, db } from './drizzle'

dotenv.config({ path: path.join(process.cwd(), '.env') })

async function main() {
  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), '/lib/db/migrations'),
  })
  console.log(`Migrations complete`)
  await client.close()
}

main()
