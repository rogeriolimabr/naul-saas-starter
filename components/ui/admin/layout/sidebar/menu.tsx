'use client'
import { type MenuItem } from '@/lib/config/menu'
import {
  Stack,
  Box,
  Text,
  Heading,
  Collapse,
} from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SidebarMenuItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: MenuItem
  isOpen?: boolean
  onToggle?: () => void
}) => {
  const router = useRouter()

  const handleClick = () => {
    if (!item.disabled && item.href) {
      router.push(item.href)
    } else if (item.childItems && item.childItems.length > 0 && onToggle) {
      onToggle() // Alterna o estado do menu atual
    }
  }

  const hasSubItems = item.childItems && item.childItems.length > 0
  const isChild = !item.childItems && !item.icon

  return (
    <>
      <Stack
        direction='row'
        spacing={3}
        align='center'
        roundedEnd={10}
        p={2}
        zIndex={0}
        cursor={!item.disabled ? 'pointer' : 'not-allowed'}
        position='relative'
        overflow='hidden'
        onClick={handleClick}
        _hover={isChild ? { color: 'brand' } : {}}
        sx={
          !isChild
            ? {
                '&::before': {
                  content: `""`,
                  position: 'absolute',
                  top: 0,
                  left: '100%',
                  width: '100%',
                  height: '100%',
                  bg: 'muted',
                  transition: 'left 0.3s ease',
                  zIndex: -1,
                },
                '&:hover::before': {
                  left: 0,
                },
              }
            : {}
        }
      >
        {item.icon && (
          <Box
            zIndex={0}
            ml={2}
            p={1}
            backgroundColor='boxIcon'
            rounded='md'
            color='icon'
          >
            {item.icon}
          </Box>
        )}
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          zIndex={0}
          width='100%'
        >
          <Text
            fontWeight='medium'
            fontSize='sm'
            textAlign='left'
            textOverflow='ellipsis'
            fontFamily='menu'
          >
            {item.label}
          </Text>
          {hasSubItems && (
            <Icon icon={isOpen ? 'ion:chevron-up' : 'ion:chevron-down'} />
          )}
        </Stack>
      </Stack>

      {hasSubItems && (
        <Collapse
          in={isOpen}
          animateOpacity
        >
          <Stack
            pl={12}
            spacing={2}
            mt={2}
            borderLeftWidth='2px'
            borderLeftColor='brand'
          >
            {item.childItems?.map((subItem) => (
              <SidebarMenuItem
                key={subItem.label}
                item={subItem}
              />
            ))}
          </Stack>
        </Collapse>
      )}
    </>
  )
}

export const SidebarMenu = ({
  title,
  menuItems,
}: {
  title: string
  menuItems: MenuItem[]
}) => {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const handleMenuToggle = (label: string) => {
    setOpenItem((prev) => (prev === label ? null : label)) // Alterna o item aberto
  }

  return (
    <Box
      as='nav'
      w='100%'
      h='100%'
    >
      <Heading
        fontSize={13}
        fontFamily='sans-serif'
        mb={3}
        color='muted'
        textAlign='center'
        textTransform='uppercase'
      >
        {title}
      </Heading>
      {menuItems.map((item) => (
        <SidebarMenuItem
          key={item.label}
          item={item}
          isOpen={openItem === item.label} // Verifica se este item está aberto
          onToggle={() => handleMenuToggle(item.label)} // Define qual item está aberto
        />
      ))}
    </Box>
  )
}
