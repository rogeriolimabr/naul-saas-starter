'use client'

import { useLayout } from '@/lib/hooks/useLayout'
import { IconButton } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'

const ToggleSidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useLayout()

  return (
    <IconButton
      aria-label={''}
      onClick={() => toggleSidebar()}
    >
      <Icon
        icon={isSidebarOpen ? 'ic:round-menu-open' : 'ic:round-menu'}
        width={24}
        height={24}
      />
    </IconButton>
  )
}

export default ToggleSidebar