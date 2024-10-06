'use client'

import { FilterOption } from '@/lib/db/types'
import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

export const CategoryFilters = ({
  filters,
  setFilters,
  resetPagination,
}: {
  filters: FilterOption[]
  setFilters: Dispatch<SetStateAction<FilterOption[]>>
  resetPagination: () => void; // Tipo da função
}) => {
  const handleFilterClick = (filter: string) => {
    // Remove qualquer filtro com column = 'type'
    const updatedFilters = filters.filter((f) => f.column !== 'category')

    // Adiciona o novo filtro com column = 'type' e value = filter
    updatedFilters.push({ column: 'category', value: filter })

    // Atualiza os filtros
    setFilters(updatedFilters)
    resetPagination()
  }

  return (
    <Box
      position='relative'
      p={4}
      borderWidth='1px'
      borderRadius='md'
      borderColor='borderSecondary'
    >
      <Text
        as='label'
        position='absolute'
        top='-10px' // Posiciona a label acima da borda
        left='10px' // Ajusta a posição horizontal da label
        bg='--var(--card-bg)' // Cor de fundo da label
        px={2} // Padding lateral da label
        fontSize='sm'
        color='gray.500' // Cor do texto da label
      >
        Category
      </Text>

      <ButtonGroup isAttached>
        <Button
          variant='outline'
          fontSize={13}
          isActive={
            filters.length === 0 ||
            !filters.some((f) => f.column === 'category')
          }
          onClick={() => setFilters([])}
        >
          All
        </Button>
        <Button
          variant='outline'
          fontSize={13}
          isActive={filters.some(
            (f) => f.column === 'category' && f.value == 'SURFACEWEB'
          )}
          onClick={() => handleFilterClick('SURFACEWEB')}
        >
          Surface Web
        </Button>
        <Button
          variant='outline'
          fontSize={13}
          isActive={filters.some(
            (f) => f.column === 'category' && f.value == 'DEEPWEB'
          )}
          onClick={() => handleFilterClick('DEEPWEB')}
        >
          Deep Web
        </Button>
        <Button
          variant='outline'
          fontSize={13}
          isActive={filters.some(
            (f) => f.column === 'category' && f.value == 'SOCIALMEDIA'
          )}
          onClick={() => handleFilterClick('SOCIALMEDIA')}
        >
          Social Media
        </Button>
        <Button
          variant='outline'
          fontSize={13}
          isActive={filters.some(
            (f) => f.column === 'category' && f.value == 'IP'
          )}
          onClick={() => handleFilterClick('IP')}
        >
          IP Address
        </Button>
        <Button
          variant='outline'
          fontSize={13}
          isActive={filters.some(
            (f) => f.column === 'category' && f.value == 'KEYWORDS'
          )}
          onClick={() => handleFilterClick('KEYWORDS')}
        >
          Data Leaks
        </Button>
      </ButtonGroup>
    </Box>
  )
}
