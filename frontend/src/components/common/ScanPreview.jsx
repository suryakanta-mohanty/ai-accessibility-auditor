import { Globe } from "lucide-react";

function ScanPreview(){
  return(

    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

        {/* Browser Bar */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-5">

          <div className="flex items-center gap-2">

            <div className="h-3.5 w-3.5 rounded-full bg-red-400"></div>
            <div className="h-3.5 w-3.5 rounded-fulll bg-yellow-400"></div>
            <div className="h-3.5 w-3.5 rounded-full bg-green-400"></div>

          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-sm text-gray-500 shadow-sm">
            <Globe size={16} />
            <span>https://demo.mywebsite.com</span>
          </div>

          <button className="rounded-lg bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700">
            Scan
          </button>

        </div>

        {/* Report */}
        <div className="p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Accessibility Report
          </h2>

          {/* Left */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Accessibility Score
              </p>

              <h3 className="mt-3 text-6xl font-bold">
                95
              </h3>

              <p className="mt-2 text-green-600 font-semibold">
                Excellent
              </p>

            </div>

            {/* Right */}
            <div>

              <div className="mb-3 flex justify-between">

                <span className="font-medium">
                  Overall Score
                </span>

                <span>
                  95%
                </span>

              </div>

              <div className="h-4 overflow-hidden rounded-full bg-gray-200">

                <div className="h-full w-[95%] rounded-full bg-blue-600"></div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>

  );
}

export default ScanPreview;