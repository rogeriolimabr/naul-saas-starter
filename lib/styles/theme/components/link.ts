'use client';

import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

export const link = defineStyleConfig({
  variants: {
    aTag: defineStyle(props => ({
      textDecoration: 'underline',
      color: 'purple.600',
      _hover: {
        textDecoration: 'none',
      },
    })),
    noUnderline: defineStyle({
      textDecoration: 'none',
      _hover: {
        textDecoration: 'none',
      },
    }),
  },
});
