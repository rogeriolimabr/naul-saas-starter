'use client';

import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const button = defineStyleConfig({
  variants: {
    primary: defineStyle(props => ({
      fontWeight: 'semibold',
      fontSize: 'sm',
      color: mode(`white`, `black`)(props),
      bgColor: mode(`purple.600`, `purple.400`)(props),
      _hover: {
        bgColor: mode(`purple.700`, `purple.500`)(props),
      },
    })),
    secondary: defineStyle(props => ({
      height: 12,
      fontWeight: 'medium',
      fontSize: 'sm',
      color: mode(`slate.900`, `slate.50`)(props),
      border: '1px',
      bgColor: mode(`white`, `black`)(props),
      _hover: {
        bgColor: mode(`slate.200`, `slate.900`)(props),
      },
    })),
    text: defineStyle(props => ({
      padding: '0 !important',
      border: 'none',
      background: 'none',
      fontWeight: 'medium',
      fontSize: 'sm',
      color: 'buttonText',
      height: 'auto',
      _hover: {
        textDecoration: 'underline',
      },
    })),
  },
});
