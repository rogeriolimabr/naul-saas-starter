import { useLayout } from '@/lib/hooks/useLayout'
import { Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'

export const data = [
  ['Country', ''],
  ['Germany', 200],
  ['United States', 300],
  ['Brazil', 400],
  ['Canada', 500],
  ['France', 600],
  ['RU', 700],
]

export const options = {
  colorAxis: { colors: ['#f9d58f', '#ed9b0f', '#D45453'] },
  backgroundColor: 'transparent',
  datalessRegionColor: '#E8E8EC',
  defaultColor: '#f9d58f',
}

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
            const region = data[selection[0].row + 1]
            console.log('Selected : ' + region)
          },
        },
      ]}
      chartType='GeoChart'
      width='100%'
      height={450}
      data={data}
      options={options}
    />
  )
}

export default function MapChart() {
  const { isSidebarOpen } = useLayout()
  const [maps, setMaps] = useState<React.JSX.Element | undefined>()

  useEffect(() => {
    setTimeout(() => {
      setMaps(renderMaps())
    }, 400)
  }, [isSidebarOpen])

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
        <Text fontSize={14}>Global Incident Distribution</Text>
        <Text
          fontSize={12}
          color='muted'
        >
          last year
        </Text>
      </CardHeader>
      <CardBody>{maps}</CardBody>
    </Card>
  )
}
