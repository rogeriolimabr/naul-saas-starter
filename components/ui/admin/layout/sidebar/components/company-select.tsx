'use client'

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
  useTheme,
} from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import { useState } from 'react'

const CompanySelect = () => {
  const theme = useTheme()
  const [selectedCompany, setSelectedCompany] = useState({
    id: 'default',
    name: 'Select company',
    subtitle: 'Choose from the list',
    avatarUrl: '',
  })

  // Array de empresas de exemplo
  const companies = [
    {
      id: '1',
      name: 'Company 1',
      subtitle: 'Technology',
      avatarUrl: 'https://bit.ly/dan-abramov',
    },
    {
      id: '2',
      name: 'Company 2',
      subtitle: 'Finance',
      avatarUrl: 'https://bit.ly/tioluwani-kolawole',
    },
    {
      id: '3',
      name: 'Company 3',
      subtitle: 'Healthcare',
      avatarUrl: 'https://bit.ly/kent-c-dodds',
    },
  ]

  return (
    <Menu>
      {/* O botão que abre o menu */}
      <MenuButton
        as={Button}
        h={20}
        w='100%'
        borderRadius='md'
        border={'1px solid'}
        borderColor={theme.colors.background}
        _focus={{ borderColor: 'gray.800', boxShadow: '0 0 0 1px teal.400' }}
        padding={3} // Para que o padding seja semelhante ao do MenuItem
        textAlign='left' // Texto alinhado à esquerda
        rightIcon={<Icon icon='mdi:chevron-down' />} // Ícone de seta para baixo
      >
        {/* Conteúdo do botão com Avatar, título e subtítulo */}
        <Stack
          direction='row'
          spacing={5}
          align='center'
        >
          {selectedCompany.avatarUrl && (
            <Avatar
              size='md'
              src={selectedCompany.avatarUrl}
            />
          )}
          <Box>
            <Text fontWeight='bold'>{selectedCompany.name}</Text>
            <Text
              fontSize='sm'
              color='gray.500'
            >
              {selectedCompany.subtitle}
            </Text>
          </Box>
        </Stack>
      </MenuButton>

      {/* A lista de opções */}
      <MenuList>
        {companies.map((company) => (
          <MenuItem
            key={company.id}
            onClick={() => setSelectedCompany(company)} // Ao clicar, o nome da empresa é selecionado
            _hover={{ bg: 'gray.100' }} // Estilo ao passar o mouse
            _focus={{ bg: 'gray.200' }} // Estilo ao focar
          >
            {/* Exibindo avatar, título e subtítulo */}
            <Stack
              direction='row'
              spacing={3}
              align='center'
            >
              <Avatar
                size='sm'
                src={company.avatarUrl}
              />
              <Box>
                <Text fontWeight='bold'>{company.name}</Text>
                <Text
                  fontSize='sm'
                  color='gray.500'
                >
                  {company.subtitle}
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
