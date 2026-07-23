import { useEffect, useState } from "react";
import { getHealthStatus } from "../../services/api";

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

  const [backendStatus, setBackendStatus] = useState(
    "Connecting to backend... Free server may take a few seconds to wake up."
  );

  useEffect(() =>{
    getHealthStatus()
      .then(() =>{
        setBackendStatus("Backend connected!");
      })
      .catch(() =>{
        setBackendStatus("Backend is waking up or temporarily unavailable. Please wait a few seconds and refresh.");
      });
  }, []);

  return (
    <>
      <Navbar />

      <div 
        className={`px-6 py-3 text-center text-sm font-medium ${
          backendStatus === "Backend connected!"
          ? "bg-green-50 text-green-700"
          : "bg-yellow-50 text-yellow-700"
        }`}
      >
        Backend Status: {backendStatus}
      </div>

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