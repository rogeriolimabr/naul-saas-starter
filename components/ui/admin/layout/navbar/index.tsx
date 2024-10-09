'use client'

import { Stack } from '@chakra-ui/react'
import React from 'react'
import ToggleSidebar from './components/toggle-sidebar'
import GlobalSearch from './components/search'
import Breadcrumbs from './components/breadcrumbs'
import ToggleTheme from './components/toggle-theme'
import Notifications from './components/notifications'
import Messages from './components/messages'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <Stack
      p={6}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Stack
        direction='row'
        w='100%'
        alignItems='center'
        gap={4}
      >
        <ToggleSidebar />
        <Breadcrumbs />
      </Stack>
      <Stack
        direction='row'
        w='100%'
        justifyContent='end'
        gap={3}
      >
        <GlobalSearch />
        <Messages />
        <Notifications />
        <ToggleTheme />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Stack>
    </Stack>
  )
}

export default Navbar
