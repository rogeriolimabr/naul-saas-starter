import { useLayout } from '@/lib/hooks/useLayout'
import { Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { ICSAdvisory } from '@/lib/services/ics/types' // Supondo que os dados venham desse tipo

export const options = {
  colorAxis: { colors: ['#f9d58f', '#ed9b0f', '#D45453'] },
  backgroundColor: 'transparent',
  datalessRegionColor: '#E8E8EC',
  defaultColor: '#f9d58f',
}

interface MapChartProps {
  data: ICSAdvisory[] // Definindo o tipo dos dados que vêm como props
}

const MapChart = ({ data }: MapChartProps) => {
  const { isSidebarOpen } = useLayout()
  const [chartData, setChartData] = useState<(string | number)[][]>([])

  useEffect(() => {
    // Mapeando os dados de companyHeadquarters
    const countryCountMap = data.reduce((acc, item) => {
      const country = item.companyHeadquarters
      if (country) {
        acc[country] = (acc[country] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    const formattedData: (string | number)[][] = [
      ['Country', ''], // Cabeçalho: string e número
      ...Object.entries(countryCountMap).map(([country, count]) => [country, count] as [string, number]),
    ]

    setChartData(formattedData)
    console.log(formattedData)
  }, [data])

  const renderMaps = () => {
    return (
      <Chart
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart()
              const selection = chart.getSelection()
              if (selection.length === 0) return
              const region = chartData[selection[0].row + 1]
              console.log('Selected : ' + region)
            },
          },
        ]}
        chartType='GeoChart'
        width='100%'
        height={450}
        data={chartData}
        options={options}
      />
    )
  }

  const [maps, setMaps] = useState<React.JSX.Element | undefined>()

  useEffect(() => {
    setTimeout(() => {
      setMaps(renderMaps())
    }, 400)
  }, [isSidebarOpen, chartData])

  return (
    <Card
      overflow='hidden'
      variant='outline'
      rounded={20}
      cursor='pointer'
      transition='all 0.4s'
      _hover={{
        transform: 'scale(1.02)',
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
        <Text fontSize={14}>Vendor Headquarters Location</Text>
      </CardHeader>
      <CardBody>{maps}</CardBody>
    </Card>
  )
}

export default MapChart
