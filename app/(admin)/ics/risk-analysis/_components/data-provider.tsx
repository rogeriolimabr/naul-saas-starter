'use client'

import { Text, Stack, Grid, GridItem, TabIndicator } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import { useQuery } from '@tanstack/react-query'
import { getData } from '@/lib/services/ics/getRiskAnalysisData'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { MainView } from './main-view/provider'

export const DataProvider = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['riskAnalysis'],
    queryFn: () => getData(),
  })

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error</div>

  const tabFontSize = 12

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
            Risk Analysis
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
            The Risk Analysis module in our Cyber Security platform provides a
            comprehensive dashboard displaying ICS advisory data. With
            interactive filters and dynamic charts, users can analyze
            vulnerabilities, affected products, and vendors. The module supports
            informed decision-making by highlighting critical infrastructure
            risks, CVSS scores, and relevant CVE information, enabling timely
            action against emerging threats.
          </Text>
        </Stack>
      </GridItem>

      <GridItem colSpan={4}>
        <Tabs
          position='relative'
          variant='unstyled'
          isFitted
        >
          <TabList>
            <Tab fontSize={tabFontSize}>Main View</Tab>
            <Tab fontSize={tabFontSize}>Vulnerability Severity</Tab>
            <Tab fontSize={tabFontSize}>Vendors & Product Affected</Tab>
            <Tab fontSize={tabFontSize}>Critical Infrastructure View</Tab>
            <Tab fontSize={tabFontSize}>CWEs View</Tab>
            <Tab fontSize={tabFontSize}>Mitigation View</Tab>
            <Tab fontSize={tabFontSize}>Individual CVE CVSS & EPSS View</Tab>
          </TabList>
          <TabIndicator
            mt='6px'
            height='3px'
            bg='brand'
            borderRadius='1px'
          />
          <TabPanels my={5}>
            <TabPanel>
              <MainView data={data} />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
    </Grid>
  )
}
