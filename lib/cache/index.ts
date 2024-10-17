import env from '@/env'
import { Redis } from 'ioredis'

const redis = new Redis(env.REDIS_URL)

export function init(): Redis {
  return redis
}
