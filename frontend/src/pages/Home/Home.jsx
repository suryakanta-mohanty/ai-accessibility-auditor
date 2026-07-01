import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import Stats from "../../components/sections/Stats";
import ScanPreview from "../../components/common/ScanPreview";
import HowItWorks from "../../components/common/HowItWorks";
import ReportPreview from "../../components/common/ReportPreview";
import Testimonials from "../../components/common/Testimonials";


function Home(){
  return (
    <>
      <Navbar />
      <Hero />
      <ScanPreview />
      <HowItWorks />
      <ReportPreview />
      <Testimonials />
      <Stats />
      <Features />
    </>
  );
}

export default Home;