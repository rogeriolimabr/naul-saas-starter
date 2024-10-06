'use client'

import { Text, Stack, Grid, GridItem } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import { CardStatItem } from './card-stat'
import { TakedownResolutionRate } from './takedown-resolution-rate'
import { RecentActivities } from './recent-activities'
import BrandProtection from '@/components/ui/icons/BrandProtection'
import { Recommendations } from './recommendations'

export interface CardStatsProps {
  title: string
  value: string
  indicator: 'bad' | 'good' | 'none'
  percent: number
  label: string
  series: {
    name: string
    color: string
    data: number[]
  }[]
}

const generateSeriesData = (
  numDays: number,
  finalValue: number,
  percentChange: number
): number[] => {
  const values: number[] = []

  // Calcula o valor inicial com base no valor final e na porcentagem
  const initialValue = finalValue / (1 + percentChange / 100)

  // Calcula a diferença total permitida
  const totalDifference = finalValue - initialValue

  // Gera os valores
  for (let i = 0; i < numDays; i++) {
    // Gera uma base aleatória que varia a partir do valor inicial
    const baseValue = initialValue + Math.random() * totalDifference

    // Aplica um fator de variação aleatória para tornar os valores menos lineares
    const randomVariation = (Math.random() - 0.5) * (totalDifference * 0.2) // Ajuste o fator para controlar a aleatoriedade
    const randomValue = Number((baseValue + randomVariation).toFixed(2))

    // Garante que o valor final não ultrapasse os limites
    if (randomValue < Math.min(initialValue, finalValue)) {
      values.push(Math.min(initialValue, finalValue))
    } else if (randomValue > Math.max(initialValue, finalValue)) {
      values.push(Math.max(initialValue, finalValue))
    } else {
      values.push(randomValue)
    }
  }

  return values // Retorna apenas os valores gerados
}

const cards: CardStatsProps[] = [
  {
    title: 'Total Incidents',
    value: '534',
    indicator: 'bad',
    percent: 8,
    label: 'Since forever',
    series: [
      {
        name: 'series-1',
        color: '#ed9b0f',
        data: generateSeriesData(15, 534, 8),
      },
    ],
  },
  {
    title: 'Incidents Pending',
    value: '25',
    indicator: 'bad',
    percent: 14,
    label: 'Last 15 days',
    series: [
      {
        name: 'series-1',
        color: '#ed9b0f',
        data: generateSeriesData(15, 29, 14),
      },
    ],
  },
  {
    title: 'Incidents Resolved',
    value: '23',
    indicator: 'good',
    percent: 3,
    label: 'Last 15 days',
    series: [
      {
        name: 'series-1',
        color: '#ed9b0f',
        data: generateSeriesData(15, 23, 3),
      },
    ],
  }
]

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
          <BrandProtection
            width={30}
            height={30}
          />
          <Text
            as='h3'
            fontSize={16}
            fontFamily='title'
            color='headingText'
          >
            Brand Protection
          </Text>
        </Stack>
      </GridItem>

      <GridItem colSpan={4}>
        <Stack
          rounded={10}
          border='1px solid'
          borderColor='borderPrimary'
          p={6}
          direction='row'
          justifyContent='start'
          alignItems='center'
          color='menuLabel'
          gap={6}
        >
          <Text color='interactive'>
            <Icon
              icon='ion:information-circle-outline'
              width={32}
              height={32}
            />
          </Text>
          <Text fontSize={13}>
            The Brand Protection module is designed to safeguard businesses from
            various threats that could compromise their reputation and financial
            security. It focuses on preventing credential leaks, credit card
            fraud, and unauthorized brand mentions across social media, while
            also monitoring CNPJ registrations and managing takedown requests.
            This comprehensive approach helps organizations maintain control
            over their online presence and proactively address potential risks
            to their brand integrity.
          </Text>
        </Stack>
      </GridItem>
      {cards.map((card, index) => (
        <GridItem>
          <CardStatItem
            key={index}
            {...card}
          />
        </GridItem>
      ))}
      <GridItem>
        <TakedownResolutionRate value={92} />
      </GridItem>
      <GridItem colSpan={4}>
        <RecentActivities />
      </GridItem>
      <GridItem colSpan={4}>
        <Recommendations />
      </GridItem>
    </Grid>
  )
}
