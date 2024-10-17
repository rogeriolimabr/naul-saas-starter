import type { Metadata, Viewport } from 'next'

import { UIProvider } from '../lib/providers/ui-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import '@/lib/styles/globals.css'

export const metadata: Metadata = {
  title: 'Arcanjo - Cyber Security Platform',
  description:
    'arcanjo.adint.io',
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
