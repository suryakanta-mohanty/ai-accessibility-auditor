import Button from "../../components/UI/Button";

function Hero(){
  return(
    <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      
      <p className="mb-4 rounded-full big-blue-100 px-4 py-2 text-blue-700">
        AI Accessibility Auditor
      </p>

      <h1 className="mb-6 text-6xl font-extrabold leading-tight">
        Build Accessible Website
        <br />
        with AI
      </h1>

      <p className="mb-10 mx-w-2xl text-lg text-gray-600">
        Scan website, detect accessibility issues, and receive intelligent AI-powered recomendation in second.
      </p>

      <div className="flex gap-6">
        <Button variant="primary">
          Start Scanning
        </Button>

        <Button variant="secondary">
          View GitHub
        </Button>
      </div>
      
    </section>
  );
}

export default Hero;