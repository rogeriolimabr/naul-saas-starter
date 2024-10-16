'use client'

import React from 'react'
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
  { sector: 'Electric Sector', attacks: 10, icon: 'mdi:flash' },
  { sector: 'Retail', attacks: 20, icon: 'mdi:store' },
  { sector: 'Oil and Gas', attacks: 15, icon: 'mdi:oil' },
  { sector: 'E-commerce', attacks: 25, icon: 'mdi:shopping' },
  { sector: 'Technology', attacks: 30, icon: 'mdi:devices' },
  { sector: 'Healthcare', attacks: 18, icon: 'mdi:heart' },
  { sector: 'Education', attacks: 12, icon: 'mdi:school' },
  { sector: 'Transportation', attacks: 17, icon: 'mdi:car' },
  { sector: 'Telecommunications', attacks: 22, icon: 'mdi:cellphone' },
  { sector: 'Agriculture', attacks: 14, icon: 'mdi:tractor' },
  { sector: 'Industry', attacks: 27, icon: 'mdi:factory' },
  { sector: 'Security', attacks: 16, icon: 'mdi:shield' },
  { sector: 'Entertainment', attacks: 19, icon: 'mdi:movie' },
  { sector: 'Construction', attacks: 11, icon: 'mdi:hammer' },
  { sector: 'Food and Beverages', attacks: 13, icon: 'mdi:food' },
  { sector: 'Tourism', attacks: 23, icon: 'mdi:airplane' },
  { sector: 'E-commerce', attacks: 24, icon: 'mdi:cart' },
  { sector: 'Finance', attacks: 21, icon: 'mdi:bank' },
  { sector: 'Renewable Energy', attacks: 29, icon: 'mdi:solar-power' },
  { sector: 'Automotive', attacks: 26, icon: 'mdi:car-wash' },
  { sector: 'Environment', attacks: 15, icon: 'mdi:leaf' },
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
        width={20}
        height={20}
      >
        <div style={{ display: 'flex', alignItems: 'center', color: color }}>
          <Icon
            icon={data[index].icon}
            width={20}
            height={20}
          />
        </div>
      </foreignObject>
    </g>
  )
}

export const SectorAttacksChart = () => {
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
          <Text fontSize={14}>Reported Attacks by Sector</Text>
          <Text
            fontSize={11}
            color='muted'
          >
            last 30-days
          </Text>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer
            width='100%'
            height={350}
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
                    stopOpacity={0.2}
                  />
                  <stop
                    offset='50%'
                    stopColor={mainColor}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset='100%'
                    stopColor='#ed9b0f'
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>
              <XAxis
                stroke='none'
                type='number'
                style={{
                  color: 'muted',
                }}
              />
              <YAxis
                type='category'
                dataKey='sector'
                stroke='none'
                tickMargin={10}
                tick={(props) => (
                  <CustomYAxisTick
                    {...props}
                    color={secondaryColor}
                  />
                )}
                width={50}
              />{' '}
              <Tooltip
                formatter={(value) => [value, 'Total of Attacks']}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 10,
                  backgroundColor: mainColor,
                  borderColor: mainColor,
                }}
                cursor={{ fill: 'var(--naul-colors-chakra-body-bg)' }}
              />
              <Bar
                dataKey='attacks'
                fill='url(#colorGradient)'
                background={{ fill: 'transparent' }}
                radius={6}
                barSize={6}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </Stack>
  )
}
