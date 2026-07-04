import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import Stats from "../../components/sections/Stats";
import ScanPreview from "../../components/common/ScanPreview";
import HowItWorks from "../../components/common/HowItWorks";
import ReportPreview from "../../components/common/ReportPreview";
import Testimonials from "../../components/common/Testimonials";
import CTA from "../../components/sections/CTA";
import FAQ from "../../components/sections/FAQ";
import Footer from "../../components/sections/Footer";


function Home(){
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <ScanPreview />
        <ReportPreview />
        <Testimonials />
        <CTA />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}

export default Home;