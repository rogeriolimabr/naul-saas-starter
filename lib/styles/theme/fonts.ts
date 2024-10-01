import {
  Open_Sans as FontBody,
  Kanit,
  Manrope,
  Play,
  Questrial,
  Rubik,
  Lexend_Deca
} from 'next/font/google'

export const fontBody = FontBody({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400'],
})

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

const questrial = Questrial({
  subsets: ['latin'],
  variable: '--font-questrial',
  weight: ['400'],
})

const play = Play({
  subsets: ['latin'],
  variable: '--font-play',
  weight: ['400'],
})

const lexend = Lexend_Deca({
  subsets: ['latin'],
  variable: '--font-lexend',
  weight: ['400'],
})

export const fonts = {
  heading: fontBody.style.fontFamily,
  body: fontBody.style.fontFamily,
  menu: play.style.fontFamily,
  footer: questrial.style.fontFamily,
  title: lexend.style.fontFamily,
  number: kanit.style.fontFamily,
  label: manrope.style.fontFamily,
}
