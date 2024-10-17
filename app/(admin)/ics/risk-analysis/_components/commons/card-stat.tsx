'use client'

import {
  Card,
  CardBody,
  CardHeader,
  Text,
  Flex,
  useColorMode,
} from '@chakra-ui/react'

export const CardStatItem = ({
  title,
  value,
  label,
}: {
  title: string
  value: number
  label: string
}) => {
  const { colorMode } = useColorMode() // Obtém o modo de cor atual

  return (
    <Card
      overflow='hidden'
      variant='outline'
      rounded={20}
      cursor='pointer'
      transition='all 0.4s'
      _hover={{
        transform: 'scale(1.09)',
        boxShadow: 'lg',
      }}
    >
      <CardHeader
        bg='backgroundSecondary'
        py={4}
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
      >
        <Text fontSize={14}>{title}</Text>
      </CardHeader>
      <CardBody>
        <Flex
          direction='row'
          w='100%'
        >
          <Flex
            direction='column'
            w='100%'
            justifyContent='center'
            alignItems='center'
          >
            <Text
              as='h5'
              color='text'
              fontSize={30}
              fontFamily='number'
              mb={2}
            >
              {value}
            </Text>
            <Text
              as='p'
              fontSize={13}
              fontFamily='label'
              color='menuLabel'
            >
              {label}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
