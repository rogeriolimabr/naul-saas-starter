'use client'

import { useLayout } from '@/lib/hooks/useLayout'
import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  useColorMode
} from '@chakra-ui/react'
import React from 'react'
import Logo from '../common/logo'
import CompanySelect from './components/company-select'

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useLayout()
  const { toggleColorMode } = useColorMode()


  return (
    <Box
      p={4}
      transition='all'
      transitionDuration='300ms'
      roundedEnd={12}
      borderEnd={'1px solid'}
      borderColor='gray.700'
      color='text'
      h='screen'
      w={isSidebarOpen ? '290px' : '80px'}
    >
      <SimpleGrid
        columns={1}
        spacing={3}
      >
        <Flex
          height={140}
          justifyContent={'center'}
          alignItems={'center'}
          transition='transform 0.2s ease-in-out' // Transição suave
          _hover={{
            cursor: 'pointer',
            transform: 'scale(1.06)', // Aplica o scale ao passar o mouse
          }}
          onClick={() => toggleColorMode()}
        >
          <Logo width={220} />
        </Flex>
        <Divider borderColor="muted" />
        <Box>
          <CompanySelect />
        </Box>
        <Box
          bg='tomato'
          height='80px'
        ></Box>
        <Box
          bg='tomato'
          height='80px'
        ></Box>
        <Box
          bg='tomato'
          height='80px'
        ></Box>
      </SimpleGrid>
    </Box>
  )
}

export default Sidebar
