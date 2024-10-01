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
  TableCaption,
  TableContainer,
  Input,
  Box,
  Flex,
} from '@chakra-ui/react'

import { Pagination } from './pagination'
import { ViewOptions } from './view-options'
import { Icon } from '@iconify-icon/react'
import type { Response } from '@/lib/types/datatable'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: Response<TData> | TData[]
  principalColumn?: string
  onClickRow?: (event: any, row: Row<TData>) => void
  pagination?: PaginationState
  setPagination?: Dispatch<SetStateAction<PaginationState>>
  sorting?: SortingState
  onSortingChange?: Dispatch<SetStateAction<SortingState>>
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  principalColumn = 'id',
  onClickRow,
  pagination: externalPagination,
  setPagination: externalSetPagination,
  sorting: externalSorting,
  onSortingChange: externalSetSorting,
}: DataTableProps<TData, TValue>) {
  // Use internal state if external pagination is not provided
  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 10,
    }
  )

  // Use internal state if external pagination is not provided
  const [internalSorting, setInternalSorting] = useState<SortingState>([])

  const pagination = externalPagination ?? internalPagination
  const setPagination = externalSetPagination ?? setInternalPagination

  const sorting = externalSorting ?? internalSorting
  const setSorting = externalSetSorting ?? setInternalSorting

  const table = useReactTable<TData>({
    data: 'content' in data ? data?.content : data,
    columns,
    manualPagination: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: { pagination, sorting },
    getCoreRowModel: getCoreRowModel<TData>(),
    getFilteredRowModel: getFilteredRowModel(),
    rowCount: 'content' in data ? data?.totalPages * 10 : data.length + 1,
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
  })

  return (
    <Box minHeight='100%'>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        py={4}
        gap={2}
      >
        <Flex
          w='100%'
          gap={2}
          alignItems='center'
        >
          {/* <Input
            icon={<Icon icon='mdi:magnify' />}
            placeholder='Buscar'
            value={
              (table.getColumn(principalColumn)?.getFilterValue() as string) ??
              ''
            }
            onChange={(event) =>
              table
                .getColumn(principalColumn)
                ?.setFilterValue(event.target.value)
            }
            className='w-full'
            aria-hidden
          /> */}
        </Flex>
        {/* <ViewOptions table={table} /> */}
      </Flex>
      <Box
        px={1}
        minH='600px'
      >
        <Box
          rounded={10}
          borderColor='borderPrimary'
          h='100%'
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
                        textAlign='center'
                        w={header.getSize()}
                        maxW={header.getSize()}
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
            <Tbody borderX='none'>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <Tr
                    key={row.id}
                    onClick={onClickRow ? (e) => onClickRow(e, row) : undefined}
                    data-state={row.getIsSelected() && 'selected'}
                    height={14}
                    _hover={{ bg: 'gray.100' }}
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
              <Tr
                bg='background'
                h={14}
              >
                <Td colSpan={columns.length}>
                  {/* <Pagination table={table} /> */}
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      </Box>
    </Box>
  )
}
