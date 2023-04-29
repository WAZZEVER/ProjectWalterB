import { useUserContext } from "@/context/UserContext";
import { Box, Heading, Text, Flex, useColorModeValue, HStack, Grid, Center, Divider } from "@chakra-ui/react";
import Link from "next/link";
import { BsArrowUpRight, BsCoin } from "react-icons/bs";

export default function TaskCard() {
  const { task, user } = useUserContext();

  return (
    <Box>
      <Center m={2}>
        <Heading>Tasks</Heading>
      </Center>
      <Divider/>
    <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} minH={'30vh'}>
        {task ? (
          task.map((eTask) => {
            let isCompleted = user.CompletedTasks.find((task) => task.Name === eTask.Name) === undefined;
            return (
              <Box key={eTask.Name}
                w='xs'
                h={'12.5em'}
                rounded={"sm"}
                my={5}
                mx={'auto'}
                overflow={"hidden"}
                bg='white'
                border={"1px"}
                borderColor='black'
                boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}>
                <Box p={4}>
                  <Box bg='black' display={"inline-block"} px={2} py={1} color='white' mb={2}>
                    <Text fontSize={"xs"} fontWeight='medium'>
                      { isCompleted ? "Open" : "Completed"}
                    </Text>
                  </Box>
                  <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
                    {eTask.Name}
                  </Heading>
                  <Text color={"gray.500"} noOfLines={2}>
                    Cooldown and will be available in next 2 hour
                  </Text>
                </Box>
                <HStack borderTop={"1px"} color='black'>
                  <Link style={isCompleted ? { pointerEvents: "auto"}: { pointerEvents: "none" }} key={eTask.url} href={eTask.url}>
                    <Flex p={4} alignItems='center' justifyContent={"space-between"} roundedBottom={"sm"} cursor={"pointer"} w='full'>
                      <Text fontSize={"md"} fontWeight={"semibold"}>
                        {isCompleted ? "Go to link": "Already Completed"}
                      </Text>
                      <BsArrowUpRight />
                    </Flex>
                  </Link>
                  <Flex
                    gap={3}
                    p={4}
                    alignItems='center'
                    justifyContent={"space-between"}
                    roundedBottom={"sm"}
                    borderLeft={"1px"}
                    cursor='pointer'>
                    {eTask.price}
                    <BsCoin />
                  </Flex>
                </HStack>
              </Box>
            );
          })
        ) : (
          <p>Hello </p>
        )}
    </Grid>
    </Box>
  );
}
