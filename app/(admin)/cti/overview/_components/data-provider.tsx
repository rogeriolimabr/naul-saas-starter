'use client'

import { Box, Text, Stack, Grid, GridItem } from '@chakra-ui/react'
import CyberThreatIntelligence from '@/components/ui/icons/CyberThreatIntelligence'
import { Icon } from '@iconify-icon/react'
import { CardStatItem } from './card-stat'
import { GeopoliticalRiskLevel } from './geopolitical-risk-level'
import { LastDarkWebNews } from './last-darkweb-news'
import { SectorAttacksChart } from './sector-attacks'

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
    title: 'Active Threats',
    value: '245',
    indicator: 'bad',
    percent: 12,
    label: 'Last 15 days',
    series: [
      {
        name: 'series-1',
        color: '#ed9b0f',
        data: generateSeriesData(15, 245, 12),
      },
    ],
  },
  {
    title: 'Monitored IOCs/IOAs',
    value: '340',
    indicator: 'bad',
    percent: -8,
    label: 'Last 15 days',
    series: [
      {
        name: 'series-1',
        color: '#ed9b0f',
        data: generateSeriesData(15, 340, -8),
      },
    ],
  },
  {
    title: 'Active Vulnerabilities and Exploits',
    value: '356',
    indicator: 'good',
    percent: -4,
    label: 'Last 15 days',
    series: [
      {
        name: 'series-1',
        color: '#ed9b0f',
        data: generateSeriesData(15, 159, -4),
      },
    ],
  },
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
          <CyberThreatIntelligence
            width={30}
            height={30}
          />
          <Text
            as='h3'
            fontSize={16}
            fontFamily='title'
            color='headingText'
          >
            Cyber Threat Intelligence
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
            The Cyber ​​Threat Intelligence (CTI) module provides a
            comprehensive view of emerging cyber threats, enabling your
            organization to take a proactive stance against attacks. <br />
            This central dashboard brings together key threat intelligence
            capabilities and provides detailed, contextualized analysis for
            quick, effective decision-making.
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
        <GeopoliticalRiskLevel value={84} />
      </GridItem>
      <GridItem colSpan={3}>
        <LastDarkWebNews />
      </GridItem>
      <GridItem>
        <SectorAttacksChart />
      </GridItem>
    </Grid>
  )
}
