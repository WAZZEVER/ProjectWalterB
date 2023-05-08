import {
  Text,
  Button,
  Stack,
  Flex,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function HeroBanner() {
  return (
      <Flex
      w={'full'}
      h={'50vh'}
      backgroundImage={
        'url(https://th.bing.com/th/id/R.e9d3b8cb7df187d9e0b7674a7275cf9c?rik=ychBmMk0OS%2bS6Q&pid=ImgRaw&r=0)'
      }
      backgroundSize={'contain'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            Complete Task To earn
          </Text>
          <Stack direction={'row'} gap={5}>
            <Button
              bg={'blue.400'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'blue.500' }}>
              Learn More
            </Button>
            <Button
              bg={'whiteAlpha.300'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'whiteAlpha.500' }}>
              Start Earning
            </Button>
          </Stack>

</Stack>

        </Stack>
      </VStack>
    </Flex>
  );
}
