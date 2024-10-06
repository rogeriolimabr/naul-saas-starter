'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { Tracking } from '@/lib/db/schema'
import ColumnHeader from '@/components/ui/datatable/column-header'
import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import { Line, LineChart, ResponsiveContainer } from 'recharts'

export const TrackingColumns: ColumnDef<Tracking>[] = [
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
          case 'PENDING':
            return {
              name: 'Pending',
              color: 'blue.500',
              badge: (
                <Icon
                  icon='svg-spinners:3-dots-scale'
                  width={20}
                  height={20}
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
    size: 20,
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title='Category'
      />
    ),
    cell: ({ row }) => {
      const MapCategory = (category: string) => {
        switch (category) {
          case 'DEEPWEB':
            return {
              name: 'Deep Web',
              avatar: (
                <Avatar
                  size='xs'
                  name='Deep Web'
                  src='/images/deep-web.png'
                />
              ),
            }
          case 'SURFACEWEB':
            return {
              name: 'Surface Web',
              avatar: (
                <Avatar
                  size='xs'
                  name='Surface Web'
                  src='/images/surface-web.png'
                />
              ),
            }
          case 'SOCIALMEDIA':
            return {
              name: 'Social Media',
              avatar: (
                <Avatar
                  size='xs'
                  name='Social Media'
                  src='/images/social-media.png'
                />
              ),
            }
          case 'IP':
            return {
              name: 'IP Address',
              avatar: (
                <Avatar
                  size='xs'
                  name='IP Address'
                  src='/images/ip.png'
                />
              ),
            }
          case 'KEYWORDS':
            return {
              name: 'Data Leaks',
              avatar: (
                <Avatar
                  size='xs'
                  name='Data Leaks'
                  src='/images/data-leaks.png'
                />
              ),
            }
          default:
            return {
              name: 'Others',
              avatar: (
                <Avatar
                  size='xs'
                  name='Others'
                  src='/images/others.png'
                />
              ),
            }
        }
      }

      return (
        <Flex
          align='center'
          gap={4}
        >
          {MapCategory(row.original.category).avatar}
          <Text>{MapCategory(row.original.category).name}</Text>
        </Flex>
      )
    },
    size: 20,
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
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title='Description'
      />
    ),
    size: 60,
  },
  {
    id: 'frequency',
    accessorKey: 'frequency',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title='Frequency'
      />
    ),
    cell: ({ row }) => (
      <Flex
        align='center'
        gap={2}
      >
        <Text textTransform='capitalize'>
          {row.original.frequency.toLowerCase()}
        </Text>
      </Flex>
    ),
    size: 20,
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title='Priority'
      />
    ),
    cell: ({ row }) => {
      const MapPriority = (priority: string) => {
        switch (priority) {
          case 'CRITICAL':
            return {
              name: 'Critical',
              color: 'red',
              icon: (
                <Icon
                  icon='icon-park-twotone:zero-key'
                  width={25}
                  height={25}
                />
              ),
            }
          case 'HIGH':
            return {
              name: 'High',
              color: 'orangered',
              icon: (
                <Icon
                  icon='icon-park-twotone:one-key'
                  width={25}
                  height={25}
                />
              ),
            }
          case 'MEDIUM':
            return {
              name: 'Medium',
              color: 'yellow.500',
              icon: (
                <Icon
                  icon='icon-park-twotone:two-key'
                  width={25}
                  height={25}
                />
              ),
            }
          case 'LOW':
            return {
              name: 'Low',
              color: 'success',
              icon: (
                <Icon
                  icon='icon-park-twotone:three-key'
                  width={25}
                  height={25}
                />
              ),
            }
          default:
            return {
              name: 'Unknown',
              color: 'success',
              icon: (
                <Icon
                  icon='icon-park-twotone:four-key'
                  width={25}
                  height={25}
                />
              ),
            }
        }
      }
      return (
        <Flex
          alignItems='center'
          justifyContent='start'
          gap={2}
          color={MapPriority(row.original.priority).color}
        >
          {MapPriority(row.original.priority).icon}
          <Text>{MapPriority(row.original.priority).name}</Text>
        </Flex>
      )
    },
    size: 20,
  },
  {
    id: 'incidents',
    accessorKey: 'incidents',
    header: () => 'Incidents',
    cell: ({ row }) => {
      const generateRandomNumber = () => {
        return Math.floor(Math.random() * 100)
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
          >
            {generateRandomNumber()}
          </Text>
        </Flex>
      )
    },
    size: 20,
  },
]
