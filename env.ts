// env.ts
import { z } from 'zod'

// Define the schema as an object with all of the env
// variables and their types
const envSchema = z.object({
  BASE_URL: z.string().url(),
  TURSO_CONNECTION_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string().min(1),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  REDIS_URL: z.string().min(1),
  ENV: z
    .union([
      z.literal('development'),
      z.literal('testing'),
      z.literal('production'),
    ])
    .default('development'),
})

// Validate `process.env` against our schema
// and return the result
const env = envSchema.parse(process.env)

// Export the result so we can use it in the project
export default env
