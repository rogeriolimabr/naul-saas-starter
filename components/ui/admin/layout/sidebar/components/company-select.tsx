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
} from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const CompanySelect = ({ companies }: { companies: Company[] }) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>()
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
        h={20}
        w='100%'
        borderRadius='md'
        border={'1px solid'}
        borderColor='transparent'
        _focus={{ boxShadow: '0 0 0 1px gray.500' }}
        padding={3}
        textAlign='left'
        rightIcon={
          isOpen ? (
            <Icon icon='ion:chevron-collapse' />
          ) : (
            <Icon icon='ion:chevron-expand' />
          )
        }
      >
        <Stack
          direction='row'
          spacing={5}
          align='center'
        >
          {selectedCompany?.avatarUrl && (
            <Avatar
              size='lg'
              src={selectedCompany.avatarUrl}
            />
          )}
          <Box>
            <Text fontWeight='bold'>{selectedCompany?.fullName}</Text>
            <Text
              fontSize='sm'
              color='gray.500'
            >
              {selectedCompany?.cnpj}
            </Text>
          </Box>
        </Stack>
      </MenuButton>

      {/* A lista de opções */}
      <MenuList w={250}>
        {companies.map((company) => (
          <MenuItem
            key={company.id}
            onClick={() => setSelectedCompany(company)} // Ao clicar, o nome da empresa é selecionado
            _hover={{ bg: 'brand' }} // Estilo ao passar o mouse
            _focus={{ bg: 'brand' }} // Estilo ao focar
          >
            {/* Exibindo avatar, título e subtítulo */}
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
              <Box>
                <Text fontWeight='bold'>{company.fullName}</Text>
                <Text
                  fontSize='sm'
                  color='text'
                >
                  {company.cnpj}
                </Text>
              </Box>
            </Stack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CompanySelect
