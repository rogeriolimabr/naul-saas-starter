'use client'

import { useLayout } from '@/lib/hooks/useLayout'
import {
  Box,
  Divider,
  Flex,
  Skeleton,
  VStack,
} from '@chakra-ui/react'
import { Tooltip } from '@/components/ui/custom/Tooltip'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Logo from '../common/logo'
import CompanySelect from './components/company-select'
import { getAllCompanies } from '@/lib/db/queries/company'
import { SidebarFooter } from './footer'
import { SidebarMenu } from './menu'
import { InternalArea, MenuItems, OurServices } from '@/lib/config/menu'
import LogoCollapsed from '../common/logo-collapsed'

const Sidebar = () => {
  const { isSidebarOpen } = useLayout()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['companies'],
    queryFn: () => getAllCompanies(),
  })

  return (
    <Flex
      transition='all'
      transitionDuration='600ms'
      roundedEnd={12}
      borderEnd={'1px solid'}
      borderColor='borderPrimary'
      backgroundColor='backgroundSecondary'
      w={isSidebarOpen ? '295px' : '110px'}
      direction='column'
    >
      <Flex
        py={6}
        height={140}
        justifyContent={'center'}
        alignItems={'center'}
        transition='transform 0.2s ease-in-out' // Transição suave
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.09)', // Aplica o scale ao passar o mouse
        }}
      >
        {isSidebarOpen ? <Logo width={200} /> : <LogoCollapsed width={80} />}
      </Flex>
      <Divider borderColor='borderPrimary' />
      {data && (
        <Box p={4}>
          {isLoading ? <Skeleton h={30} /> : <CompanySelect companies={data} />}
        </Box>
      )}
      <Divider borderColor='borderPrimary' />
      <VStack
        h={'100%'}
        spacing={3}
        pt={4}
        pr={1}
        justifyContent='space-between'
      >
        <SidebarMenu
          title='Active Modules'
          menuItems={MenuItems}
        />
        <Divider borderColor='borderPrimary' />
        <SidebarMenu
          title='Our Services'
          menuItems={OurServices}
        />
        <Divider borderColor='borderPrimary' />
        <SidebarMenu
          title='Internal Area'
          menuItems={InternalArea}
        />
        <Divider borderColor='borderPrimary' />
        <Tooltip label='ADINT - Cyber Intelligence Institute' hidden={isSidebarOpen}>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            direction='column'
            py={6}
            gap={4}
            transition='transform 0.2s ease-in-out' // Transição suave
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.12)', // Aplica o scale ao passar o mouse
            }}
          >
            <SidebarFooter />
          </Flex>
        </Tooltip>
      </VStack>
    </Flex>
  )
}

export default Sidebar
