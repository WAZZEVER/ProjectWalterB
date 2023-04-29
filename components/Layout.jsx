import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeroBanner from "./Herobanner";

const Layout = ({ children }) => {
  return (
    <div className='main-layout'>
      <Head>
        <title>Arasaka</title>
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
