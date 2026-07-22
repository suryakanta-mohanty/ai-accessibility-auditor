import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { getScanReportById } from "../../services/api";

function Report(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIssueTab, setActiveIssueTab] = useState("ALL");

  useEffect(() =>{
    async function fetchReport(){
      try{
        setError("");
        setIsLoading(true);
        const data = await getScanReportById(id);
        setReport(data);

      } catch(error){
        setError(error.message);

      } finally{
        setIsLoading(false);
      }
    }

    fetchReport();
  }, [id]);

  if(isLoading){
    return(
      <section className="min-h-screen bg-gray-50 px-6 py-28">
        <div className="mx-auto flex max-w-4xl items-center justify-center rounded-3xl bg-white p-10 shadow-sm">
          <LoaderCircle className="mr-3 h-6 w-6 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading Report...</p>
        </div>
      </section>
    );
  }

  if(error){
    return(
      <section className="min-h-screen bg-gray-50 px-6 py-28">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-sm">
          <p className="font-semibold text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </section>
    );
  }

  function getSeverityClasses(severity){
    if(severity === "HIGH"){
      return "bg-red-100 text-red-700"
    }

    if(severity === "MEDIUM"){
      return "bg-yellow-100 text-yellow-700"
    }

    return "bg-blue-100 text-blue-700"
  }

  function getIssueTypeLabel(type){
    const issueTypeLabels = {
      IMAGE: "Images",
      BUTTON: "Buttons",
      LINK: "Links",
      PAGE: "Pages",
      FORM: "Forms",
      HEADING: "Headings",
      IFRAME: "Iframes",
    };

    return issueTypeLabels[type] || type;
  }

  const groupedIssues = report?.issues?.reduce((groups, issue) =>{
    if(!groups[issue.type]){
      groups[issue.type] = [];
    }

    groups[issue.type].push(issue);
    return groups;

  }, {}) || {};

  const issueTabs = Object.entries(groupedIssues)
    .map(([type, issues]) => ({
      type,
      label: getIssueTypeLabel(type),
      count: issues.length,

    })).sort((a, b) => b.count - a.count);
  
  const visibleIssueTabs = report?.totalIssues > 0
    ? [
      {
        type: "ALL",
        label: "All",
        count: report.totalIssues,
      },
      ...issueTabs,

    ] : [];
  
  const visibleIssues = activeIssueTab === "ALL"  
    ? report?.issues || []
    : groupedIssues[activeIssueTab] || [];
  
  return(
    <section className="min-h-screen bg-gray-50 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 cursor-pointer text-sm font-semibold text-blue-600 transition-all duration-300 rounded-lg hover:text-blue-700 hover:bg-blue-100 p-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Saved Accessibility Report
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Scan Report
          </h1>

          <p className="mt-3 break-all text-gray-600">
            {report.url}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-700">Score</p>
              <p className="mt-2 text-4xl font-bold text-blue-700">
                {report.accessibilityScore}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm font-medium text-red-700">Total Issues</p>
              <p className="mt-2 text-4xl font-bold text-red-700">
                {report.totalIssues}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm font-medium text-gray-600">Scanned At</p>
              <p className="mt-2 text-sm font-semibold text-gray-900">
                {new Date(report.scannedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900">
              Issues Found
            </h2>

            {visibleIssueTabs.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {visibleIssueTabs.map((tab) => (
                  <button
                    key={tab.type}
                    type="button"
                    onClick={() => setActiveIssueTab(tab.type)}
                    className={`rounded-lg cursor-pointer border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      activeIssueTab === tab.type
                      ? "border-blue-600 bg-blue-600 text-white shadow-md"
                      : "border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label} {tab.count}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-5 space-y-4">
              {visibleIssues.map((issue, index) => (
                <div
                  key={`${issue.type} - ${index}`}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {getIssueTypeLabel(issue.type)}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityClasses(issue.severity)}`}
                    >
                      {issue.severity}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-gray-900">
                    {issue.message}
                  </h3>

                  <p className="mt-2 break-all rounded-lg bg-red-100 px-3 py-2 text-sm text-gray-600">
                    Element: {issue.element}
                  </p>

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
        </div>
      </div>
    </section>
  );
}

export default Report;