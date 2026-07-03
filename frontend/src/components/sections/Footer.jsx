import { 
  ScanSearch,
  Mail,
  ArrowUp,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";

function Footer(){
  return(

    <footer id="contact" className="border-t border-gray-200 bg-gray-50">
      
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-5">

        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                <ScanSearch size={24} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  AI Accessibility Auditor
                </h3>

                <p className="text-sm text-gray-500">
                  AI-Powered Website Accessibility Scanner
                </p>
              </div>

            </div>

            <p className="mt-6 max-w-sm text-base leading-8 text-gray-600 sm:max-w-md">
              Build more inclusive digital experiences with our AI-powered accessibility scanner. Detect issues, receive actionable recommendations, and improve compliance with confidence.
            </p>

            {/* Social Icon */}
            <div className="mt-10 flex items-center gap-4">
              <a 
                href="https://github.com/suryakanta-mohanty/ai-accessibility-auditor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <FaGithub size={20} />
              </a>

              <a 
                href="https://www.linkedin.com/in/suryakanta-mohanty/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <FaLinkedin size={20} />
              </a>
            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h4 className="text-lg font-semibold text-gray-900">
              Quick Links
            </h4>

            <ul className="mt-5 space-y-3">
              <li>
                <a 
                  href="#home"
                  className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
                >
                  Home
                </a>
              </li>

              <li>
                <a 
                  href="#features"
                  className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
                >
                  Features
                </a>
              </li>

              <li>
                <a 
                  href="#faq"
                  className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
                >
                  FAQs
                </a>
              </li>
            </ul>

          </div>

          {/* Contact */}
          <div>

            <h4 className="text-lg font-semibold text-gray-900">
              Contact
            </h4>

            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">

                <Mail 
                  size={18} 
                  className="mt-1 shrink-0 text-blue-600"
                />

                <a 
                  href="mailto:suryakantamohanty855@gmail.com"
                  className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
                >
                  suryakantamohanty855@gmail.com
                </a>

              </li>
            </ul>

          </div>

        </div>

        {/* Divider */}
        <div className="my-5 border-t border-gray-200"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-5 text-sm text-gray-500 md:flex-row">

          <p>
            <span>&copy;</span> {" "}2026 AI Accessibility Auditor. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span>Built with</span>
            <span className="font-semibold text-blue-600">
              React
            </span>
            <span>&</span>
            <span className="font-semibold text-cyan-600">
              Tailwind CSS
            </span>
          </div>

        </div>

      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-16 right-8 flex h-12 w-12 cursor-pointer z-100 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
      >
        <ArrowUp size={20} />
      </button>

    </footer>

  );
}

export default Footer;