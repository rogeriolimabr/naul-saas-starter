import { UIProvider } from './ui-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <UIProvider>{children}</UIProvider>
}
