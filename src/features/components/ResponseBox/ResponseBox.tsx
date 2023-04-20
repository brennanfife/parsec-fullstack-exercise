import { Center, Link, Spinner, Text, VStack } from '@chakra-ui/react';
import { utils } from 'ethers';

import { IApiError } from '@/types';
import { getEtherscanLink, shortenAddress, truncateString } from '@/utils';

export default function ResponseBox({
  data,
  error,
  isError,
  isInitialLoading,
}: {
  data: string | undefined;
  error: IApiError | null;
  isError: boolean;
  isInitialLoading: boolean;
}) {
  return (
    <Center flex="1" px={{ base: '0', md: '8' }} order={{ base: 1, md: 2 }}>
      <VStack spacing="8" fontSize={{ base: '2xl', md: '4xl' }} color="white">
        {data ? (
          <VStack>
            <Text>And your result:</Text>
            {data && utils.isAddress(data) ? (
              <Link
                rel="noopener noreferrer"
                textDecoration="underline"
                target="_blank"
                href={getEtherscanLink(1, data, 'address')}
              >
                {shortenAddress(data)}
              </Link>
            ) : (
              <Text>{data}</Text>
            )}
          </VStack>
        ) : isError ? (
          <Text color="red.200" fontStyle="italic">
            Error: {error && truncateString(error.message)}
          </Text>
        ) : isInitialLoading ? (
          <Center w="100%" p="1rem">
            <Spinner size="lg" color="white" />
          </Center>
        ) : (
          <Text>Waiting for your input...</Text>
        )}
      </VStack>
    </Center>
  );
}
