'use client'
import { useLayout } from '@/lib/hooks/useLayout'
import { Box, IconButton, Stack } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import React from 'react'

const Navbar = () => {
  const { isSidebarOpen, toggleSidebar } = useLayout()
  return (
    <Stack
      p={6}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Box>
        <IconButton
          aria-label={''}
          onClick={() => toggleSidebar()}
        >
          <Icon
            icon={isSidebarOpen ? 'ic:round-menu-open' : 'ic:round-menu'}
            width={24}
            height={24}
          />
        </IconButton>
      </Box>
      <Box>
        <IconButton aria-label={''}>
          <Icon icon='ion:menu' />
        </IconButton>
      </Box>
    </Stack>
  )
}

export default Navbar
