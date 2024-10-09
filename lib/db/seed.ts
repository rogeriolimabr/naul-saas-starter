import { createId } from '@paralleldrive/cuid2'
import { db } from './drizzle'
import {
  type Holding,
  holdings,
  Company,
  companies,
  Takedown,
  takedowns,
  Tracking,
  trackings,
} from './schema'
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
import { User } from '@clerk/nextjs/server'

dotenv.config({ path: '.env' })

async function seed() {
  const planExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);


  const holdingData: Holding = {
    id: createId(),
    name: 'ADINT - Cyber Intelligence Institute',
    status: 'ACTIVE',
    plan: 'PRO',
    planExpiresAt,
    adminId: createId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  console.log('Creating holding...')
  
  const [holding] = await db.insert(holdings).values(holdingData).returning()

  console.log('Initial user created.')

  const companiesData: Company[] = [
    {
      id: createId(),
      shortName: 'ADINT',
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
      shortName: 'ADINT',
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

async function takedownSeed() {
  const takedownsData: Takedown[] = []

  let i = 0
  while (i < 15) {
    takedownsData.push({
      id: createId(),
      name: faker.lorem.words(3),
      description: faker.lorem.words(5),
      frequency: faker.helpers.arrayElement([
        'YEARLY',
        'MONTHLY',
        'WEEKLY',
        'DAILY',
      ]),
      priority: faker.helpers.arrayElement([
        'CRITICAL',
        'HIGH',
        'MEDIUM',
        'LOW',
      ]),
      status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
      category: faker.helpers.arrayElement(['APP', 'URL', 'SOCIALMEDIA']),
      origin: faker.helpers.arrayElement([
        'LINKEDIN',
        'INSTAGRAM',
        'FACEBOOK',
        'OTHERS',
      ]),
      url: faker.internet.url(),
      comments: faker.lorem.paragraphs(2),
      createdBy: createId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    i++
  }

  console.log('Creating takedowns...')
  await db.insert(takedowns).values(takedownsData)
}

async function trackingsSeed() {
  const trackingsData: Tracking[] = []

  let i = 0
  while (i < 25) {
    trackingsData.push({
      id: createId(),
      name: faker.lorem.words(3),
      description: faker.lorem.words(5),
      frequency: faker.helpers.arrayElement([
        'YEARLY',
        'MONTHLY',
        'WEEKLY',
        'DAILY',
      ]),
      priority: faker.helpers.arrayElement([
        'CRITICAL',
        'HIGH',
        'MEDIUM',
        'LOW',
      ]),
      status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
      category: faker.helpers.arrayElement([
        'SURFACEWEB',
        'DEEPWEB',
        'SOCIALMEDIA',
        'KEYWORDS',
        'IP',
        'DATALEAKS',
      ]),
      aux_table: 'bp_tracking_credentials',
      comments: faker.lorem.paragraphs(2),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    i++
  }

  console.log('Creating trackings...')
  await db.insert(trackings).values(trackingsData)
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
