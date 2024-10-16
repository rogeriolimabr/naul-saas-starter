'use client'

import DataTable from '@/components/ui/datatable/table'
import React, {
  useCallback,
  useState,
  MouseEvent,
  SetStateAction,
  Dispatch,
} from 'react'

import { TrackingColumns } from './columns'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { usePagination } from '@/components/ui/datatable/hooks/usePagination'
import { useSorting } from '@/components/ui/datatable/hooks/useSorting'
import { useGlobalSearch } from '@/components/ui/datatable/hooks/useGlobalSearch'
import { FilterOption } from '@/lib/db/types'
import { Collapse, Flex, IconButton, Input, InputGroup } from '@chakra-ui/react'
import { ButtonAnimation } from '@/components/ui/custom/ButtonAnimation'
import { Icon } from '@iconify-icon/react'
import { getAllFraudProtection } from '@/lib/db/queries/brand'
import { CategoryFilters } from './category-filters'
import { DropdownFilters } from './dropdown-filters'
import SkeletonTable from '@/components/ui/custom/SkeletonTable'
import { Tracking } from '@/lib/db/schema'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

const TableProvider = () => {
  const { pagination, onPaginationChange } = usePagination()
  const { sorting, onSortingChange } = useSorting()
  const { globalSearch, onGlobalSearchChange } = useGlobalSearch()
  const [filters, setFilters] = useState<FilterOption[]>([])
  const [isSearchVisible, setSearchVisible] = useState(false)

  const handleSearchButtonClick = () => {
    setSearchVisible(!isSearchVisible)
  }

  const handleResetPagination = () => {
    onPaginationChange({ pageIndex: 0, pageSize: 10 })
  }

  const handleGlobalSearchChange = (value: string | undefined) => {
    if (value && value.length > 3) {
      onGlobalSearchChange(value)
    } else {
      onGlobalSearchChange(undefined)
    }

    handleResetPagination()
  }

  const {
    data: allFraudProtections,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      'allFraudProtections',
      globalSearch,
      pagination,
      sorting,
      filters,
    ],
    queryFn: () =>
      getAllFraudProtection({
        globalSearch,
        pagination,
        sorting,
        filters,
      }),
    placeholderData: keepPreviousData,
  })

  if (error) return <div>Error: {error.message}</div>

  const router = useRouter()

  const handleClickRow = useCallback(
    (
      e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>,
      row: Row<Tracking>
    ) => {
      if (!(e.target as HTMLElement).closest('.non-clickable')) {
        const { id } = row.original
        router.push(`/bp/fraud/${id}`)
      }
    },
    []
  )

  return (
    <Flex
      alignItems='center'
      justifyContent='space-between'
      py={4}
      gap={2}
      direction='column'
      overflow='auto'
    >
      <Flex
        w='100%'
        gap={2}
        alignItems='center'
      >
        <Flex
          alignItems='center'
          justifyContent='start'
          width='100%'
          gap={2}
          mx={4}
          display={{ base: 'none', xl: 'flex' }} // Oculta em sm e md, visível em lg e acima
        >
          <CategoryFilters
            filters={filters}
            setFilters={setFilters}
            resetPagination={handleResetPagination}
          />
        </Flex>

        <Flex
          alignItems='center'
          justifyContent='end'
          width='100%'
          gap={2}
          mx={4}
        >
          <DropdownFilters
            filters={filters}
            setFilters={setFilters}
            resetPagination={handleResetPagination}
          />
          <IconButton
            variant='outline'
            aria-label='Global Search'
            onClick={() => handleSearchButtonClick()}
            py={5}
            px={3}
            icon={
              <Icon
                icon='mdi:magnify'
                width={20}
                height={20}
              />
            }
            transition='transform 0.7s ease' // Transição suave para transformação
          />
          <Collapse in={isSearchVisible}>
            <InputGroup>
              <Input
                placeholder='Search'
                value={globalSearch}
                onChange={(event) =>
                  handleGlobalSearchChange(event.target.value)
                }
                minW={400}
                aria-hidden={false}
              />
            </InputGroup>
          </Collapse>
          <ButtonAnimation
            icon='mdi:plus'
            label='New Tracking'
            colorScheme='success'
            href='/bp/fraud/add'
          />
        </Flex>
      </Flex>
      <Flex
        direction='column'
        w='100%'
        py={4}
      >
        {isLoading || !allFraudProtections ? (
          <SkeletonTable rows={15} />
        ) : (
          <DataTable
            columns={TrackingColumns}
            data={allFraudProtections}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            sorting={sorting}
            onSortingChange={onSortingChange}
            onClickRow={handleClickRow}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default TableProvider
