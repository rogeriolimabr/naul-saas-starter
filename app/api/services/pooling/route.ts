import { startCSVPooling, startFetch } from '@/lib/services/ics/actions/fetchCsv'

let isPoolingStarted = false

export const GET = () => {
  if (isPoolingStarted) {
    return Response.json(
      { message: 'Pooling is already running' },
      { status: 400 }
    )
  }

  // Inicia o pooling a cada 10 minutos
  startCSVPooling(60)
  isPoolingStarted = true
  return Response.json({ message: 'Pooling started successfully' })
}
