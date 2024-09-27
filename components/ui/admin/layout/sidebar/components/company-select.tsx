'use client'

import { Company } from '@/lib/db/schema'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Box,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatCNPJ } from '@/lib/helpers/parsers'
import { useLayout } from '@/lib/hooks/useLayout'

const CompanySelect = ({ companies }: { companies: Company[] }) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>()
  const { isSidebarOpen } = useLayout()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  // Função para salvar a empresa selecionada no localStorage
  const saveSelectedCompany = (company: Company) => {
    localStorage.setItem('selectedCompany', JSON.stringify(company))
    setSelectedCompany(company)
  }

  // Ao montar o componente, busca a empresa do localStorage ou define a padrão
  useEffect(() => {
    const savedCompany = localStorage.getItem('selectedCompany')

    if (savedCompany) {
      // Se já existir uma empresa salva no localStorage, definir como selecionada
      setSelectedCompany(JSON.parse(savedCompany))
    } else {
      // Se não houver empresa no localStorage, busca a primeira empresa com `isMaster === true`
      const defaultCompany = companies.find((company) => company.isMaster)

      if (defaultCompany) {
        saveSelectedCompany(defaultCompany)
      } else {
        // Se não houver empresa `isMaster`, redireciona para a página de erro 400
        // router.push('/error/400')
      }
    }
  }, [companies, router])

  return (
    <Menu
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <MenuButton
        as={Button}
        h='auto'
        w='100%'
        borderRadius='md'
        backgroundColor='transparent'
        border={'1px solid'}
        borderColor='borderPrimary'
        _hover={{ backgroundColor: 'background' }}
        _focus={{ backgroundColor: 'background' }}
        padding={3}
        textAlign='left'
        rightIcon={
          isSidebarOpen ? (
            isOpen ? (
              <Icon icon='ion:chevron-collapse' />
            ) : (
              <Icon icon='ion:chevron-expand' />
            )
          ) : undefined
        }
      >
        <Stack
          direction='row'
          spacing={5}
          align='center'
        >
          {selectedCompany?.avatarUrl && (
            <Avatar
              size='md'
              src={selectedCompany.avatarUrl}
            />
          )}
          {isSidebarOpen && (
            <Box>
              <Text
                fontWeight='semibold'
                fontSize='smaller'
                color='text'
                isTruncated
              >
                {selectedCompany?.shortName}
              </Text>
              <Text
                fontWeight='light'
                fontSize='x-small'
                fontFamily='monospace'
                color='borderPrimary'
              >
                {selectedCompany?.cnpj &&
                  formatCNPJ(selectedCompany.cnpj, true)}
              </Text>
            </Box>
          )}
        </Stack>
      </MenuButton>

      {/* A lista de opções */}
      <MenuList
        w={260}
        background='background'
      >
        {companies.map((company) => (
          <MenuItem
            backgroundColor='background'
            key={company.id}
            onClick={() => saveSelectedCompany(company)} // Chama diretamente a função saveSelectedCompany
            _hover={{ bg: 'brand', color: 'background' }} // Estilo ao passar o mouse
            _focus={{ bg: 'brand', color: 'background' }} // Estilo ao focar
          >
            <Stack
              direction='row'
              spacing={3}
              align='center'
            >
              <Avatar
                size='md'
                name={company.fullName}
                src={company.avatarUrl ?? undefined}
              />
              <VStack
                maxW={150}
                alignItems='start'
                gap={1}
              >
                <Text
                  fontWeight='medium'
                  fontSize='smaller'
                  textOverflow='ellipsis'
                >
                  {company.fullName}
                </Text>
                <Text
                  fontSize='smaller'
                  fontFamily='monospace'
                >
                  {formatCNPJ(company.cnpj, true)}
                </Text>
              </VStack>
            </Stack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CompanySelect
