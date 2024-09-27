import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

// Holding table
export const holdings = sqliteTable('holding', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name', { length: 100 }).notNull(),
  status: text('status', { length: 20 }).notNull().default('ACTIVE'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date()
  ),
})

// Companies table
export const companies = sqliteTable('companies', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  shortName: text('short_name', { length: 155 }).notNull().default('ADINT'),
  fullName: text('full_name', { length: 155 }).notNull(),
  email: text('email', { length: 255 }).notNull(),
  cnpj: text('cnpj', { length: 14 }).notNull().unique(),
  avatarUrl: text('avatar_url'),
  isMaster: integer('is_master', { mode: 'boolean' }).default(false),
  holdingId: text('holding_id').references(() => holdings.id),
  status: text('status', { length: 20 }).notNull().default('ACTIVE'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date()
  ),
})

export type Company = typeof companies.$inferSelect
export type Holding = typeof holdings.$inferSelect
