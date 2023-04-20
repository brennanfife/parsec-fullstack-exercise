import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import { DEFAULT_ARGS } from '@/constants';
import { useDataStore } from '@/store/Data';

export default function Form({ refetch }: { refetch: () => void }) {
  const { address, func, args, setAddress, setFunc, setArgs } = useDataStore();

  //function to easily add/test with default args
  function handleFillWithDefaults(defaultArgs = DEFAULT_ARGS.ERC20) {
    setAddress(defaultArgs.address);
    setFunc(defaultArgs.func);
    setArgs(defaultArgs.args);
  }

  return (
    <Flex flex="1" order={{ base: 2, md: 1 }}>
      <Container
        maxW="md"
        py={{ base: '4', md: '8' }}
        px="10"
        bg="white"
        boxShadow="md"
        borderRadius="xl"
      >
        <Stack spacing="8">
          <Stack align="center">
            <Text fontSize="4xl">🔭</Text>
            <Stack spacing="3" textAlign="center">
              <Heading size="md">Call Ethereum contract</Heading>
              <HStack justify="center" spacing="1">
                <Text color="gray.500">Fill with default args?</Text>
                <ButtonGroup>
                  <Button
                    variant="link"
                    colorScheme="black"
                    onClick={() => handleFillWithDefaults(DEFAULT_ARGS.ERC20)}
                    size="xs"
                    textDecoration="underline"
                  >
                    USDT
                  </Button>
                  <Button
                    variant="link"
                    colorScheme="black"
                    onClick={() => handleFillWithDefaults(DEFAULT_ARGS.ERC721)}
                    size="xs"
                    textDecoration="underline"
                  >
                    BAYC
                  </Button>
                </ButtonGroup>
              </HStack>
            </Stack>
          </Stack>
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '5' }}>
              <FormControl isRequired>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  id="address"
                  type="text"
                  spellCheck="false"
                  value={address || ''}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="function">Function</FormLabel>
                <Input
                  id="function"
                  type="text"
                  spellCheck="false"
                  value={func || ''}
                  onChange={(e) => setFunc(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="args">Arguments</FormLabel>
                <VStack>
                  {args.map((arg, index) => (
                    <Input
                      key={index}
                      id="args"
                      type="text"
                      spellCheck="false"
                      value={arg}
                      onChange={(e) => {
                        setArgs(
                          args.map((arg, i) =>
                            i === index ? e.target.value : arg,
                          ),
                        );
                      }}
                    />
                  ))}
                </VStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <FormHelperText color="gray.500" my="0.5rem">
                    Click to add more parameters
                  </FormHelperText>
                  <ButtonGroup>
                    <Button
                      size="xs"
                      variant="link"
                      onClick={() => setArgs([...args, ''])}
                      isDisabled={args[args.length - 1] === ''}
                    >
                      Add
                    </Button>
                    {args.length > 1 && (
                      <Button
                        size="xs"
                        variant="link"
                        onClick={() => {
                          const newArgs = args.slice(0, args.length - 1);
                          setArgs(newArgs);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </ButtonGroup>
                </HStack>
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button
                isDisabled={
                  !address ||
                  !func ||
                  (args.length > 1 && args[args.length - 1] === '')
                }
                onClick={() => refetch()}
              >
                Call function
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
