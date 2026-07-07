import { useState } from "react";
import { Globe, LoaderCircle } from "lucide-react";
import { scanWebsite } from "../../services/api";

function ScanPreview(){

  const [url, setUrl] = useState("https://demo.mywebsite.com");
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");

  async function handleScan(){
    setError("");
    setIsScanning(true);

    try{
      const data = await scanWebsite(url);
      setScanResult(data);

    } catch{
      setError("Something went wrong. Please make sure backend is running");

    } finally{
      setIsScanning(false);
    }
  }

  const score = scanResult?.accessibilityScore ?? 95;
  const totalIssues = scanResult?.totalIssues ?? 0;

  return(

    <section id="scan-preview" className="px-6 py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

        {/* Browser Bar */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-5">

          <div className="flex items-center gap-2">

            <div className="h-3.5 w-3.5 rounded-full bg-red-400"></div>
            <div className="h-3.5 w-3.5 rounded-full bg-yellow-400"></div>
            <div className="h-3.5 w-3.5 rounded-full bg-green-400"></div>

          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-sm text-gray-500 shadow-sm">
            <Globe size={16} />
            <input 
              type="url" 
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com"
              className="w-full bg-transparent outline-none"            
            />
            
          </div>

          <button 
            onClick={handleScan}
            disabled={isScanning}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isScanning && <LoaderCircle size={16} className="animate-spin" />}
            {isScanning ? "Scanning..." : "Scan"}
          </button>

        </div>

        {/* Report */}
        <div className="p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Accessibility Report
          </h2>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {/* Score Section */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Accessibility Score
              </p>

              <h3 className="mt-3 text-6xl font-bold text-gray-900">
                {score}
              </h3>

              <p className="mt-2 text-green-600 font-semibold">
                {score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Needs Improvement"}
              </p>

            </div>

            {/* Right */}
            <div>

              <div className="mb-3 flex justify-between">

                <span className="font-medium">
                  Overall Score
                </span>

                <span>
                  {score}%
                </span>

              </div>

              <div className="h-4 overflow-hidden rounded-full bg-gray-200">

                <div 
                  className="h-full rounded-full bg-blue-600 transition-all duration-700"
                  style={{ width: `${score}%` }}
                ></div>

              </div>

              <p className="mt-4 text-sm text-gray-600">
                Total Issues Found:{" "}
                <span className="font-semibold text-gray-900">
                  {totalIssues}
                </span>
              </p>

            </div>

          </div>

          {/* Dynamic result */}
          {scanResult && (
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Issues Found
                </h3>

                <ul className="mt-4 space-y-3">
                  {scanResult.issues.map((issue, index) =>(
                    <li
                      key={index}
                      className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Recommendations
                </h3>

                <ul className="mt-4 space-y-3">
                  {scanResult.recommendations.map((recommendation, index) =>(
                    <li 
                      key={index}
                      className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700"
                    >
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>

  );
}

export default ScanPreview;