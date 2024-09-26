import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { holdings } from './customer'

// Users table
export const users = sqliteTable(
  'users',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text('name', { length: 100 }).notNull(),
    email: text('email', { length: 255 }).notNull(),
    passwordHash: text('password_hash').notNull(),
    holdingId: text('holding_id').references(() => holdings.id),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date()
    ),
    deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  },
  (table) => {
    return {
      userUniqueIndex: uniqueIndex('user_unique_idx').on(
        table.email,
        table.holdingId
      ),
    }
  }
)

// Roles table
export const roles = sqliteTable('roles', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name', { length: 100 }).notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date()
  ),
})

// Permissions table
export const permissions = sqliteTable('permissions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name', { length: 100 }).notNull().unique(),
  routes: text('routes', { mode: 'json' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date()
  ),
})

// Teams table
export const teams = sqliteTable('teams', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name', { length: 100 }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date()
  ),
})

// RolePermissions table (Many-to-Many)
export const rolePermissions = sqliteTable('role_permissions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  roleId: text('role_id')
    .references(() => roles.id)
    .notNull(),
  permissionId: text('permission_id')
    .references(() => permissions.id)
    .notNull(),
  relatedOn: integer('related_on', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
})

// UserRoles table (Many-to-Many)
export const userRoles = sqliteTable('user_roles', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  roleId: text('role_id')
    .references(() => roles.id)
    .notNull(),
  relatedOn: integer('related_on', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
})

// TeamMembers table
export const teamMembers = sqliteTable('team_members', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  teamId: text('team_id')
    .references(() => teams.id)
    .notNull(),
  roleId: text('role_id').references(() => roles.id),
  joinedAt: integer('joined_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
})

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  teamMembers: many(teamMembers),
  roles: many(userRoles),
  holding: one(holdings),
}))

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
}))

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  })
)

export const roleRelations = relations(roles, ({ many }) => ({
  permissions: many(rolePermissions),
  users: many(userRoles),
}))

export const permissionRelations = relations(permissions, ({ many }) => ({
  roles: many(rolePermissions),
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

// Type definitions
export type Role = typeof roles.$inferSelect
export type Permission = typeof permissions.$inferSelect
export type User = typeof users.$inferSelect
export type Team = typeof teams.$inferSelect
export type TeamMember = typeof teamMembers.$inferSelect
