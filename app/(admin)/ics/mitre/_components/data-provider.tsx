'use client'

import { Box, Stack, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

const DataProvider = () => {
  const [iframeDimensions, setIframeDimensions] = useState({
    width: window.innerWidth * 0.8, // Ajuste a porcentagem conforme necessário
    height: window.innerHeight * 1, // Ajuste a porcentagem conforme necessário
  })

  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIframeDimensions({
        width: window.innerWidth * 0.8, // Ajuste a porcentagem conforme necessário
        height: window.innerHeight * 2, // Ajuste a porcentagem conforme necessário
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Atualize as dimensões inicialmente

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <Stack>
        <iframe
          ref={iframeRef}
          src='https://navigator-plum.vercel.app/'
          width='100%'
          height={iframeDimensions.height}
          style={{ border: 'none', overflow: 'hidden', borderRadius: 10 }} // Remove o border padrão do iframe
        />
      </Stack>
    </Box>
  )
}

export default DataProvider
