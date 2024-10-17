import React, { useMemo, useState } from 'react'
import { ICSAdvisory } from '@/lib/services/ics/types'
import {
  Table,
  Tbody,
  Td,
  TableContainer,
  Thead,
  Th,
  Tr,
  Button,
  Text,
  Select,
  Flex,
  Box,
} from '@chakra-ui/react'

import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
} from '@tanstack/react-table'

import { Icon } from '@iconify-icon/react'

export const TableProvider = ({ data }: { data: ICSAdvisory[] }) => {
  // Definindo as colunas da tabela
  const columns = useMemo<ColumnDef<ICSAdvisory>[]>(
    () => [
      {
        accessorKey: 'icsCertNumber',
        header: 'Alert Code',
      },
      {
        accessorKey: 'originalReleaseDate',
        header: 'Release Date',
      },
      {
        accessorKey: 'advisoryTitle',
        header: 'CISA ICS Advisory',
      },
      {
        accessorKey: 'vendor',
        header: 'Vendor',
      },
      {
        accessorKey: 'product',
        header: 'Product',
      },
      {
        accessorKey: 'companyHeadquarters',
        header: 'Vendor HQ',
      },
    ],
    []
  )

  // Criando a tabela usando TanStack Table
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  cursor='pointer'
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() ? (
                    header.column.getIsSorted() === 'desc' ? (
                      <Icon icon='mdi:arrow-down' />
                    ) : (
                      <Icon icon='mdi:arrow-up' />
                    )
                  ) : (
                    ''
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td
                  key={cell.id}
                  fontSize={12}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Controles de Paginação */}
      <Flex
        direction='row'
        justify='space-between'
        mt={4}
      >
        <Box>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </Button>
        </Box>
        <Text fontSize={14} mt={3}>
          Page{' '}
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
        </Text>
        <Select
        rounded='lg'
        fontSize={13}
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
          width='auto'
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
            >
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>
    </TableContainer>
  )
}
