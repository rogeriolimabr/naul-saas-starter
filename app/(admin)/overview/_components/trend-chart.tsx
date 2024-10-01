'use client'

import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react'

import dayjs from 'dayjs'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from 'recharts'

// Defina os principais tipos de ataques
const attackTypes = ['phishing', 'ddos', 'malware', 'ransomware']

// Função para gerar dados dinamicamente com base nos tipos de ataques
const generateLast7DaysData = () => {
  const data = []
  for (let i = 6; i >= 0; i--) {
    const date = dayjs().subtract(i, 'day').format('DD/MM')

    // Aqui, tipamos explicitamente o objeto 'acc' como { [key: string]: number }
    const attackData = attackTypes.reduce(
      (acc: { [key: string]: number }, attack: string) => {
        acc[attack] = Math.floor(Math.random() * 30) // Gera números aleatórios para cada ataque
        return acc
      },
      {}
    )

    data.push({
      date,
      ...attackData, // Inclui os dados gerados para cada tipo de ataque
    })
  }
  return data
}

const TrendChart = () => {
  const data = generateLast7DaysData() // Gera dados para o gráfico

  const { colorMode } = useColorMode()

  const isDark = colorMode === 'dark'

  return (
    <Stack
      w='100%'
      mx={4}
    >
      <Card
        overflow='hidden'
        variant='outline'
        rounded={20}
        cursor='pointer'
        transition='all 0.4s'
        w='100%'
        h='100%'
        _hover={{
          boxShadow: 'lg',
        }}
      >
        <CardHeader
          bg='backgroundSecondary'
          py={4}
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
        >
          <Text fontSize={14}>Incidents Trend Chart (Weekly)</Text>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer
            width='100%'
            height={400}
          >
            <LineChart data={data}>
              <XAxis
                dataKey='date'
                hide
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1A202C' : '#FFFFFF',
                  color: isDark ? '#FFFFFF' : '#000000',
                  borderRadius: 10,
                  borderColor: isDark ? '#2D3748' : '#E2E8F0',
                }}
                wrapperStyle={{
                  borderRadius: 10,
                }}
              />
              <Legend />
              <defs>
                <linearGradient
                  id='paint0_linear'
                  x1='0'
                  y1='0'
                  x2='1'
                  y2='0'
                >
                  <stop stopColor='#6B8DE3' />
                  <stop
                    offset='1'
                    stopColor='#7D1C8D'
                  />
                </linearGradient>
              </defs>

              <Line
                strokeWidth={5}
                strokeOpacity={0.6}
                type='monotone'
                dataKey='incidents'
                stroke='#ed9b0f'
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </Stack>
  )
}

export default TrendChart
