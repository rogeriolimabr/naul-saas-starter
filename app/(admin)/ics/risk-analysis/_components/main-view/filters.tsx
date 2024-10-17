import {
    HStack,
    useDisclosure,
  } from '@chakra-ui/react'
  import { ICSAdvisory } from '@/lib/services/ics/types'
  import { useState } from 'react'
  import FilterMenu from './filter-menu' // Importando o novo componente
  
  interface FilterBarProps {
    data: ICSAdvisory[]
    setFilteredItems: (items: ICSAdvisory[]) => void
  }
  
  export const FilterBar = ({ data, setFilteredItems }: FilterBarProps) => {
    // Estados para as seleções
    const [selectedVendors, setSelectedVendors] = useState<string[]>([])
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])
    const [selectedSectors, setSelectedSectors] = useState<string[]>([])
    const [selectedHeadquarters, setSelectedHeadquarters] = useState<string[]>([]) // Novo estado para headquarters
  
    // Estados para as buscas
    const [vendorSearch, setVendorSearch] = useState<string>('')
    const [productSearch, setProductSearch] = useState<string>('')
    const [sectorSearch, setSectorSearch] = useState<string>('')
    const [headquartersSearch, setHeadquartersSearch] = useState<string>('') // Busca para headquarters
  
    // Controle dos menus
    const {
      isOpen: isVendorOpen,
      onOpen: onVendorOpen,
      onClose: onVendorClose,
    } = useDisclosure()
    const {
      isOpen: isProductOpen,
      onOpen: onProductOpen,
      onClose: onProductClose,
    } = useDisclosure()
    const {
      isOpen: isSectorOpen,
      onOpen: onSectorOpen,
      onClose: onSectorClose,
    } = useDisclosure()
    const {
      isOpen: isHeadquartersOpen,
      onOpen: onHeadquartersOpen,
      onClose: onHeadquartersClose,
    } = useDisclosure() // Controle para headquarters
  
    // Lista única de Vendors, Products, Sectors e Headquarters
    const vendors = Array.from(new Set(data.map((item) => item.vendor)))
    const products = Array.from(new Set(data.map((item) => item.product)))
    const sectors = Array.from(
      new Set(
        data.flatMap((item) =>
          item.criticalInfrastructureSector.flatMap(sector => sector.split(';').map(s => s.trim()))
        )
      )
    )
    const headquarters = Array.from(new Set(data.map((item) => item.companyHeadquarters))) // Lista de company headquarters
  
    // Função para aplicar filtros e atualizar o estado de itens filtrados
    const applyFilters = () => {
      let filteredData = data
  
      if (selectedVendors.length > 0) {
        filteredData = filteredData.filter(
          (item) => selectedVendors.includes(item.vendor)
        )
      }
      if (selectedProducts.length > 0) {
        filteredData = filteredData.filter(
          (item) => selectedProducts.includes(item.product)
        )
      }
      if (selectedSectors.length > 0) {
        filteredData = filteredData.filter(
          (item) => selectedSectors.some(sector => item.criticalInfrastructureSector.includes(sector))
        )
      }
      if (selectedHeadquarters.length > 0) {
        filteredData = filteredData.filter(
          (item) => selectedHeadquarters.includes(item.companyHeadquarters)
        )
      }
  
      setFilteredItems(filteredData)
    }
  
    return (
      <HStack spacing={4} mb={6} justifyContent='end'>
        <FilterMenu
          isOpen={isVendorOpen}
          onClose={onVendorClose}
          onOpen={onVendorOpen}
          title="Vendors"
          searchValue={vendorSearch}
          setSearchValue={setVendorSearch}
          items={vendors}
          selectedItems={selectedVendors}
          setSelectedItems={setSelectedVendors}
          applyFilters={applyFilters}
        />
        
        <FilterMenu
          isOpen={isProductOpen}
          onClose={onProductClose}
          onOpen={onProductOpen}
          title="Products"
          searchValue={productSearch}
          setSearchValue={setProductSearch}
          items={products}
          selectedItems={selectedProducts}
          setSelectedItems={setSelectedProducts}
          applyFilters={applyFilters}
        />
        
        <FilterMenu
          isOpen={isSectorOpen}
          onClose={onSectorClose}
          onOpen={onSectorOpen}
          title="Sectors"
          searchValue={sectorSearch}
          setSearchValue={setSectorSearch}
          items={sectors}
          selectedItems={selectedSectors}
          setSelectedItems={setSelectedSectors}
          applyFilters={applyFilters}
        />
  
        <FilterMenu
          isOpen={isHeadquartersOpen}
          onClose={onHeadquartersClose}
          onOpen={onHeadquartersOpen}
          title="Countries"
          searchValue={headquartersSearch}
          setSearchValue={setHeadquartersSearch}
          items={headquarters}
          selectedItems={selectedHeadquarters}
          setSelectedItems={setSelectedHeadquarters}
          applyFilters={applyFilters}
        />
      </HStack>
    )
  }
  