import Button from "../../components/UI/Button";
import { 
  Sparkle,
  ShieldCheck,
  Bot,
  Zap,
} from "lucide-react";

function Hero(){
  return(
    <section className="relative overflow-hidden px-6 py-20 md:py-24">
      
      <div className="absolute left-1/2 top-24 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
        
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full shadow-lg border border-blue-200 bg-blue-50 mb-8 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
          <Sparkle size={16} />
          AI-Powered Accessibility Platform
        </span>

        <h1 className="mb-3 text-5xl font-extrabold">
          Build Accessible Website
          <br />
          <span className="text-blue-600">
            with confidence.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          Automatically scan your website, detect accessibility issues,
          and receive AI-Powered recomendations to improve WCAG compliance in seconds.
        </p>

        {/* Buttons */}

        <div className="flex gap-6 mt-8">
          <Button variant="primary" className="transition-all duration-300 hover:scale-105">
            Start Free Scanning
          </Button>

          <Button variant="secondary" className="transition-all duration-300 hover:scale-105">
            View GitHub
          </Button>
        </div>
      
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-600">

          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-green-600" />
            <span>WCAG 2.2 Ready</span>
          </div>

          <div className="flex items-center gap-2">
            <Bot size={18} className="text-blue-600" />
            <span>AI Powered</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap size={18} className="text-yellow-500" />
            <span>Fast Analysis</span>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Hero;