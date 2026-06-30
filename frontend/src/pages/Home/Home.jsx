import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import Stats from "../../components/sections/Stats";

function Home(){
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
    </>
  );
}

export default Home;