'use client'

import { Box, Flex, forwardRef } from '@chakra-ui/react'

import { Button, ButtonProps } from './Button'
import { useState } from 'react'
import { Icon } from '@iconify-icon/react'

export type ButtonAnimation = ButtonProps & {
  icon: string
  label: string
  colorScheme: string
}
export const ButtonAnimation = forwardRef<ButtonAnimation, 'a'>(
  ({ icon, label, colorScheme, ...rest }, ref) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <Button
        variant='solid'
        colorScheme={colorScheme}
        color='white'
        _hover={{
          textDecoration: 'none',
        }}
        size='sm'
        py={5}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={ref}
        {...rest}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          gap={isHovered ? 2 : 0}
        >
          <Icon
            icon={icon}
            width={20}
            height={20}
          />
          <Box
            opacity={isHovered ? 1 : 0}
            transform={isHovered ? 'translateX(0)' : 'translateX(-10px)'}
            transition='opacity 0.6s ease-in-out, transform 0.6s ease-in-out'
            whiteSpace='nowrap'
          >
            {isHovered && <span>{label}</span>}{' '}
          </Box>
        </Flex>
      </Button>
    )
  }
)
