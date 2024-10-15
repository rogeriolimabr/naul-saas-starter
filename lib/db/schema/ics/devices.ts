
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const devices = sqliteTable('ics_devices', {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    vendor: text('vendor', { length: 100 }).notNull(),
    product: text('product', { length: 100 }).notNull(),
    name: text('name', { length: 50 }).notNull(),
    dork: text('dork', { length: 100 }).notNull(),
    status: text('status', { length: 20 }).notNull().default('ACTIVE'),
    version: text('version', { length: 20 }),
    comments: text('comments', { length: 500 }),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date()
    ),
  })


export type Device = typeof devices.$inferSelect