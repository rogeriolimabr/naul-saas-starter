'use client'

import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Icon } from '@iconify-icon/react'
import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react'

const data = [
  { name: 'Data Leak', icon: 'tabler:database-leak', incidents: 8 },
  { name: 'Ransomware', icon: 'simple-icons:keycdn', incidents: 12 },
  { name: 'Malware', icon: 'mdi:bug', incidents: 5 },
  { name: 'Phishing', icon: 'mdi:fish', incidents: 7 },
  { name: 'DDoS Attack', icon: 'mdi:server-security', incidents: 3 },
  { name: 'SQL Injection', icon: 'mdi:database-search', incidents: 6 },
  { name: 'Brute Force Attack', icon: 'mdi:lock-alert', incidents: 9 },
  { name: 'Man-in-the-Middle', icon: 'mdi:account-multiple', incidents: 4 },
  { name: 'Zero-Day Exploit', icon: 'mdi:skull', incidents: 2 },
  { name: 'Insider Threat', icon: 'mdi:briefcase-account', incidents: 5 },
  { name: 'Credential Stuffing', icon: 'mdi:key', incidents: 4 },
  { name: 'Spyware', icon: 'mdi:magnify', incidents: 6 },
]

// Tipagem para as props do CustomYAxisTick
interface CustomYAxisTickProps {
  x: number
  y: number
  index: number
  color: string
}

// Componente customizado para o YAxis, que renderiza os ícones e nomes
const CustomYAxisTick = ({ x, y, index, color }: CustomYAxisTickProps) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject
        x={-30}
        y={-12}
        width={24}
        height={24}
      >
        <div style={{ display: 'flex', alignItems: 'center', color: color }}>
          <Icon
            icon={data[index].icon}
            width={24}
            height={24}
          />
        </div>
      </foreignObject>
    </g>
  )
}

const IncidentBarChart = () => {
  const { colorMode } = useColorMode()

  const mainColor = colorMode === 'dark' ? 'black' : '#F9F9FB'
  const secondaryColor = colorMode === 'dark' ? '#8B8D98' : '#0c1017'

  return (
    <Stack w='100%'>
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
          alignItems='center'
          justifyContent='space-between'
        >
          <Text fontSize={14}>Incidents by Category</Text>
          <Text
            fontSize={11}
            color='muted'
          >
            last 7-days
          </Text>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer
            width='100%'
            height={450}
          >
            <BarChart
              layout='vertical' // Altere para "vertical"
              data={data}
              margin={{
                top: 20,
                right: 30,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id='colorGradient'
                  x1='0'
                  y1='1'
                  x2='1'
                  y2='1'
                >
                  <stop
                    offset='0%'
                    stopColor={mainColor}
                    stopOpacity={1}
                  />
                  <stop
                    offset='50%'
                    stopColor='#ed9b0f'
                    stopOpacity={1}
                  />
                  <stop
                    offset='100%'
                    stopColor='#ed9b0f'
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>
              <XAxis type='number' />
              <YAxis
                type='category'
                dataKey='name'
                tick={(props) => (
                  <CustomYAxisTick
                    {...props}
                    color={secondaryColor}
                  />
                )}
                width={60}
              />{' '}
              <Tooltip
                formatter={(value, name) => [`${value} incidents`, name]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 10,
                  backgroundColor: mainColor,
                  borderColor: mainColor,
                }}
                cursor={{ fill: 'var(--naul-colors-chakra-body-bg)' }}
              />
              <Bar
                dataKey='incidents'
                fill='url(#colorGradient)'
                background={{ fill: 'transparent' }}
                radius={6}
                barSize={20}
              />{' '}
              {/* Aplicação do gradiente */}
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </Stack>
  )
}

export default IncidentBarChart
