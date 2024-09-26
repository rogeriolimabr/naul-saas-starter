'use client'

import { Footer, Navbar, Sidebar } from '@/components/ui/admin/layout'
import { LayoutProvider } from '@/lib/contexts/layout/LayoutContext'
import { Box } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <LayoutProvider>
          <Box
            display='flex'
            flexDirection='row'
            minHeight='100vh'
          >
            <Sidebar />
            <Box
              display='flex'
              flexDirection='column'
              flex={1}
            >
              <Navbar />
              <Box flexGrow={1}>{children}</Box>
              <Footer />
            </Box>
          </Box>
      </LayoutProvider>
    </QueryClientProvider>
  )
}
