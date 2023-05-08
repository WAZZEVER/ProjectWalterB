import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeroBanner from "./Herobanner";

const Layout = ({ children }) => {
  return (
    <div className='main-layout'>
      <Head>
        <title>WAZZEVER</title>
        <link rel="icon" href="https://cdn.discordapp.com/attachments/875195544010633306/1027553675100569600/WAZZ_3.png" />
        <style>{`
          /* Create a circle with a 50% border radius */
          head > link[rel="icon"] {
            border-radius: 50%;
          }
        `}</style>
      </Head>
      <header>
        <Navbar />
      </header>
      <HeroBanner/>
      <main className='main-container'>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
