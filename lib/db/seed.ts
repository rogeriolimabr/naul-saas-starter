import { createId } from '@paralleldrive/cuid2'
import { db } from './drizzle'
import {
  users,
  type Holding,
  Permission,
  Role,
  permissions,
  roles,
  rolePermissions,
  holdings,
  User,
  Company,
  companies,
} from './schema'
import { hash } from '@node-rs/argon2'
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'

dotenv.config({ path: '.env'})

async function seed() {
  const permissionData: Permission = {
    id: createId(),
    name: 'all_permissions',
    routes: JSON.stringify(['*']),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const roleAdmin: Role = {
    id: createId(),
    name: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const roleUser: Role = {
    id: createId(),
    name: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  console.log('Seeding...')

  console.log('Creating permissions...')
  const [permission] = await db
    .insert(permissions)
    .values(permissionData)
    .returning()

  console.log('Creating roles...')
  await db.insert(roles).values([roleAdmin, roleUser])

  console.log('Creating role permissions...')
  await db.insert(rolePermissions).values([
    {
      roleId: roleAdmin.id,
      permissionId: permission.id,
    },
    {
      roleId: roleUser.id,
      permissionId: permission.id,
    },
  ])

  const holdingData: Holding = {
    id: createId(),
    name: 'ADINT - Cyber Intelligence Institute',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  console.log('Creating holding...')
  const [holding] = await db.insert(holdings).values(holdingData).returning()

  console.log('Creating initial user...')
  const userData: User = {
    id: createId(),
    name: 'Rogerio da Rocha Cezar Lima',
    email: 'me@rogeriolima.io',
    holdingId: holding.id,
    passwordHash: await hash('KKK@1991'),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  }

  const [user] = await db.insert(users).values(userData).returning()

  console.log('Initial user created.')

  console.log('E-mail: ' + user.email)
  console.log('Password: KKK@1991')

  const companiesData: Company[] = [
    {
      id: createId(),
      fullName: 'ADINT - Cyber Institute Intelligence',
      avatarUrl: faker.image.avatarGitHub(),
      createdAt: new Date(),
      updatedAt: null,
      email: 'contato@adint.com.br',
      status: 'ACTIVE',
      holdingId: holding.id,
      cnpj: '21333012000120',
      isMaster: true,
    },
    {
      id: createId(),
      fullName: 'ADINT - Cyber Security',
      avatarUrl: faker.image.avatarGitHub(),
      createdAt: new Date(),
      updatedAt: null,
      email: 'contato@adint.com.br',
      status: 'ACTIVE',
      holdingId: holding.id,
      cnpj: '21333012000125',
      isMaster: false,
    },
  ]

  console.log('Creating companies...')

  await db.insert(companies).values(companiesData)
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error)
    process.exit(1)
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...')
    process.exit(0)
  })
