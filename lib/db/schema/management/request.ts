import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const request = sqliteTable('requests', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  type: text('type').notNull().default('REQUEST'), // Tipo de requisição (Incidente ou Requisição)
  description: text('description'), // Descrição detalhada do request
  module: text('module').notNull(), // Módulo de onde veio a solicitação
  serviceOffer: text('service_offer').notNull(), // Oferta de serviço relacionado à requisição
  requestedBy: text('requested_by'), // ID do usuário que solicitou, pode ser nulo se for automático
  dueDate: integer('due_date', { mode: 'timestamp' }),
  status: text('status', { length: 20 }).notNull().default('OPEN'),
  priority: text('priority', { length: 20 }).notNull().default('LOW'),
  assignedTeamId: text('assigned_team'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date()
  ),
})

export const requestActionLog = sqliteTable('request_action_logs', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  requestId: text('request_id')
    .notNull()
    .references(() => request.id), // Relacionado ao request
  public: integer('public', { mode: 'boolean' }).notNull().default(false),
  type: text('type').notNull().default('ACTION'), // COMMENT
  action: text('action').notNull(), // Tipo de ação (ex: "Mudança de equipe", "Alteração de prioridade", etc.)
  previousValue: text('previous_value'), // Valor anterior (se aplicável)
  newValue: text('new_value').notNull(), // Novo valor
  changedBy: text('changed_by').notNull(), // Usuário que realizou a alteração
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
})
