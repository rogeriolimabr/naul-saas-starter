'use client'

import {
  Card,
  CardBody,
  CardHeader,
  useColorMode,
  Text,
} from '@chakra-ui/react'
import type { ApexOptions } from 'apexcharts'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const TakedownResolutionRate = (props: { value: number }) => {
  const { value } = props
  const { colorMode } = useColorMode()

  const options: ApexOptions = {
    chart: {
      redrawOnParentResize: false,
    },
    colors: ['#ed9b0f'],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        offsetX: -65,
        offsetY: -25,
        track: {
          background: 'transparent',
          startAngle: -90,
          endAngle: 90,
          margin: 0,
        },

        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontFamily: 'var(--naul-fonts-label)',
            offsetY: -2,
            fontWeight: 'bold',
            fontSize: '12px',
            color: colorMode == 'dark' ? 'white' : 'black',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal', // Pode ser linear, radial, ou horizontal
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 30, 100], // Define os pontos onde as cores são aplicadas
        colorStops: [
          {
            offset: 0, // Início no verde (0%)
            color: '#23A978', // Verde
            opacity: 1,
          },
          {
            offset: 30, // Meio no laranja (50%)
            color: '#ed9b0f', // Laranja
            opacity: 1,
          },
          {
            offset: 100, // Fim no vermelho (100%)
            color: '#D45453', // Vermelho
            opacity: 1,
          },
        ],
      },
    },
    stroke: {
      width: 1,
      dashArray: 2,
      lineCap: 'butt',
    },
  }

  return (
    <Card
      overflow='hidden'
      variant='outline'
      rounded={20}
      cursor='pointer'
      transition='all 0.4s'
      padding={0}
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
        <Text fontSize={14}>Takedown Resolution Rate</Text>
      </CardHeader>
      <CardBody maxH='140px'>
        <Chart
          options={options}
          series={[value]}
          type='radialBar'
          height='100%'
          width='100%'
        />
      </CardBody>
    </Card>
  )
}
