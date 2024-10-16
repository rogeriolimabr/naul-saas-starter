import {
  AnySQLiteColumn,
  integer,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'
import { request } from './request'
import { relations } from 'drizzle-orm'

export const task = sqliteTable('tasks', {
  id: text('id').primaryKey().$defaultFn(createId), // ID da tarefa
  requestId: integer('request_id')
    .notNull()
    .references(() => request.id), // Relacionado ao request
  description: text('description').notNull(), // Descrição da tarefa
  status: text('status').notNull().default('PENDING'), // Status da tarefa (ex: 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')
  assignedTeam: text('assigned_team'), // Equipe atribuída à tarefa (opcional)
  assignedTo: text('assigned_to').notNull(), // ID do usuário responsável pela tarefa
  isBlocking: integer('is_blocking', { mode: 'boolean' })
    .notNull()
    .default(false), // Se a tarefa é bloqueante
  dependentTaskId: text('dependent_task_id').references(
    (): AnySQLiteColumn => task.id
  ), // Tarefa da qual essa depende (opcional)
  isSequential: integer('is_sequential', { mode: 'boolean' })
    .notNull()
    .default(false), // Indica se a tarefa faz parte de uma sequência
  isApprovalTask: integer('is_approval_task', { mode: 'boolean' })
    .notNull()
    .default(false), // Indica se a tarefa é uma tarefa de aprovação
  dueDate: integer('due_date', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date()
  ),
})

export const taskRelations = relations(task, ({ one }) => ({
  dependent: one(task, {
    fields: [task.dependentTaskId],
    references: [task.id],
  }),
}))
