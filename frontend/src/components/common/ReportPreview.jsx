import ReportItem from "./ReportItem";
import {
  CheckCircle2,
  AlertTriangle,
  CircleX,
  Sparkles,
} from "lucide-react";

function ReportPreview(){
  return(
    <section className="mx-auto max-w-7xl px-6 py-28">
      
      <div className="mb-16 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          AI Report Preview
        </span>

        <h2 className="mt-3 text-4xl font-bold">
          Understand Accessibility{" "}
          <span className="text-blue-600">Before You Deploy</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          A comprehensive accessibility report generated in seconds, with actionable insights powered by AI.
        </p>
      </div>

      {/* Heading */}
      <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>

            <h3 className="text-2xl font-bold">
              Accessibility Report
            </h3>

            <p className="text-gray-500">
              Overall website accessibility analysis
            </p>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">
              Score
            </p>

            <p className="text-5xl font-bold text-blue-600">
              94
            </p>

          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">

          <div className="mb-2 flex justify-between text-sm">

            <span>Overall Score</span>
            <span>94%</span>

          </div>

          <div className="h-3 rounded-full bg-gray-200">
            <div className="h-full w-[94%] rounded-full bg-blue-600 transition-all duration-700"></div>
          </div>

        </div>

        {/* Report Item */}
        <div className="space-y-4">

          <ReportItem 
            icon={<CheckCircle2 size={20} />}
            title="Images have descriptive alt text"
            status="Passed"
            statusColor="text-green-600"
            iconBgColor="bg-green-100"
          />

          <ReportItem 
            icon={<AlertTriangle size={20} />}
            title="Low contrast detected on 2 buttons"
            status="Warning"
            statusColor="text-yellow-600"
            iconBgColor="bg-yellow-100"
          />

          <ReportItem 
            icon={<CircleX size={20} />}
            title="3 form inputs are missing labels"
            status="Failed"
            statusColor="text-red-600"
            iconBgColor="bg-red-100"
          />

          <ReportItem
            icon={<Sparkles size={20} />}
            title="AI Recommendation"
            status="Improve heading hierarchy"
            statusColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />

        </div>

        {/* Al Recommendation */}

      </div>

      {/* Report Card */}

    </section>
  );
}

export default ReportPreview;