import { useState, useEffect } from "react";
import { Globe, LoaderCircle } from "lucide-react";
import { scanWebsite, getScanHistory } from "../../services/api";

function ScanPreview(){

  const [url, setUrl] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const [scanHistory, setScanHistory] = useState([]);

  

  useEffect(() => {

    async function loadScanHistory(){
      try{
        const data = await getScanHistory();
        setScanHistory(data);

      } catch{
        setScanHistory([]);
      }
    }

    loadScanHistory();
  }, []);

  async function refreshScanHistory(){
    try{
      const data = await getScanHistory();
      setScanHistory(data);

    } catch{
      setScanHistory([]);
    }
  }

  async function handleScan(){
    setError("");

    if(!url.trim()){
      setScanResult(null);
      setError("Please enter a website URL");
      return;
    }

    setScanResult(null);
    setIsScanning(true);

    try{
      const data = await scanWebsite(url);
      setScanResult(data);
      refreshScanHistory();

    } catch (error){
      setScanResult(null);
      setError(error.message);

    } finally{
      setIsScanning(false);
    }
  }

  const score = scanResult?.accessibilityScore;
  const totalIssues = scanResult?.totalIssues;
  const shouldShowReport = scanResult && !error;
  const shouldShowEmptyState = !scanResult && !error;

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
              onChange={(event) => {
                setUrl(event.target.value)
                setError("");
              }}
              onKeyDown={(event) => {
                if(event.key === "Enter" && !isScanning){
                  handleScan();
                }
              }}
              placeholder="https://example.com"
              className="w-full bg-transparent outline-none"            
            />
            
          </div>

          <button 
            onClick={handleScan}
            disabled={isScanning || !url.trim()}
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

          {shouldShowEmptyState &&(
            <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-12 px-6 text-center">
              <h3 className="text-xl font-bold text-gray-900">
                No Scan Report yet
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600">
                Enter a website URL and click Scan to generate an accessibility report.
              </p>
            </div>
          )}

          {shouldShowReport && (

            <>
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
            </>

          )}

          {scanHistory.length > 0 &&(

            <div className="mt-10 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-bold text-gray-900">
                Recent Scan
              </h3>

              <div className="mt-4 space-y-3">
                {scanHistory.map((scan) =>(
                  <div
                    key={scan.id}
                    className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div>
                      <p className="font-medium text-gray-900">
                        {scan.url}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Issues: {scan.totalIssues} <span>&bull;</span> Scanned:{" "}
                        {new Date(scan.scannedAt).toLocaleString()}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                      Score {scan.accessibilityScore}
                    </span>

                  </div>
                ))}
              </div>
            </div>

          )}

        </div>

      </div>
    </section>

  );
}

export default ScanPreview;