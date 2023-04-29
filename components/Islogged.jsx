import { Box, Flex, Heading, Text, Button, Link } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { FaDiscord } from "react-icons/fa";
import { signIn } from "next-auth/react"

export default function Islogged() {
    function handleAuth () {
        signIn('discord')
    };

  return (
    <Box textAlign='center' py={10} px={6}>
      <Box display='inline-block'>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          bg={"red.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign='center'>
          <CloseIcon boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      <Heading as='h2' size='xl' mt={6} mb={2}>
        NOT LOGGED IN
      </Heading>
      <Text color={"gray.500"}>You should be logged in to start / compelete the tasks and earn.</Text>
        <Button
        onClick={handleAuth}
          my={5}
          gap={2}
          px={8}
          bg={"gray.900"}
          color={"white"}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}>
          Sign Up Using Discord
          <FaDiscord size={"30px"} />
        </Button>
    </Box>
  );
}
