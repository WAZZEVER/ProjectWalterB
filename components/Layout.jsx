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
