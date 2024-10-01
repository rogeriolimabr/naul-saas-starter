'use client'

import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,
  Stack,
} from '@chakra-ui/react'

export const LastDarkWebNews = () => {
  const darkWebNews = [
    {
      title: 'Nova vulnerabilidade exposta em sistema bancário',
      description:
        'Uma nova falha de segurança foi descoberta em sistemas bancários que permite acesso não autorizado a contas de clientes.',
      date: '2024-10-01',
      source: 'TechRadar',
      image: 'https://via.placeholder.com/150', // Substitua pelo URL da imagem real
    },
    {
      title: 'Leilão de dados pessoais de usuários da Dark Web',
      description:
        'Dados pessoais de milhares de usuários estão sendo leiloados em um fórum da Dark Web, incluindo informações bancárias e credenciais de login.',
      date: '2024-09-30',
      source: 'The Hacker News',
      image: 'https://via.placeholder.com/150', // Substitua pelo URL da imagem real
    },
    {
      title: 'Aumento de ataques de ransomware',
      description:
        'O número de ataques de ransomware aumentou drasticamente, com hackers exigindo resgates em criptomoedas.',
      date: '2024-09-29',
      source: 'Dark Reading',
      image: 'https://via.placeholder.com/150', // Substitua pelo URL da imagem real
    },
    {
      title: 'Venda de drogas e armas com entrega via drone',
      description:
        'Criminosos estão inovando na entrega de produtos ilegais usando drones para evitar a detecção das autoridades.',
      date: '2024-09-28',
      source: 'CyberScoop',
      image: 'https://via.placeholder.com/150', // Substitua pelo URL da imagem real
    },
    {
      title: 'Operação policial desmantela rede de tráfico humano',
      description:
        'Uma grande operação policial resultou na prisão de vários indivíduos envolvidos em uma rede de tráfico humano na Dark Web.',
      date: '2024-09-27',
      source: 'The Verge',
      image: 'https://via.placeholder.com/150', // Substitua pelo URL da imagem real
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
        <Text fontSize={14}>Recent DarkWeb News</Text>
      </CardHeader>
      <CardBody
        maxH={395}
        overflowY='auto'
        padding={4}
      >
        <Accordion
          allowToggle
          index={1}
        >
          {darkWebNews.map((news, index) => (
            <AccordionItem
              border='none'
              key={index}
            >
              <h2>
                <AccordionButton>
                  <Box
                    as='span'
                    flex='1'
                    textAlign='left'
                  >
                    {news.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Stack
                  spacing={2}
                  direction='row'
                  justifyContent='start'
                >
                  <Image
                    src={news.image}
                    alt={news.title}
                    width={150}
                    borderRadius='md'
                  />
                  <Stack
                    direction='column'
                    borderLeft={'1px solid var(--naul-colors-borderSecondary)'}
                    pl={5}
                    gap={3}
                  >
                    <Text
                      fontSize='sm'
                      color='gray.500'
                    >
                      {news.date} | Fonte: {news.source}
                    </Text>
                    <Text>{news.description}</Text>
                  </Stack>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  )
}
