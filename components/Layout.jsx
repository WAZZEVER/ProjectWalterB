import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeroBanner from "./Herobanner";

const Layout = ({ children }) => {
  return (
    <div className='main-layout'>
      <Head>
        <title>WAZZEVER</title>
        <link rel="icon" href="https://cdn.discordapp.com/attachments/1095711751787520001/1105127283389378721/download_3.png" />
        <style>{`
          /* Create a circle with a 50% border radius */
          head > link[type="image/png"] {
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
