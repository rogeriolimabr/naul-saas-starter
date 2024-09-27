'use client'

import { useLayout } from '@/lib/hooks/useLayout'
import AdintLogo from '../common/adint-logo'
import AdintLogoCollapsed from '../common/adint-logo-collapsed'

export const SidebarFooter = () => {
  const { isSidebarOpen } = useLayout()

  return isSidebarOpen ? (
    <AdintLogo
      width={220}
      height={80}
    />
  ) : (
    <AdintLogoCollapsed
      width={40}
      height={60}
    />
  )
}
