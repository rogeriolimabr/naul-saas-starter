'use client'

import DataTable from '@/components/ui/datatable/table'
import React, { useCallback, useState, MouseEvent } from 'react'

import { DeviceColumns } from './columns'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { usePagination } from '@/components/ui/datatable/hooks/usePagination'
import { useSorting } from '@/components/ui/datatable/hooks/useSorting'
import { useGlobalSearch } from '@/components/ui/datatable/hooks/useGlobalSearch'
import { FilterOption } from '@/lib/db/types'
import {
  Collapse,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  IconButton,
  Input,
  InputGroup,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { ButtonAnimation } from '@/components/ui/custom/ButtonAnimation'
import { Icon } from '@iconify-icon/react'
import { StatusFilters } from './status-filters'
import SkeletonTable from '@/components/ui/custom/SkeletonTable'
import { Device } from '@/lib/db/schema'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { getAllDevices } from '@/lib/db/queries/ics'
import { AddFormProvider } from '../add-form-provider'

const TableProvider = () => {
  const { isOpen, onOpen, onClose } = useDisclosure() // Controla o Drawer
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
    data: allDevices,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['allDevices', globalSearch, pagination, sorting, filters],
    queryFn: () =>
      getAllDevices({
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
      row: Row<Device>
    ) => {
      if (!(e.target as HTMLElement).closest('.non-clickable')) {
        const { id } = row.original
        router.push(`/ics/devices/${id}`)
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
          <StatusFilters
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
            label='New Device'
            colorScheme='success'
            onClick={onOpen} // Abre o Drawer ao clicar
          />
        </Flex>
      </Flex>
      <Flex
        direction='column'
        w='100%'
        py={4}
      >
        {isLoading || !allDevices ? (
          <SkeletonTable rows={15} />
        ) : (
          <DataTable
            columns={DeviceColumns}
            data={allDevices}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            sorting={sorting}
            onSortingChange={onSortingChange}
            onClickRow={handleClickRow}
          />
        )}
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size='md'
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent bg="backgroundSecondary">
          <DrawerCloseButton />
          <DrawerHeader>Add New Device</DrawerHeader>

          <DrawerBody>
            <AddFormProvider />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export default TableProvider
