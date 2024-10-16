'use client'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  Box,
} from '@chakra-ui/react'

const SkeletonTable = ({ rows = 10 }: { rows: number }) => {
  return (
    <Table
      variant='striped'
      colorScheme='gray'
    >
      <Thead>
        <Tr>
          <Th>
            <Skeleton
              height='20px'
              width='100px'
            />
          </Th>
          <Th>
            <Skeleton
              height='20px'
              width='100px'
            />
          </Th>
          <Th>
            <Skeleton
              height='20px'
              width='100px'
            />
          </Th>
          <Th>
            <Skeleton
              height='20px'
              width='100px'
            />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {Array.from({ length: rows }).map((_, index) => (
          <Tr key={index}>
            <Td>
              <Skeleton height='20px' />
            </Td>
            <Td>
              <Skeleton height='20px' />
            </Td>
            <Td>
              <Skeleton height='20px' />
            </Td>
            <Td>
              <Skeleton height='20px' />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default SkeletonTable
