'use client'

import { Card, CardBody } from '@chakra-ui/react'
import TableProvider from './datatable/table-provider'

export const HunterDevices = () => {
  return (
    <Card
      overflow='hidden'
      variant='outline'
      rounded={20}
      cursor='pointer'
      transition='all 0.4s'
      padding={0}
    >
      <CardBody
      >
        <TableProvider />
      </CardBody>
    </Card>
  )
}
