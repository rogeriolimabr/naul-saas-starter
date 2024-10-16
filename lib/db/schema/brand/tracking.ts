
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const trackings = sqliteTable('bp_trackings', {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text('name', { length: 100 }).notNull(),
    description: text('description', { length: 100 }).notNull(),
    frequency: text('frequency', { length: 10 }).notNull(), // YEARLY, WEEKLY, MONTHLY, DAILY
    priority: text('priority', { length: 10 }).notNull(), // CRITICAL, HIGH, MEDIUM, LOW
    status: text('status', { length: 20 }).notNull().default('ACTIVE'), // ACTIVE, INACTIVE, WAITING APPROVAL
    aux_table: text('aux_table', { length: 50 }).notNull(), // Tipo do monitoramento (credenciais, cartão, rede social, etc)
    category: text('category', { length: 50 }).notNull(), // Tipo do monitoramento (credenciais, cartão, rede social, etc)
    comments: text('comments', { length: 500 }),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date()
    ),
  })

  export const trackingCredentials = sqliteTable('bp_trackings_credentials', {
    id: text('id').references(() => trackings.id), // Relacionamento com a tabela principal
    login: text('login', { length: 150 }).notNull(),
  })

  export const trackingCreditCards = sqliteTable('bp_trackings_credit_cards', {
    id: text('id').references(() => trackings.id), // Relacionamento com a tabela principal
    cardBin: text('card_bin', { length: 6 }).notNull(), // BIN do cartão de crédito
  })

  export const trackingSocialNetworks = sqliteTable('bp_trackings_social_networks', {
    id: text('id').references(() => trackings.id), // Relacionamento com a tabela principal
    socialNetworkName: text('social_network_name', { length: 50 }).notNull(), // Nome da rede social
    username: text('username', { length: 50 }).notNull(), // Nome de usuário na rede
  })

  export const trackingRegistrations = sqliteTable('bp_trackings_registrations', {
    id: text('id').references(() => trackings.id), // Relacionamento com a tabela principal
    type: text('type', { length: 50 }).notNull(), // Tipo de registro (cpf, rg, cnpj)
    registration: text('registration', { length: 50 }).notNull(), // registro
  });

  export const trackingUrls = sqliteTable('bp_trackings_urls', {
    id: text('id').references(() => trackings.id), // Relacionamento com a tabela principal
    type: text('type', { length: 50 }).notNull(), // Tipo de registro (deep_web, surface_web, )
    url: text('url', { length: 50 }).notNull(), // url tracking
  });

  export const trackingKeywords = sqliteTable('bp_trackings_keywords', {
    id: text('id').references(() => trackings.id), // Relacionamento com a tabela principal
    keywords: text('keywords', { mode: 'json' }).notNull(), // url tracking
  });





export type Tracking = typeof trackings.$inferSelect
export type TrackingCredentials = Tracking & typeof trackingCredentials.$inferSelect
export type TrackingCreditCards = Tracking & typeof trackingCreditCards.$inferSelect
export type TrackingSocialNetworks = Tracking & typeof trackingSocialNetworks.$inferSelect
export type TrackingRegistrations = Tracking & typeof trackingRegistrations.$inferSelect
export type TrackingUrls = Tracking & typeof trackingUrls.$inferSelect
export type TrackingKeywords = Tracking & typeof trackingKeywords.$inferSelect