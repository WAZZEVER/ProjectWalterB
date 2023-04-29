import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { UserContext } from "@/context/UserContext";
import { discordAuthCol } from "@/Firebase/config";
import { useEffect } from "react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserContext>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </UserContext>
    </SessionProvider>
  );
}
