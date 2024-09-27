'use client'

import { IconButton, useColorMode } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'

const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label={''}
      onClick={() => toggleColorMode()}
    >
      <Icon
        icon={colorMode == 'light' ? 'tdesign:mode-dark' : 'tdesign:mode-light'}
        width={20}
        height={20}
      />
    </IconButton>
  )
}

export default ToggleTheme
