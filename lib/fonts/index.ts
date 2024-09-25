// app/fonts.ts
import { Kanit, Manrope, Rubik } from 'next/font/google'

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const kanit = Kanit({
  subsets: ['latin'],
  variable: '--font-kanit',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const fonts = {
  rubik,
  manrope,
  kanit,
}
