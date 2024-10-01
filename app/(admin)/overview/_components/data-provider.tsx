'use client'

import { Box, Text, Stack, Grid, GridItem } from '@chakra-ui/react'
import { CardStats } from './card-stat'
import DashboardIcon from '@/components/ui/icons/DashboardIcon'
import IncidentBarChart from './incidents-bar-chart'
import MapChart from './geo-chart'

export const DataProvider = () => {
  return (
    <Grid
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(4, 1fr)'
      gap={4}
      mx={6}
    >
      <GridItem colSpan={4}>
        <Stack
          direction='row'
          my={4}
          justifyContent='start'
          alignItems='center'
        >
          <DashboardIcon
            width={40}
            height={40}
          />
          <Text
            as='h3'
            fontSize={16}
            fontFamily='title'
            color='headingText'
          >
            Overview
          </Text>
        </Stack>
      </GridItem>

      <GridItem colSpan={4}>
        <CardStats />
      </GridItem>
      <GridItem colSpan={3}>
        <MapChart />
      </GridItem>
      <GridItem colSpan={1}>
        <IncidentBarChart />
      </GridItem>
    </Grid>
  )
}
