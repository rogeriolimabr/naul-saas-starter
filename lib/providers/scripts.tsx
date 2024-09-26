'use client'

import { ColorModeScript } from '@chakra-ui/react'
import theme from '../styles/theme'

const Scripts = () => {
  return (
    <ColorModeScript
      initialColorMode={theme.config?.initialColorMode}
      type='cookie'
    />
  )
}

export default Scripts
