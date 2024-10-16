'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { Device } from '@/lib/db/schema'
import ColumnHeader from '@/components/ui/datatable/column-header'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'

export const DeviceColumns: ColumnDef<Device>[] = [
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title='Status'
      />
    ),
    cell: ({ row }) => {
      const MapStatus = (status: string) => {
        switch (status) {
          case 'ACTIVE':
            return {
              name: 'Active',
              color: 'green.500',
              badge: (
                <Icon
                  icon='svg-spinners:pulse-multiple'
                  width={20}
                  height={20}
                  color='green.500'
                />
              ),
            }
          default:
            return {
              name: 'Inactive',
              color: 'red.500',
              badge: (
                <Icon
                  icon='oui:dot'
                  width={20}
                  height={20}
                />
              ),
            }
        }
      }
      return (
        <Flex
          direction='row'
          alignItems='center'
          justifyContent='start'
          gap={3}
          color={MapStatus(row.original.status).color}
        >
          {MapStatus(row.original.status).badge}
          <Text>{MapStatus(row.original.status).name}</Text>
        </Flex>
      )
    },
    size: 5,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title='Name'
      />
    ),
    size: 30,
  },
  {
    id: 'vendor',
    accessorKey: 'vendor',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title='Vendor / Product'
      />
    ),
    cell: ({ row }) => (
      <Flex
        align='center'
        gap={2}
      >
        <Text textTransform='capitalize'>
          {row.original.vendor.toLowerCase()} /{' '}
          {row.original.product.toLowerCase()}
        </Text>
      </Flex>
    ),
    size: 60,
  },
  {
    id: 'dork',
    accessorKey: 'dork',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title='Dork'
      />
    ),
    cell: ({ row }) => (
      <Flex
        align='center'
        gap={2}
      >
        <Text>{row.original.dork}</Text>
      </Flex>
    ),
    size: 30,
  },
  {
    id: 'version',
    accessorKey: 'version',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title='Version'
      />
    ),
    size: 10,
  },
  {
    id: 'cves',
    accessorKey: 'cves',
    header: () => 'CVEs',
    cell: () => {
      const generateRandomNumber = () => {
        return Math.floor(Math.random() * 11)
      }
      return (
        <Flex
          alignItems='center'
          justifyContent='start'
          gap={2}
        >
          <Text
            fontSize={20}
            fontFamily='number'
            color='yellow.600'
          >
            {generateRandomNumber().toString().padStart(2, '0')}
          </Text>
        </Flex>
      )
    },
    size: 10,
  },
  {
    id: 'incidents',
    accessorKey: 'incidents',
    header: () => 'Incidents',
    cell: () => {
      const generateRandomNumber = () => {
        return Math.floor(Math.random() * 11)
      }
      return (
        <Flex
          alignItems='center'
          justifyContent='start'
          gap={2}
        >
          <Text
            fontSize={20}
            fontFamily='number'
            color='red.500'
          >
            {generateRandomNumber().toString().padStart(2, '0')}
            </Text>
        </Flex>
      )
    },
    size: 10,
  },
]
