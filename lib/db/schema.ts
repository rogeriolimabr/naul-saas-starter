import { integer, sqliteTable, text  } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name', { length: 100 }),
  email: text('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role', { length: 20 }).notNull().default('member'),
    createdAt: integer('created_at', { mode: 'timestamp'})
    .$defaultFn(() => new Date())
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  deletedAt: text('deleted_at'),
})

export const teams = sqliteTable('teams', {
  id: text('id').primaryKey()
    .$defaultFn(() => createId()),
  name: text('name', { length: 100 }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp'})
  .$defaultFn(() => new Date())
  .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  planName: text('plan_name', { length: 50 }),
  subscriptionStatus: text('subscription_status', { length: 20 }),
})

export const teamMembers = sqliteTable('team_members', {
  id: text('id').primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  teamId: text('team_id')
    .notNull()
    .references(() => teams.id),
  role: text('role', { length: 50 }).notNull(),
  joinedAt: integer('joined_at', { mode: 'timestamp'})
  .$defaultFn(() => new Date())
  .notNull()
})

export const activityLogs = sqliteTable('activity_logs', {
  id: text('id').primaryKey()
    .$defaultFn(() => createId()),
  teamId: text('team_id')
    .notNull()
    .references(() => teams.id),
  userId: text('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: integer('timestamp', {mode: 'timestamp'})
  .$defaultFn(() => new Date())
  .notNull(),
  ipAddress: text('ip_address', { length: 45 }),
})

export const invitations = sqliteTable('invitations', {
  id: text('id').primaryKey()
    .$defaultFn(() => createId()),
  teamId: text('team_id')
    .notNull()
    .references(() => teams.id),
  email: text('email', { length: 255 }).notNull(),
  role: text('role', { length: 50 }).notNull(),
  invitedBy: text('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: integer('invited_at', {mode: 'timestamp'})
  .$defaultFn(() => new Date())
  .notNull(),
  status: text('status', { length: 20 }).notNull().default('pending'),
})

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}))


export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}))

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}))

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}))

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Team = typeof teams.$inferSelect
export type NewTeam = typeof teams.$inferInsert
export type TeamMember = typeof teamMembers.$inferSelect
export type NewTeamMember = typeof teamMembers.$inferInsert
export type ActivityLog = typeof activityLogs.$inferSelect
export type NewActivityLog = typeof activityLogs.$inferInsert
export type Invitation = typeof invitations.$inferSelect
export type NewInvitation = typeof invitations.$inferInsert
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>
  })[]
}

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}
