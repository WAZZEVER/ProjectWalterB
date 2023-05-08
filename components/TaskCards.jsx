import { OnProgressTask } from "@/Firebase/TaskInit";
import { useUserContext } from "@/context/UserContext";
import { Box, Heading, Text, Flex, useColorModeValue, HStack, Grid, Center, Divider } from "@chakra-ui/react";
import { BsArrowUpRight, BsCoin } from "react-icons/bs";

const TaskCard = () => {
  const { task, user } = useUserContext();
  const boxShadowColorMode = useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan");
  const handleProgress = async (user, tName, link) => {
    await OnProgressTask(user, tName);
    window.location.href = link;
  };
  const checkCooldown = (user, eTask) => {
    const completedTask = user.CompletedTasks.find((task) => task.Name === eTask.Name);

    if (!completedTask) {
      return {
        isCooldownExpired: false,
        remainingHours: 0,
      };
    }
    const completedTime = new Date(completedTask.CoolDown.seconds * 1000);
    const now = new Date();
    const elapsedHours = (now - completedTime) / 1000 / 60 / 60;
    const remainingHours = eTask.CoolDownLimit - elapsedHours;

    if (elapsedHours >= eTask.CoolDownLimit) {
      return {
        isCooldownExpired: true,
        remainingHours: 0,
      };
    }

    return {
      isCooldownExpired: false,
      remainingHours: remainingHours.toFixed(1),
    };
  };

  return (
    <Box>
      <Center m={2}>
        <Heading>Tasks</Heading>
      </Center>
      <Divider />
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(4,1fr)" }} maxH={"30vh"}>
        {task ? (
          task.map((eTask) => {
            const isCompletedTask = (completedTasks, taskName) => {
              for (const key in completedTasks) {
                const task = completedTasks[key];
                if (task.Name === taskName) {
                  return true;
                }
              }
              return false;
            }; // True when found
            const { isCooldownExpired, remainingHours } = checkCooldown(user, eTask);
            let isCompleted = isCompletedTask(user.CompletedTasks, eTask.Name);
            let isCompleting = user.isCompleting === eTask.Name; // True when found
            const log = isCompleted ? "Completed" : isCompleting ? "On Progress" : "Open";
            const pointerEventsStyle = isCompleted
              ? { pointerEvents: "none" }
              : user.isCompleting === ""
              ? { pointerEvents: "auto" }
              : isCompleting != "" && isCompleting
              ? { pointerEvents: "auto" }
              : { pointerEvents: "none" };
            return (
              <Box
                key={eTask.Name}
                w='xs'
                rounded={"sm"}
                my={5}
                mx={"auto"}
                overflow={"hidden"}
                bg='white'
                border={"1px"}
                borderColor='black'
                boxShadow={boxShadowColorMode}>
                <Box p={4}>
                  <Box bg='black' display={"inline-block"} px={2} py={1} color='white' mb={2}>
                    <Text fontSize={"xs"} fontWeight='medium'>
                      {log}
                    </Text>
                  </Box>
                  <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
                    {eTask.Name}
                  </Heading>
                  <Text color={"gray.500"} noOfLines={2}>
                    {isCompleted ? (isCooldownExpired ? "" : `Cooldown will end in ${remainingHours} hours.`) : ""}
                  </Text>
                </Box>
                <HStack borderTop={"1px"} color='black'>
                  <Flex
                    style={pointerEventsStyle}
                    onClick={() => handleProgress(user.discordId, eTask.Name, eTask.url)}
                    key={eTask.url}
                    p={4}
                    alignItems='center'
                    justifyContent={"space-between"}
                    roundedBottom={"sm"}
                    cursor={"pointer"}
                    w='full'>
                    <Text fontSize={"md"} fontWeight={"semibold"}>
                      {isCompleted ? "Already Completed" : "Go to link"}
                    </Text>
                    <BsArrowUpRight />
                  </Flex>
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
};

export default TaskCard;
