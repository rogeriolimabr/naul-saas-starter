'use client'

import LogoImageDarkMode from '@/assets/images/logo_horizontal.svg'
import LogoImageLightMode from '@/assets/images/logo_horizontal_lm.svg'
import { useColorMode } from '@chakra-ui/react'

import Image, { ImageProps } from 'next/image'

const Logo = (props: Omit<ImageProps, 'src' | 'alt'>) => {
  const { colorMode } = useColorMode()
  const LogoImage =
    colorMode === 'light' ? LogoImageLightMode : LogoImageDarkMode

  return (
    <LogoImage
      alt='logo'
      {...props}
    />
  )
}

export default Logo
