import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderWidth: '2px',
              borderColor: 'blackAlpha.500',
              boxShadow: `none`,
            },
          },
        },
      },
    },
  },
});
