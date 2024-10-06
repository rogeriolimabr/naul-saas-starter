'use client'

import { type Table } from '@tanstack/react-table'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Checkbox,
  Text,
  Flex,
} from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'

interface ViewOptionsProps<TData> {
  table: Table<TData>
}

export function ViewOptions<TData>({ table }: ViewOptionsProps<TData>) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant='outline'
        size='lg'
        ml='auto'
        h='10'
      >
        <Flex alignItems='center'>
          <Icon
            icon='ph:eye-duotone'
            width={19}
            height={19}
          />
        </Flex>
      </MenuButton>
      <MenuList>
        <Text
          fontWeight='bold'
          px={4}
        >
          Columns Visibility
        </Text>
        <MenuDivider />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => (
            <MenuItem
              key={column.id}
              as={Flex}
              alignItems='center'
            >
              <Checkbox
                isChecked={column.getIsVisible()}
                onChange={(e) => column.toggleVisibility(e.target.checked)}
                mr={2}
              />
              <Text>{column.id}</Text>
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  )
}
