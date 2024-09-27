'use client'

import { Box, Stack, Text, useBreakpointValue } from '@chakra-ui/react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  // Controla visibilidade com base no tamanho da tela
  const isLg = useBreakpointValue({ base: false, lg: true })

  return (
    <Stack
      bg='blackAlpha.900'
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      height='100vh' // Define a altura do layout como 100% da viewport
    >
      {/* Coluna do conteúdo de autenticação */}
      <Box
        mx={3}
        w='100%'
      >
        {children}
      </Box>

      {/* Coluna com o vídeo e citação, visível apenas em 'lg' */}
      {isLg && (
        <Box
          position='relative'
          width='100%'
          height='100%' // Define a altura do vídeo como 100% do pai
          maxH='100vh' // Limita a altura máxima ao tamanho da tela
        >
          {/* Vídeo de fundo */}
          <video
            autoPlay
            muted
            loop
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Faz o vídeo cobrir a área, respeitando a proporção
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <source
              src='/videos/auth-video.mp4'
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>

          {/* Citação */}
          <Box
            position='absolute'
            bottom={0}
            right={0}
            w='100%'
            zIndex={2}
            mt='auto'
            p={4}
            bg='rgba(0, 0, 0, 0.6)' // Adiciona um fundo semi-transparente para o texto
          >
            <blockquote>
              <Text
                fontSize='sm'
                textAlign='right'
                fontFamily='menu'
                mb={2}
              >
                &ldquo;Protegendo os dados e a privacidade da sua empresa: nossa
                prioridade é garantir sua segurança digital.&rdquo;
              </Text>
              <Text
                fontSize='sm'
                textAlign='right'
                fontFamily='menu'
              >
                ADINT Cyber Intelligence Institute
              </Text>
            </blockquote>
          </Box>
        </Box>
      )}
    </Stack>
  )
}

export default AuthLayout
