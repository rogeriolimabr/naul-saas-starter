import type { Metadata, Viewport } from 'next'

import { UIProvider } from '../lib/providers/ui-provider'
import { fonts } from '../lib/fonts'
import { ClerkProvider } from '@clerk/nextjs'
import Scripts from '@/lib/providers/scripts'

export const metadata: Metadata = {
  title: 'Naul SaaS Starter Kit',
  description:
    'Get started quickly with Next.js, Turso, Zod, Clerk and Stripe.',
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
      {/* <Scripts /> */}
      <html
        lang='en'
        className={fonts.kanit.variable}
      >
        <body className='min-h-[100dvh]'>
          <Scripts />
          <UIProvider>{children}</UIProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
