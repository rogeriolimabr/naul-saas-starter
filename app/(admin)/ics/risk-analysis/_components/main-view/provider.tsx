'use client'

import { ICSAdvisory } from '@/lib/services/ics/types'
import { Grid, GridItem, Text } from '@chakra-ui/react'
import { CardStatItem } from '../commons/card-stat'
import { useState } from 'react'
import { FilterBar } from './filters'
import MapChart from './geo-chart'
import { TableProvider } from './table-provider'

export const MainView = ({ data }: { data: ICSAdvisory[] | undefined }) => {
  const [filteredItems, setFilteredItems] = useState<ICSAdvisory[]>(data ?? [])

  return (
    <Grid
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(4, 1fr)'
      gap={4}
      mx={6}
    >
      <GridItem colSpan={4}>
        <FilterBar
          data={data ?? []}
          setFilteredItems={setFilteredItems}
        />
      </GridItem>
      <GridItem>
        <CardStatItem
          title='CISA ICS Advisories'
          value={filteredItems.length}
          label='total'
        />
      </GridItem>
      <GridItem>
        <CardStatItem
          title='Vendors'
          value={new Set(filteredItems.map((item) => item.vendor)).size} // Contar valores únicos
          label='total'
        />
      </GridItem>
      <GridItem>
        <CardStatItem
          title='Products'
          value={new Set(filteredItems.map((item) => item.product)).size} // Contar valores únicos
          label='total'
        />
      </GridItem>
      <GridItem>
        <CardStatItem
          title='Countries'
          value={
            new Set(filteredItems.map((item) => item.companyHeadquarters)).size
          } // Contar valores únicos
          label='total'
        />
      </GridItem>
      <GridItem colSpan={4}>
        <MapChart data={filteredItems} />
      </GridItem>
      <GridItem colSpan={4} my={6}>
        <TableProvider data={filteredItems} />
      </GridItem>
    </Grid>
  )
}
