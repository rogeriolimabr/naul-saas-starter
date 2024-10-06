'use client'

import { FilterOption } from '@/lib/db/types'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
  Box,
  Text,
  Badge,
  Flex,
} from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import { Dispatch, SetStateAction } from 'react'

export const DropdownFilters = ({
  filters,
  setFilters,
  resetPagination,
}: {
  filters: FilterOption[]
  setFilters: Dispatch<SetStateAction<FilterOption[]>>
  resetPagination: () => void // Tipo da função
}) => {
  const handleFilterClick = (
    column: 'priority' | 'frequency' | 'status',
    value: string
  ) => {
    // Verifica se o filtro já existe
    const filterExists = filters.some(
      (f) => f.column === column && f.value === value
    )

    let updatedFilters

    if (filterExists) {
      // Remove o filtro se ele já existir
      updatedFilters = filters.filter(
        (f) => !(f.column === column && f.value === value)
      )
    } else {
      // Remove qualquer filtro com a coluna correspondente e adiciona o novo filtro
      updatedFilters = filters.filter((f) => f.column !== column)
      updatedFilters.push({ column, value })
    }

    // Atualiza os filtros
    setFilters(updatedFilters)
    resetPagination()
  }

  const isFilterActive = (column: string, value: string) => {
    return filters.some((f) => f.column === column && f.value === value)
  }

  return (
    <Menu>
      <Flex position='relative'>
        <MenuButton
          as={IconButton}
          variant='outline'
          aria-label='Select Filters'
          icon={
            <Icon
              icon='lets-icons:filter'
              width={20}
              height={20}
            />
          }
        />
        {filters.length > 0 && (
          <Badge
            colorScheme='gray'
            borderRadius='full'
            position='absolute'
            top={-2}
            left={-2}
            px={2} // padding para ajustar o tamanho
            py={1}
            fontSize='0.8rem' // tamanho da fonte
          >
            {filters.length}
          </Badge>
        )}
      </Flex>
      <MenuList backgroundColor='borderSecondary'>
        {/* Cabeçalho de Priority */}
        <Box
          px={4}
          py={4}
          bg='borderSecondary'
        >
          <Text
            fontSize='sm'
            fontWeight='bold'
          >
            Status
          </Text>
        </Box>

        {/* Filtros de Priority */}
        <MenuItem
          onClick={() => handleFilterClick('status', 'ACTIVE')}
          color='green'
          bgColor='borderSecondary'
        >
          {isFilterActive('status', 'ACTIVE') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          Active
        </MenuItem>
        <MenuItem
          onClick={() => handleFilterClick('status', 'PENDING')}
          color='blue.300'
          bgColor='borderSecondary'
        >
          {isFilterActive('status', 'PENDING') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          Waiting Approval
        </MenuItem>
        <MenuItem
          onClick={() => handleFilterClick('status', 'INACTIVE')}
          color='red'
          bgColor='borderSecondary'
        >
          {isFilterActive('status', 'INACTIVE') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          Inactive
        </MenuItem>
        {/* Cabeçalho de Priority */}
        <Box
          px={4}
          py={4}
          bg='borderSecondary'
          mt={2}

        >
          <Text
            fontSize='sm'
            fontWeight='bold'
          >
            Priority
          </Text>
        </Box>

        {/* Filtros de Priority */}
        <MenuItem
          onClick={() => handleFilterClick('priority', 'CRITICAL')}
          color='red'
          bgColor='borderSecondary'
        >
          {isFilterActive('priority', 'CRITICAL') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          Critical
        </MenuItem>
        <MenuItem
          onClick={() => handleFilterClick('priority', 'HIGH')}
          color='orangered'
          bgColor='borderSecondary'
        >
          {isFilterActive('priority', 'HIGH') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          High
        </MenuItem>
        <MenuItem
          onClick={() => handleFilterClick('priority', 'MEDIUM')}
          color='yellow.500'
          bgColor='borderSecondary'
        >
          {isFilterActive('priority', 'MEDIUM') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          Medium
        </MenuItem>
        <MenuItem
          onClick={() => handleFilterClick('priority', 'LOW')}
          color='success'
          bgColor='borderSecondary'
        >
          {isFilterActive('priority', 'LOW') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          Low
        </MenuItem>

        {/* Cabeçalho de Frequency */}
        <Box
          px={4}
          py={4}
          bg='borderSecondary'
          mt={2}
        >
          <Text
            fontSize='sm'
            fontWeight='bold'
          >
            Frequency
          </Text>
        </Box>

        {/* Filtros de Frequency */}
        <MenuItem
          onClick={() => handleFilterClick('frequency', 'DAILY')}
          bgColor='borderSecondary'
        >
          {isFilterActive('frequency', 'DAILY') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          Daily
        </MenuItem>
        <MenuItem
          onClick={() => handleFilterClick('frequency', 'WEEKLY')}
          bgColor='borderSecondary'
        >
          {isFilterActive('frequency', 'WEEKLY') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          Weekly
        </MenuItem>
        <MenuItem
          onClick={() => handleFilterClick('frequency', 'MONTHLY')}
          bgColor='borderSecondary'
        >
          {isFilterActive('frequency', 'MONTHLY') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          Monthly
        </MenuItem>
        <MenuItem
          onClick={() => handleFilterClick('frequency', 'YEARLY')}
          bgColor='borderSecondary'
        >
          {isFilterActive('frequency', 'YEARLY') ? (
            <Icon
              icon='akar-icons:check-box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <Icon
              icon='akar-icons:box'
              width={20}
              height={20}
              style={{ marginRight: '8px' }}
            />
          )}
          Yearly
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
