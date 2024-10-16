'use client'

import { getFraudProtection } from '@/lib/db/queries/brand'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Text,
  Stack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

export const DataProvider = ({ id }: { id: string }) => {
  const {
    data: tracking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['fraud', id],
    queryFn: () => getFraudProtection(id),
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
            Fraud Protection
          </Text>
          <Text
            as={'h2'}
            fontSize={14}
            fontFamily='menu'
            color='borderPrimary'
          >
            {tracking?.category} | {id}
          </Text>
        </Box>
      </Flex>
    </Stack>
  )
}
