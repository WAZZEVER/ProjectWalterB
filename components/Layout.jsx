import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeroBanner from "./Herobanner";

const Layout = ({ children }) => {
  return (
    <div className='main-layout'>
      <Head>
        <title>WAZZEVER</title>
        <link rel="icon" href="https://th.bing.com/th/id/OIP.MsbTJ1aP-6jw_lY6BHGh0AHaEK?pid=ImgDet&rs=1" />
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
