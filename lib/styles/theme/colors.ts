import type { DeepPartial, Theme } from '@chakra-ui/react'

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  brand: {
    100: '#f9d58f', // Cor mais clara
    200: '#f3c76d',
    300: '#edb84c',
    400: '#ed9b0f', // Cor base
    500: '#ed9b0f', // A mesma cor base para o 500
    600: '#d68a0d', // Um pouco mais escura
    700: '#b5770b',
    800: '#9d650a',
    900: '#8b5808', // Cor mais escura
  },
  slate: {
    50: '#FCFCFD',
    100: '#F9F9FB',
    200: '#E8E8EC',
    300: '#D9D9E0',
    400: '#CDCED6',
    500: '#B9BBC6',
    600: '#8B8D98',
    700: '#737680',
    800: '#60646C',
    900: '#1C2024',
  },
  red: {
    100: '#FEEBEC',
    200: '#FBECEC',
    300: '#F4C0BF',
    400: '#DE9392',
    500: '#D45453',
    600: '#C83532',
  },
  orange: {
    100: '#FEFCFB',
    200: '#FDF7EE',
    300: '#FCEFD9',
    400: '#FFDFAF',
    500: '#FFBD7A',
    600: '#F59300',
  },
  green: {
    100: '#F1F9F1',
    200: '#E9F6EC',
    300: '#D9EDD4',
    400: '#9CCCAC',
    500: '#23A978',
    600: '#008051',
  },
  purple: {
    50: '#F7F8FD',
    100: '#EEF2FB',
    200: '#E5EBFA',
    300: '#CEDAFA',
    400: '#7F97F1',
    500: '#5C6CF2',
    600: '#5546FF',
    700: '#2323C7',
    800: '#0F0FA9',
    900: '#0B0A63',
  },
}

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {}

const colors = {
  ...overridenChakraColors,
  ...extendedColors,
}

export default colors
