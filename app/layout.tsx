import type { Metadata, Viewport } from 'next'

import { Providers } from '../lib/providers/providers'
import { fonts } from '../lib/fonts'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Naul SaaS Starter Kit',
  description: 'Get started quickly with Next.js, Turso, Zod, Clerk and Stripe.',
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
    <ClerkProvider>
      <html
        lang='en'
        className={fonts.kanit.variable}
      >
        <body className='min-h-[100dvh]'>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
