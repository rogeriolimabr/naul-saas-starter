'use client'

import { type Table } from '@tanstack/react-table'
import { Button, Flex, HStack, Text } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react' // Importando o Iconify

interface PaginationProps<TData> {
  table: Table<TData>
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <HStack
      justify='space-between'
      spacing={2}
    >
      <Button
        as={Flex}
        alignItems='center'
        justifyContent='space-between'
		gap={3}
        variant='outline'
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <Icon
          icon='typcn:arrow-left-thick'
          width={12}
          height={12}
        />
        <Text fontSize={12}>Previous</Text>
      </Button>

      <Button
        variant='ghost'
        disabled
		fontSize={12}
      >
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount() ?? 1}
      </Button>

      <Button
        as={Flex}
        alignItems='center'
        justifyContent='space-between'
		gap={3}
        variant='outline'
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <Text fontSize={12}>Next</Text>
        <Icon
          icon='typcn:arrow-right-thick'
          width={12}
          height={12}
        />
      </Button>
    </HStack>
  )
}
