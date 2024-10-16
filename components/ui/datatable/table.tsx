'use client'

import {
  type ColumnDef,
  type Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
  useColorMode,
} from '@chakra-ui/react'

import type { ResponseTable } from '@/lib/db/types'
import React, { Dispatch, SetStateAction } from 'react'
import { Pagination } from './pagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: ResponseTable<TData>
  onClickRow?: (event: any, row: Row<TData>) => void
  pagination?: PaginationState
  onPaginationChange?: Dispatch<SetStateAction<PaginationState>>
  sorting?: SortingState
  onSortingChange?: Dispatch<SetStateAction<SortingState>>
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  onClickRow,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  const { colorMode } = useColorMode()

  const table = useReactTable<TData>({
    data: data.records,
    columns,
    manualPagination: true,
    onPaginationChange,
    onSortingChange,
    state: { pagination, sorting },
    getCoreRowModel: getCoreRowModel<TData>(),
    getFilteredRowModel: getFilteredRowModel(),
    rowCount: data.pagination.total,
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
  })

  return (
    <Box
      rounded={10}
      borderColor='borderPrimary'
      h='100%'
      w='100%'
      overflow='auto'
    >
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    fontWeight='bold'
                    fontSize={13}
                    textAlign='left'
                    w={header.getSize()}
                    maxW={header.getSize()}
                    px={2}
                    py={2}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody
          borderX='none'
          fontFamily='menu'
          fontWeight={400}
        >
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                onClick={onClickRow ? (e) => onClickRow(e, row) : undefined}
                data-state={row.getIsSelected() && 'selected'}
                height={14}
                _hover={{
                  bg: colorMode == 'dark' ? 'dark.800' : 'slate.100',
                }}
                cursor={onClickRow ? 'pointer' : 'auto'}
                borderBottomWidth={
                  table.getRowModel().rows.length === 1 ? 1 : 0
                }
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                })}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td
                colSpan={columns.length}
                textAlign='center'
                height={24}
              >
                No results
              </Td>
            </Tr>
          )}
        </Tbody>
        <Tfoot>
          <Tr h={14}>
            <Td
              colSpan={columns.length}
              borderY='none'
            >
              <Pagination table={table} />
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}
