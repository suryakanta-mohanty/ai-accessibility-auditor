import { useState, useEffect } from "react";
import { Globe, LoaderCircle } from "lucide-react";
import { scanWebsite, getScanHistory } from "../../services/api";

function ScanPreview(){

  const [url, setUrl] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const [scanHistory, setScanHistory] = useState([]);
  const [activeIssueTab, setActiveIssueTab] = useState("");

  

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
    setActiveIssueTab("");

    if(!url.trim()){
      setScanResult(null);
      setActiveIssueTab("");
      setError("Please enter a website URL");
      return;
    }

    setScanResult(null);
    setActiveIssueTab("");
    setIsScanning(true);

    try{
      const data = await scanWebsite(url);
      setScanResult(data);

      const issueGroups = data.issues.reduce((groups, issue) => {
        if(!groups[issue.type]){
          groups[issue.type] = [];
        }

        groups[issue.type].push(issue);
        return groups;
      }, {});

      const defaultTab = Object.entries(issueGroups)
        .map(([type, issues]) => ({
          type,
          count: issues.length,
        }))
        .sort((a, b) => b.count - a.count)[0]?.type || "";
      
      setActiveIssueTab(defaultTab);
      refreshScanHistory();

    } catch (error){
      setScanResult(null);
      setActiveIssueTab("");
      setError(error.message);

    } finally{
      setIsScanning(false);
    }
  }

  const score = scanResult?.accessibilityScore;
  const totalIssues = scanResult?.totalIssues;
  const shouldShowReport = scanResult && !error;
  const shouldShowEmptyState = !scanResult && !error;

  const issueTypeLabels = {
    IMAGE: "Images",
    BUTTON: "Buttons",
    LINK: "Links",
    PAGE: "Pages",
  };

  const groupedIssues = scanResult?.issues?.reduce((groups, issue) =>{
    if(!groups[issue.type]){
      groups[issue.type] = [];
    }

    groups[issue.type].push(issue);
    return groups;
  }, {}) || {};

  const issueTabs = Object.entries(groupedIssues)
    .map(([type, issues]) => ({
      type,
      label: issueTypeLabels[type] || type,
      count: issues.length,
    }))
    .filter((tab) => tab.count > 0)
    .sort((a, b) => b.count - a.count);

  const allIssuesTab = scanResult?.totalIssues > 0
    ?{
      type: "ALL",
      label: "All",
      count: scanResult?.totalIssues,
    }
    : null;

  const visibleIssueTabs = allIssuesTab
    ? [...issueTabs, allIssuesTab]
    : issueTabs;
  
  const selectedIssueType = activeIssueTab || issueTabs[0]?.type || "";

  const visibleIssues = selectedIssueType === "ALL"
    ? scanResult?.issues || []
    : groupedIssues[selectedIssueType] || [];
  
  const scoreStatus = score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Needs Improvement";
  const scoreStatusColor = score >= 90 ? "text-green-600" : score >= 70 ? "text-blue-600" : "text-red-600";
  const scoreBarColor = score >= 90 ? "bg-green-600" : score >= 70 ? "bg-blue-600" : "bg-red-600";

  return(

    <section id="scan-preview" className="px-6 py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

        {/* Browser Bar */}
        <div className="flex flex-col gap-5 border-b border-gray-200 bg-gray-50 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-2">

            <div className="h-3.5 w-3.5 rounded-full bg-red-400"></div>
            <div className="h-3.5 w-3.5 rounded-full bg-yellow-400"></div>
            <div className="h-3.5 w-3.5 rounded-full bg-green-400"></div>

          </div>

          <div className="flex w-full items-center gap-2 rounded-lg bg-white px-4 py-4 text-sm text-gray-500 shadow-sm lg:max-w-xl">
            <Globe size={16} className="shrink-0" />
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

                  <p className={`mt-2 font-semibold ${scoreStatusColor}`}>
                    {scoreStatus}
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
                      className={`h-full rounded-full transition-all duration-700 ${scoreBarColor}`}
                      style={{width: `${score}`}}
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
              {scanResult && scanResult.totalIssues === 0 && (
                <div className="mt-10 rounded-xl border border-gray-100 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
                  No accessibility issues found by the basic scanner.
                </div>
              )}

              {scanResult && scanResult.totalIssues > 0 && (
                <div className="mt-10">
                  <div className="flex flex-wrap gap-3">
                    {visibleIssueTabs.map((tab) =>(
                      <button
                        key={tab.type}
                        onClick={() => setActiveIssueTab(tab.type)}
                        className={`rounded-lg cursor-pointer px-4 py-2 text-sm font-semibold border border-gray-200 transition-all duration-300 ${
                          selectedIssueType === tab.type
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 "
                        }`}
                      >
                        {tab.label} {tab.count}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 space-y-4">
                    {visibleIssues.map((issue, index) => (
                      <div
                        key={`${issue.type}-${index}`}
                        className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                      >

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                              {issueTypeLabels[issue.type] || issue.type}
                            </span>

                            <h3 className="mt-3 text-base font-bold text-gray-900">
                              {issue.message}
                            </h3>

                            <p className="mt-2 break-all rounded-lg bg-red-100 px-3 py-2 text-sm text-gray-600">
                              Element: {issue.element}
                            </p>

                          </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
                          <p className="text-sm font-semibold text-green-700">
                            Recommendation
                          </p>

                          <p className="mt-1 text-sm leading-6 text-green-700">
                            {issue.recommendation}
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>

          )}

          {scanHistory.length > 0 &&(

            <div className="mt-10 border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Scan
                </h3>

                <span className="text-sm font-medium text-gray-500">
                  Latest 3
                </span>
              </div>

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