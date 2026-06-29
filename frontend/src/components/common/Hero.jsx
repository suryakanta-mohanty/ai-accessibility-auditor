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

      <div className="flex gap-4">
        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:big-blue-700">
          Start Scanning
        </button>

        <button className="rounded-lg border border-gray-300 px-6 py-3 font-semibold hover:big-blue-700">
          View GitHub
        </button>
      </div>
      
    </section>
  );
}

export default Hero;