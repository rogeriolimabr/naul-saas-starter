'use client'

import { Text, Stack, Grid, GridItem } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import { HunterDevices } from './hunter-devices'

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
          <Text
            as='h3'
            fontSize={16}
            fontFamily='title'
            color='headingText'
          >
            Hunter Devices
          </Text>
        </Stack>
      </GridItem>

      <GridItem colSpan={4}>
        <Stack
          rounded={10}
          border='1px solid'
          borderColor='borderSecondary'
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
            This module is designed to bolster security in Industrial Control
            Systems (ICS) by maintaining a comprehensive database of devices and
            associated security dorks. It enables users to perform thorough
            vulnerability assessments, allowing for the proactive identification
            and remediation of potential threats. The module's features include
            automated scanning, reporting of security weaknesses, and
            integration with existing security tools. By leveraging stored
            device information and security dorks, it enhances the overall
            security posture of ICS infrastructures, ensuring better protection
            against cyber threats.
          </Text>
        </Stack>
      </GridItem>
      <GridItem colSpan={4}>
        <HunterDevices />
      </GridItem>
    </Grid>
  )
}
