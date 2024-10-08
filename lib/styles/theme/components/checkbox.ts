'use client';

import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const multiStyleConfigHelpers = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

export const checkbox = multiStyleConfigHelpers.defineMultiStyleConfig({
  sizes: {},
  variants: {
    outline: multiStyleConfigHelpers.definePartsStyle(props => ({
      control: {
        bg: 'surface',
        borderColor: mode(`slate.300`, `slate.700`)(props),
        _checked: {
          bg: mode(`purple.600`, `purple.400`)(props),
          borderColor: mode(`purple.600`, `purple.400`)(props),
          _hover: {
            bg: mode(`purple.600`, `purple.400`)(props),
            borderColor: mode(`purple.600`, `purple.400`)(props),
          },
        },
        _hover: {
          bg: 'surface',
          borderColor: mode(`slate.300`, `slate.700`)(props),
        },
      },
      label: {
        fontSize: 'sm',
      },
    })),
  },
});
