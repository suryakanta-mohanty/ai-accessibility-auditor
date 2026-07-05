import StepCard from "../common/StepCard";
import {
  Globe,
  ScanSearch,
  BadgeCheck,
} from "lucide-react";

function HowItWorks(){
  return(

    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-28">

      {/* Heading */}
      <div className="mb-16 text-center">

        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          How It Works
        </span>

        <h2 className="mt-3 text-4xl font-bold">
          Accessibility Testing{" "}
          <span className="text-blue-600">Made Simple</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Analyze your website in less than 30 second with our AI-Powered accessibility scanner.
        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

        <StepCard 
          number="01"
          icon={<Globe size={34} />}
          title="Enter Website URL"
          description="Paste any public website URL to begin accessibility analysis."
        />

        <StepCard 
          number="02"
          icon={<ScanSearch size={34} />}
          title="AI Accessibility Scan"
          description="Our AI scans your website and detects WCAG accessibility issues."
        />

        <StepCard 
          number="03"
          icon={<BadgeCheck size={34} />}
          title="Receive Actionable Report"
          description="Get a detailed accessibility report with practical recommendations."
        />

      </div>

    </section>

  );
}

export default HowItWorks;