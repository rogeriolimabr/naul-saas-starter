'use client'

import { getDevice } from '@/lib/db/queries/ics'
import {
  Box,
  Flex,
  Text,
  Stack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

export const DataProvider = ({ id }: { id: string }) => {
  const {
    data: device,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['device', id],
    queryFn: () => getDevice(id),
  })

  return (
    <Stack m={4}>
      <Flex
        direction='column'
        gap={4}
      >
        <Box
          boxShadow='sm'
          p={6}
        >
          <Text
            as={'h2'}
            fontSize={20}
            fontFamily='menu'
          >
            Hunter Devices
          </Text>
          <Text
            as={'h2'}
            fontSize={14}
            fontFamily='menu'
            color='borderPrimary'
          >
            {device?.name} | {id}
          </Text>
        </Box>
      </Flex>
    </Stack>
  )
}
