'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import {
  ChakraProvider,
  ChakraProviderProps,
  ColorModeScript,
  cookieStorageManager,
  cookieStorageManagerSSR,
} from '@chakra-ui/react'

import theme from '@/lib/styles/theme'

export interface UIProviderProps extends ChakraProviderProps {
  cookies?: string
}

export const UIProvider = (props: UIProviderProps) => {
  const { cookies = '', children } = props
  const colorModeManager = cookieStorageManagerSSR(cookies)

  return (
    <CacheProvider>
      <ColorModeScript
        initialColorMode={theme.config?.initialColorMode}
        type='cookie'
      />
      <ChakraProvider
        colorModeManager={cookieStorageManager}
        theme={theme}
      >
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
