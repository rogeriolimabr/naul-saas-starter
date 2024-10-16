import type { Metadata, Viewport } from 'next'

import { UIProvider } from '../lib/providers/ui-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import '@/lib/styles/globals.css'

export const metadata: Metadata = {
  title: 'Naul SaaS Starter Kit',
  description:
    'Get started quickly with Next.js, Turso, Zod, Clerk, React-Query, React-Table and Stripe.',
}

export const viewport: Viewport = {
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en' suppressHydrationWarning>
        <body className='min-h-[100dvh]'>
          <UIProvider>{children}</UIProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
