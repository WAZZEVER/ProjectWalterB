import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Divider,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useUserContext } from "@/context/UserContext";
import { signOut, signIn } from "next-auth/react";

export default function Nav() {
  const { user } = useUserContext();

  const { colorMode, toggleColorMode } = useColorMode();
  function handleAuth() {
    signIn("discord");
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>WalterB</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>

              <Menu>
                <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                  <Avatar size={"sm"} src={user.profile} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} src={user.profile} />
                  </Center>
                  <br />
                  <Center>
                    <p>{user.username}</p>
                  </Center>
                  < Divider my={2}/>
                  <Center>
                    <p>Total Balance : {user.coin} (WC)</p>
                  </Center>
                  <MenuDivider />
                  {user.isAuth ? (
                    <>
                      <MenuItem onClick={signOut}>Logout</MenuItem>
                    </>
                  ) : (
                    <MenuItem onClick={handleAuth}>Sign In Using Discord</MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
