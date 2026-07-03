import { ScanSearch, ArrowRight, ExternalLink } from "lucide-react";

function CTA(){
  return(
    <section id="cta" className="mx-auto max-w-7xl px-6 py-28">
      
      {/* CTA Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-20 text-center shadow-2xl">

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm">
          <ScanSearch size={16} />
            AI Accessibility Scanner
          </span>

          <h2 className="mx-auto mt-8 max-w-3xl text-5xl font-bold leading-tight text-white md:text-6xl">
            Ready to Build
            <br />

            <span className="text-blue-200">
              Accessible Websites?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-base leading-8 text-blue-100 sm:max-w-2xl sm:text-lg">
            Scan your website in seconds, discover accessibility issues, and receive AI-Powered recommendations before your users even notice them.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button 
              onClick={() => 
                document.getElementById("scan-preview")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 cursor-pointer rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Start Free Scan
              <ArrowRight size={18} 
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <a 
              href="https://github.com/suryakanta-mohanty/ai-accessibility-auditor"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 cursor-pointer rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
            >
              <ExternalLink size={18} />
              View on GitHub
            </a>
          </div>
        </div>
        

        {/* Decorative background */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl"></div>

      </div>

    </section>
  );
}

export default CTA;