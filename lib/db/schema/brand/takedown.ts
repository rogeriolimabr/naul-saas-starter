import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const takedowns = sqliteTable('bp_takedowns', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name', { length: 100 }).notNull(),
  description: text('description', { length: 100 }).notNull(),
  frequency: text('frequency', { length: 10 }).notNull(), // YEARLY, WEEKLY, MONTHLY, DAILY
  priority: text('priority', { length: 10 }).notNull(), // CRITICAL, HIGH, MEDIUM, LOW
  status: text('status', { length: 20 }).notNull().default('ACTIVE'), // ACTIVE, INACTIVE, WAITING APPROVAL
  category: text('category', { length: 50 }).notNull(), // Tipo de registro (App, Social Media, Website)
  origin: text('origin', { length: 50 }).notNull(), // Surface Web, Play Store, App Store, LinkedIn
  url: text('url', { length: 50 }).notNull(), // url takedown
  comments: text('comments', { length: 500 }),
  createdBy: text('created_by', { length: 50 }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date()
  ),
})

export type Takedown = typeof takedowns.$inferSelect
