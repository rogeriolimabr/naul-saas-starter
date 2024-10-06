'use client'

import {
  Card,
  CardHeader,
  CardBody,
  Text,
  VStack,
  StackDivider,
  HStack,
} from '@chakra-ui/react'

import { Icon } from '@iconify-icon/react'

export const Recommendations = () => {
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
        <Text fontSize={14}>Actionable Recommendations</Text>
      </CardHeader>
      <CardBody
        maxH={395}
        overflowY='auto'
        padding={4}
      >
        <VStack
          align='start'
          spacing={6}
          divider={<StackDivider />}
        >
          <HStack spacing={5}>
            <Icon icon='mdi:shield-lock' width={30} height={30} />
            <Text fontSize={14}>
              <strong>Reinforce Account Security:</strong> For accounts that
              have experienced credential leaks, it is crucial to enhance
              security measures. Recommend that users enable two-factor
              authentication (2FA) to add an additional layer of protection.
              Additionally, encourage users to regularly update their passwords
              and provide educational materials on recognizing phishing attempts
              and suspicious activities.
            </Text>
          </HStack>
          <HStack spacing={5}>
            <Icon icon='mdi:monitor-dashboard' width={30} height={30} />
            <Text fontSize={14}>
              <strong>Enhance Monitoring for Fraudulent Activities:</strong> For
              accounts flagged with suspicious transactions, implement a more
              robust monitoring system to track unusual activities in real-time.
              This may include setting up alerts for transactions above a
              certain threshold and instituting a temporary hold on accounts
              that exhibit irregular behavior until further verification is
              conducted.
            </Text>
          </HStack>
          <HStack spacing={5}>
            <Icon icon='mdi:comment-alert' width={30} height={30} />
            <Text fontSize={14}>
              <strong>Social Media Engagement Strategies:</strong> Given the
              negative mentions detected on social media platforms, it is vital
              to develop a proactive engagement strategy. Respond promptly to
              customer complaints to show that the brand values feedback and is
              committed to resolution. Consider launching a campaign that
              highlights positive customer experiences and brand values to
              improve overall perception and counteract negative sentiments.
            </Text>
          </HStack>
          <HStack spacing={5}>
            <Icon icon='mdi:account-search' width={30} height={30} />
            <Text fontSize={14}>
              <strong>Regular CNPJ Monitoring:</strong> To mitigate risks
              associated with new registrations linked to the brand's CNPJ,
              establish a routine monitoring process. This could involve setting
              up automated alerts for any new business registrations that
              resemble the brand. Investigate and take appropriate actions on
              any unauthorized registrations that may dilute the brand’s
              identity or create confusion among consumers.
            </Text>
          </HStack>
          <HStack spacing={5}>
            <Icon icon='mdi:school' width={30} height={30} />
            <Text fontSize={14}>
              <strong>Implement User Education Programs:</strong> Organize
              educational webinars or create informative content that educates
              users on cybersecurity best practices. Topics could include
              recognizing fraudulent schemes, securing personal information, and
              understanding the implications of credential leaks. Empowering
              users with knowledge can significantly reduce the risk of future
              incidents.
            </Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}
