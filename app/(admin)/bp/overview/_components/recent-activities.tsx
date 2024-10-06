'use client'

import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  VStack,
} from '@chakra-ui/react'

export const RecentActivities = () => {
  const recentActivities = [
    {
      activityType: 'Takedown Request',
      description:
        'Takedown request submitted for unauthorized use of brand logo.',
      date: '2024-10-01',
      status: 'Resolved',
    },
    {
      activityType: 'Fraud Detection',
      description:
        'Detected potential fraudulent transaction on user account #12345.',
      date: '2024-10-02',
      status: 'Investigating',
    },
    {
      activityType: 'Social Media Mention',
      description:
        'Negative mention of the brand on Twitter regarding service issues.',
      date: '2024-10-03',
      status: 'Addressed',
    },
    {
      activityType: 'Credential Leak',
      description: 'Credential leak detected for user account @user123.',
      date: '2024-10-04',
      status: 'Notified user',
    },
    {
      activityType: 'Takedown Request',
      description:
        'Takedown request submitted for counterfeit product listing.',
      date: '2024-10-05',
      status: 'Pending',
    },
    {
      activityType: 'Fraud Detection',
      description: 'Suspicious activity detected on credit card transaction.',
      date: '2024-10-06',
      status: 'Resolved',
    },
    {
      activityType: 'Social Media Mention',
      description: 'Positive mention of the brand in an online review.',
      date: '2024-10-07',
      status: 'Acknowledged',
    },
    {
      activityType: 'CNPJ Monitoring',
      description:
        'Alert: New registration associated with brand CNPJ detected.',
      date: '2024-10-08',
      status: 'Investigating',
    },
  ]

  return (
    <Card
      overflow='hidden'
      variant='outline'
      rounded={20}
      cursor='pointer'
      transition='all 0.4s'
      padding={0}
    >
      <CardHeader
        bg='backgroundSecondary'
        py={4}
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
      >
        <Text fontSize={14}>Recent Activities</Text>
      </CardHeader>
      <CardBody
        maxH={395}
        overflowY='auto'
        padding={4}
      >
        <Table variant='simple'>
          <TableCaption>
            Overview of recent activities related to brand protection.
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Activity Type</Th>
              <Th>Description</Th>
              <Th>Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recentActivities.map((activity, index) => (
              <Tr key={index}>
                <Td fontSize={13}>{activity.activityType}</Td>
                <Td fontSize={13}>{activity.description}</Td>
                <Td fontSize={13}>{activity.date}</Td>
                <Td fontSize={13}>{activity.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
