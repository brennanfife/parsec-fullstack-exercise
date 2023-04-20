import { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Box
      as="main"
      bgColor="gray.500"
      className={inter.className}
      py={{ base: '12', md: '24' }}
      h="100vh"
      mx="auto"
    >
      {children}
    </Box>
  );
}
