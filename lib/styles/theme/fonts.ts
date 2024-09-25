import type { DeepPartial, Theme } from '@chakra-ui/react'
import { Kanit as FontBody } from 'next/font/google'

export const fontBody = FontBody({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const fonts: DeepPartial<Theme['fonts']> = {
  heading: fontBody.style.fontFamily,
  body: fontBody.style.fontFamily,
}
