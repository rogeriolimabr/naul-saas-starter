'use client'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  type AddDeviceValues,
  deviceSchema,
} from '@/lib/validations/ics/devices'
import { addDevice } from '@/lib/db/queries/ics'
import React from 'react'

export const AddFormProvider = () => {
  const toast = useToast()
  const { onClose } = useDisclosure() // Controla o Drawer

  // Configurando React Hook Form com validação Zod
  const methods = useForm<AddDeviceValues>({
    resolver: zodResolver(deviceSchema),
  })

  // Mutação para criar o device
  const mutation = useMutation({
    mutationKey: ['allDevices'],
    mutationFn: (data: AddDeviceValues) => addDevice(data),
    onSuccess: () => {
      toast({
        title: 'Device created.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onClose()
      methods.reset()
    },
    onError: () => {
      toast({
        title: 'Failed to create device.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        style={{ height: '100%' }}
      >
        <Flex
          direction='column'
          justify='space-between'
          height='100%' // Garante que o Flex ocupa toda a altura do contêiner
          py={6}
        >
          <Grid
            templateColumns='repeat(1fr)'
            gap={6}
            mt={8}
          >
            <FormControl isRequired>
              <FormLabel fontFamily='menu'>Device Name</FormLabel>
              <Input
                {...methods.register('name')}
                fontFamily='menu'
                placeholder='Device Name'
                _focusVisible={{ outline: 'none' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontFamily='menu'>Vendor</FormLabel>
              <Input
                fontFamily='menu'
                {...methods.register('vendor')}
                placeholder='Vendor'
                _focusVisible={{ outline: 'none' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontFamily='menu'>Product</FormLabel>
              <Input
                fontFamily='menu'
                {...methods.register('product')}
                placeholder='Product'
                _focusVisible={{ outline: 'none' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontFamily='menu'>Dork</FormLabel>
              <Input
                fontFamily='menu'
                {...methods.register('dork')}
                placeholder='Dork'
                _focusVisible={{ outline: 'none' }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontFamily='menu'>Version</FormLabel>
              <Input
                fontFamily='menu'
                {...methods.register('version')}
                placeholder='Version'
                _focusVisible={{ outline: 'none' }}
              />
            </FormControl>
          </Grid>

          <Box
            mt={4}
            textAlign='center'
          >
            <Button
              size='lg'
              type='submit'
              isLoading={mutation.isPending}
              width='full'
              bg='brand'
              _hover={{ bg: 'brand.700' }}
            >
              Create
            </Button>
          </Box>
        </Flex>
      </form>
    </FormProvider>
  )
}
