import Button from "../../components/UI/Button";
import { useState } from "react";
import { Menu, X } from "lucide-react";


function Navbar(){

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return(
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* Logo */}
        <a
          href="#home"
          className="text-xl font-bold text-blue-600"
        >
          AI Accessibility Auditor
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <a href="#features" className="transition-colors duration-300 hover:text-blue-600">
            Features
          </a>

          <a href="#how-it-works" className="transition-colors duration-300 hover:text-blue-600">
            How It Works
          </a>

          <a 
            href="https://github.com/suryakanta-mohanty/ai-accessibility-auditor"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-blue-600"
          >
            GitHub
          </a>

          <Button 
            variant="primary"
          >
            Login
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-pointer text-gray-700 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">

          <div className="flex flex-col px-6 py-5">

            <a
              href="#home"
              onClick={closeMenu}
              className="py-3 transition-colors duration-300 hover:text-blue-600"
            >
              Home
            </a>

            <a
              href="#features"
              onClick={closeMenu}
              className="py-3 transition-colors duration-300 hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="py-3 transition-colors duration-300 hover:text-blue-600"
            >
              How It Works
            </a>

            <a
              href="https://github.com/suryakanta-mohanty/ai-accessibility-auditor"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="py-3 transition-colors duration-300 hover:text-blue-600"
            >
              GitHub
            </a>

            <div className="mt-5">
              <Button variant="primary">
                Login
              </Button>
            </div>

          </div>

        </div>
      )}
      
    </nav>
  );
}

export default Navbar;