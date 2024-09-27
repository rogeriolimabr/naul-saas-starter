'use client'

import { Box } from '@chakra-ui/react'
import { UserButton } from '@clerk/nextjs'

export const Profile = () => {
  return (
    <Box
      py={1}
      px={2}
    >
      <UserButton />
    </Box>
  )
}
