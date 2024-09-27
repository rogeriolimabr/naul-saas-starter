'use client'

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

import Link from 'next/link'
import { type MenuItem, mergedMenu } from '@/lib/config/menu'

const Breadcrumbs = () => {
  const pathname = usePathname()

  // Função recursiva para encontrar o label com base no href
  const findMenuItemByHref = (
    menuItems: MenuItem[],
    href: string
  ): MenuItem | null => {
    for (const item of menuItems) {
      if (item.href === href) {
        return item
      } else if (item.childItems && item.childItems.length > 0) {
        const found = findMenuItemByHref(item.childItems, href)
        if (found) return found
      }
    }
    return null
  }

  // Divide o pathname em partes para gerar os breadcrumbs
  const pathParts = pathname.split('/').filter(Boolean).slice(0, 3)

  return (
    <Box display={{ base: 'none', '2xl': 'block' }}>
      <Breadcrumb
        spacing='8px'
        separator='/'
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            href='/'
            color='textSubdued'
            _hover={{ color: 'brand', textDecoration: 'none' }}
          >
            Arcanjo
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Gerar breadcrumbs dinamicamente com base no menu */}
        {pathParts.map((_, index) => {
          // Construir o href parcial acumulativo
          const href = '/' + pathParts.slice(0, index + 1).join('/')

          // Procurar o item de menu correspondente ao href
          const menuItem = findMenuItemByHref(mergedMenu, href)

          if (menuItem) {
            return (
              <BreadcrumbItem
                key={href}
                isCurrentPage={index === pathParts.length - 1}
              >
                {index === pathParts.length - 1 ? (
                  <BreadcrumbLink
                    color='textSubdued'
                    _hover={{ color: 'brand', textDecoration: 'none' }}
                  >
                    {menuItem.label}
                  </BreadcrumbLink> // Último item não tem link
                ) : (
                  <BreadcrumbLink
                    as={Link}
                    href={menuItem.href}
                    color='textSubdued'
                    _hover={{ color: 'brand', textDecoration: 'none' }}
                  >
                    {menuItem.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            )
          }
          return null
        })}
      </Breadcrumb>
    </Box>
  )
}

export default Breadcrumbs
