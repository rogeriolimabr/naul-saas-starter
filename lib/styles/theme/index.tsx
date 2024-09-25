import { extendTheme, type StyleFunctionProps} from '@chakra-ui/react'

import colors from './colors'
import components from './components'
import config from './config'
import { fonts } from './fonts'
import semanticTokens from './semantic-tokens'

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {},
    }),
  },
  semanticTokens,
  fonts,
  colors,
  config,
  components,
  borders: {
    '1px': '1px solid var(--stacks-colors-borderPrimary)',
    dark_1px: '1px solid var(--stacks-colors-borderSecondary)',
  },
  lineHeights: {
    base: 1.15,
  },
  zIndices: {
    tooltip: 10000,
  },
  fontWeights: {
    medium: 500,
    light: 200,
    bold: 700,
    extrabold: 800,
  },
  sizes: {
    4.5: '1.125rem',
  },
  space: {
    4.5: '1.125rem',
  },
})

export default theme
