import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'

interface FilterMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  title: string
  searchValue: string
  setSearchValue: (value: string) => void
  items: string[]
  selectedItems: string[]
  setSelectedItems: (items: string[]) => void
  applyFilters: () => void
}

const FilterMenu = ({
  isOpen,
  onClose,
  onOpen,
  title,
  searchValue,
  setSearchValue,
  items,
  selectedItems,
  setSelectedItems,
  applyFilters,
}: FilterMenuProps) => {
  const handleItemClick = (item: string) => {
    const updatedSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selected) => selected !== item) // Remove se já estiver selecionado
      : [...selectedItems, item] // Adiciona se não estiver selecionado
    setSelectedItems(updatedSelectedItems)
    setSearchValue('') // Limpa a busca ao selecionar
    applyFilters()
  }

  return (
    <Menu
      isOpen={isOpen}
      onClose={onClose}
    >
      <MenuButton
        as={Button}
        width='150px'
        fontSize='13px'
        onClick={onOpen}
        rightIcon={
          <Icon
            icon='ic:round-arrow-drop-down'
            width={24}
            height={24}
          />
        }
      >
        {title}
      </MenuButton>
      <MenuList
        maxHeight='300px'
        width='150px'
        overflowY='auto'
      >
        <Box p={2}>
          <Input
            placeholder={`Search ${title}`}
            value={searchValue}
            fontFamily='menu'
            fontSize='14px'
            onChange={(e) => setSearchValue(e.target.value)}
            mb={2}
          />
          {items
            .filter((item) =>
              item.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <MenuItem
                key={item}
                fontSize='sm'
                height={10}
                textOverflow='ellipsis'
                onClick={() => handleItemClick(item)}
                bg={
                  selectedItems.includes(item) ? 'borderPrimary' : 'background'
                }
                _hover={{
                  bg: 'borderPrimary',
                }}
              >
                {item}
              </MenuItem>
            ))}
        </Box>
      </MenuList>
    </Menu>
  )
}

export default FilterMenu
