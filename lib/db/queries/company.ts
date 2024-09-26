'use server'

import { db } from '../drizzle'
import { companies } from '../schema'

export const getAllCompanies = async () => {
  try {
    const result = await db.select().from(companies).all()
    return result
  } catch {
    return []
  }
}
