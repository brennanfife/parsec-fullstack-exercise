import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import Form from '@/features/components/Form';
import ResponseBox from '@/features/components/ResponseBox';
import { useDataStore } from '@/store/Data';
import { IApiError } from '@/types';
import { getContract } from '@/utils/calls';

export default function Home() {
  const { address, func, args } = useDataStore();

  const { data, error, isError, refetch, isInitialLoading } = useQuery({
    queryKey: [address, func, args],
    queryFn: () => getContract(address, func, args),
    onError: (error: IApiError) => error,
    enabled: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      m="auto"
      h="100%"
      alignItems="center"
      maxW="7xl"
    >
      <Form refetch={refetch} />
      <ResponseBox
        data={data}
        error={error}
        isError={isError}
        isInitialLoading={isInitialLoading}
      />
    </Flex>
  );
}
