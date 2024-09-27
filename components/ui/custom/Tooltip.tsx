'use client'

import {
  Tooltip as CUITooltip,
  TooltipProps as CUITooltipProps,
  forwardRef,
} from '@chakra-ui/react'

export type TooltipProps = CUITooltipProps
export const Tooltip = forwardRef<TooltipProps, 'div'>(
  ({ children, ...rest }, ref) => (
    <CUITooltip
      placement='right'
      p={4}
      ml={5}
      bg='tooltipBackground'
      color='tooltipLabel'
      fontSize='lg'
      borderRadius={'lg'}
      ref={ref}
      closeOnClick={false}
      {...rest}
    >
      {children}
    </CUITooltip>
  )
)
