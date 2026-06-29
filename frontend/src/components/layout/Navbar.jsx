import Button from "../../components/UI/Button";

function Navbar(){
  return(
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <h1 className="text-xl font-bold text-blue-600">
          AI Accessibility Auditor
        </h1>

        <div className="flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Features
          </a>

          <a href="#" className="text-gray-600 hover:text-blue-600">
            Docs
          </a>

          <a href="#" className="text-gray-600 hover:text-blue-600">
            GitHub
          </a>

          <Button 
            variant="primary"
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;