'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import {
  ChakraProvider,
  ChakraProviderProps,
  cookieStorageManager,
} from '@chakra-ui/react'

import theme from '@/lib/styles/theme'

export interface UIProviderProps extends ChakraProviderProps {
  cookies?: string
}

export const UIProvider = (props: UIProviderProps) => {
  const { children } = props

  return (
    <CacheProvider>
      <ChakraProvider
        colorModeManager={cookieStorageManager}
        theme={theme}
      >
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
