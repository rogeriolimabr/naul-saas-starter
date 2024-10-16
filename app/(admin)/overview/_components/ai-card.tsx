'use client'

import {
  Card,
  Text,
  Flex,
  GridItem,
  CardBody,
  Box,
  Button,
} from '@chakra-ui/react'

import { Icon } from '@iconify-icon/react'

export const AICard = () => {
  return (
    <GridItem>
      <Card
        overflow='hidden'
        variant='outline'
        rounded={20}
        cursor='pointer'
        transition='all 0.4s'
        bg='backgroundSecondary'
        h='100%'
        _hover={{
          transform: 'scale(1.09)',
          boxShadow: 'lg',
        }}
      >
        <CardBody>
          <Flex
            direction='row'
            w='100%'
          >
            <Flex
              direction='column'
              w='100%'
              justifyContent='center'
              gap={3}
            >
              <Flex
                direction='row'
                gap={3}
                justifyContent='start'
                alignItems='center'
              >
                <Box
                  bg='borderSecondary'
                  p={3}
                  rounded={10}
                >
                  <Icon
                    icon='ic:twotone-insights'
                    width={24}
                    height={24}
                  />
                </Box>

                <Text
                  as='h5'
                  color='text'
                  fontSize={16}
                  fontFamily='number'
                >
                  AI-ARC Intelligence
                </Text>
              </Flex>
              <Text
                as='p'
                fontSize={13}
                fontFamily='label'
                color='menuLabel'
              >
                Unlock actionable insights with AI-powered intelligence
                analytics.
              </Text>
              <Button variant='solid' colorScheme='brand' color='text' fontSize={13} textTransform={'uppercase'}>Get Insights</Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </GridItem>
  )
}
