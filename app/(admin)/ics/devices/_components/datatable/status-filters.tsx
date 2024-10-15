'use client'

import { FilterOption } from '@/lib/db/types'
import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

export const StatusFilters = ({
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
    const updatedFilters = filters.filter((f) => f.column !== 'status')

    // Adiciona o novo filtro com column = 'type' e value = filter
    updatedFilters.push({ column: 'status', value: filter })

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
        Status
      </Text>

      <ButtonGroup isAttached>
        <Button
          variant='outline'
          fontSize={13}
          isActive={
            filters.length === 0 ||
            !filters.some((f) => f.column === 'status')
          }
          onClick={() => setFilters([])}
        >
          All
        </Button>
        <Button
          variant='outline'
          fontSize={13}
          isActive={filters.some(
            (f) => f.column === 'status' && f.value == 'ACTIVE'
          )}
          onClick={() => handleFilterClick('ACTIVE')}
        >
          Active
        </Button>
        <Button
          variant='outline'
          fontSize={13}
          isActive={filters.some(
            (f) => f.column === 'status' && f.value == 'INACTIVE'
          )}
          onClick={() => handleFilterClick('INACTIVE')}
        >
          Inactive
        </Button>
      </ButtonGroup>
    </Box>
  )
}
