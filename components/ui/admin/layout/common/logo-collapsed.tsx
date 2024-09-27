'use client'

import LogoImage from '@/assets/images/logo-min.svg'

import { ImageProps } from 'next/image'

const LogoCollapsed = (props: Omit<ImageProps, 'src' | 'alt'>) => {
  return (
    <LogoImage
      alt='logo'
      {...props}
    />
  )
}

export default LogoCollapsed
