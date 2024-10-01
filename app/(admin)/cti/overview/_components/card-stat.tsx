'use client'

import {
  Card,
  CardBody,
  CardHeader,
  GridItem,
  Text,
  Flex,
  useColorMode,
} from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { CardStatsProps } from './data-provider'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const getLast30Days = (): string[] => {
  const today = new Date()
  const days = []

  for (let i = 0; i < 30; i++) {
    const date = new Date()
    date.setDate(today.getDate() - i)
    const day = String(date.getDate()).padStart(2, '0') // Formata o dia como DD
    days.push(day)
  }

  return days.reverse() // Inverte para que os dias fiquem do mais antigo até o mais recente
}

export const CardStatItem = ({
  title,
  value,
  indicator,
  percent,
  label,
  series,
}: CardStatsProps) => {
  const { colorMode } = useColorMode() // Obtém o modo de cor atual

  // Define as cores do tooltip com base no modo de cor
  const tooltipStyles = {
    backgroundColor: colorMode === 'light' ? 'white' : 'gray.800',
    color: colorMode === 'light' ? 'black' : 'white',
  }

  const ChartOptions: ApexOptions = {
    chart: {
      id: 'basic-bar',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: 'text',
      fontFamily: 'Inter, sans-serif',
      sparkline: { enabled: true },
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      enabled: true,
      theme: colorMode === 'light' ? 'light' : 'dark', // Define o tema do tooltip
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.9,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.9,
        opacityTo: 0.8,
        stops: [0, 50, 100],
        colorStops: [],
      },
    },
    xaxis: {
      categories: getLast30Days(),
    },
    legend: {
      show: false, // Legenda desabilitada
    },
    grid: {
      show: false, // Oculta todas as linhas de grade (grid lines)
    },
    yaxis: {
      axisBorder: {
        show: false, // Oculta a borda do eixo Y
      },
      axisTicks: {
        show: false, // Oculta os ticks do eixo Y
      },
    },
  }

  const percentIcon =
    percent > 0 ? 'ic:round-arrow-upward' : 'ic:round-arrow-downward'
  const indicatorColor =
    indicator === 'good' ? 'success' : indicator === 'bad' ? 'error' : 'text'

  return (
      <Card
        overflow='hidden'
        variant='outline'
        rounded={20}
        cursor='pointer'
        transition='all 0.4s'
        _hover={{
          transform: 'scale(1.09)',
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
          <Text fontSize={14}>{title}</Text>
          <Flex
            color={indicatorColor}
            alignItems='center'
          >
            <Icon icon={percentIcon} />
            {percent}%
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex
            direction='row'
            w='100%'
          >
            <Chart
              options={ChartOptions}
              series={series}
              type='line'
              height='100'
              width='100%'
            />
            <Flex
              direction='column'
              w='100%'
              justifyContent='center'
              alignItems='center'
            >
              <Text
                as='h5'
                color='text'
                fontSize={30}
                fontFamily='number'
                mb={2}
              >
                {value}
              </Text>
              <Text
                as='p'
                fontSize={13}
                fontFamily='label'
                color='menuLabel'
              >
                {label}
              </Text>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
  )
}
