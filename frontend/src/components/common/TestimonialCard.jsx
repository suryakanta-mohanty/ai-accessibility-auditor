import { Star } from "lucide-react";

function TestimonialCard({
  name,
  role,
  company,
  review,
  initials,
}) {
  return(
    <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-xl hover:border-blue-300 overflow-hidden">
      
      {/* User */}
      <div className="flex items-center gap-5">
        
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 font-bold text-white shadow-md">
          {initials}
        </div>

        <div className="">

          <div className="flex items-center justify-between gap-3">

            <h4 className="text-lg font-bold text-gray-900">
              {name}
            </h4>

            {/* Stars */}
            <div className="flex shrink-0 gap-1 text-yellow-500">
              {[...Array(5)].map((_, index) =>(
                <Star 
                  key={index}
                  size={14}
                  fill="currentColor"
                />
              ))}

            </div>

          </div>

          <p className="text-sm text-gray-500">
            {role}
            <span className="mx-2 font-extrabold">&middot;</span>
            {company}
          </p>

        </div>

      </div>
      
      {/* Review */}
      <p className="mt-5 border-t border-gray-100 pt-5 text-[15px] italic leading-6 text-gray-600">
        "{review}"
      </p>

    </div>
  );
}

export default TestimonialCard;