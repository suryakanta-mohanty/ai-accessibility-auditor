import FeatureCard from "./FeatureCard";
import {
  Search,
  Bot,
  BarChart3,
} from "lucide-react";

function Features(){
  return(
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      
      <div className="mb-16 text-center">
        
        <p className="mb-3 font-semibold text-blue-600">
          FEATURES
        </p>

        <h2 className="text-4xl font-bold">
          Everything You Need
        </h2>

        <p className="mt-4 text-gray-600">
          Scan, Analyze and improve accessibility with AI
        </p>

      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard 
          icon={<Search size={32} />}
          title="Accessibility Scanner"
          description="Detect accessibility issues across your website in seconds."
        />

        <FeatureCard 
          icon={<Bot size={32} />}
          title="AI Suggestion"
          description="Receive intelligent recommendations to fix every issue."
        />

        <FeatureCard 
          icon={<BarChart3 size={32} />}
          title="Accessibility Score"
          description="Measure WCAG compilance with a clear accessibility score."
        />

      </div>

    </section>
  );
}

export default Features;