'use server'

import { init } from '@/lib/cache'
import { ICSAdvisory } from './types'

const cache = init()

export const getData = async () => {
  const csvData = await cache.get('csv_data') // Obtém o JSON do cache

  if (csvData) {
    const advisories: ICSAdvisory[] = JSON.parse(csvData) // Parseia de volta para um array tipado
    return advisories
  }

  return []
}
