'use client'

import { useLayout } from '@/lib/hooks/useLayout'
import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Skeleton,
  useColorMode,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Logo from '../common/logo'
import CompanySelect from './components/company-select'
import { getAllCompanies } from '@/lib/db/queries/company'

const Sidebar = () => {
  const { isSidebarOpen } = useLayout()
  const { toggleColorMode } = useColorMode()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['companies'],
    queryFn: () => getAllCompanies(),
  })

  return (
    <Box
      transition='all'
      transitionDuration='600ms'
      roundedEnd={12}
      borderEnd={'1px solid'}
      borderColor='muted'
      color='text'
      h='screen'
      w={isSidebarOpen ? '290px' : '80px'}
    >
      <SimpleGrid
        columns={1}
        spacing={3}
      >
        <Flex
          pt={6}
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
        <Divider borderColor='muted' />
        {data && (
          <Box p={4}>
            {isLoading ? (
              <Skeleton h={30} />
            ) : (
              <CompanySelect companies={data} />
            )}
          </Box>
        )}
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
