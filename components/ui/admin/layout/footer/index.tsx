'use client'
import { Box, Flex, IconButton, Stack, Text } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <Stack
      p={6}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Flex
        direction='row'
        justifyContent='start'
        alignItems='center'
        gap={3}
      >
        <IconButton
          as={Link}
          target='_blank'
          icon={<Icon icon='brandico:instagram' />}
          href={'https://www.instagram.com/adint.institute/'}
          aria-label={''}
        />
        <IconButton
          as={Link}
          target='_blank'
          href={'https://www.linkedin.com/company/adint-institute/'}
          icon={<Icon icon='brandico:linkedin' />}
          aria-label={''}
        />
      </Flex>
      <Text
        color='text'
        fontSize={13}
        fontFamily='footer'
        textAlign={'right'}
      >
        {year} @ Copyright - Todos os direitos reservados para ADINT Cyber
        Intelligence Institute
      </Text>
    </Stack>
  )
}

export default Footer
