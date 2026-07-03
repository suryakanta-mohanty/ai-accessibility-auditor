  import { Plus, Minus } from "lucide-react";

  function FQAItem({
    question,
    answer,
    isOpen,
    onClick,
  }) {
    return(
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md"> 
        
        <button 
          onClick={onClick}
          className="flex w-full cursor-pointer items-center justify-between px-7 py-6 text-left transition-colors duration-300 hover:bg-gray-50"
        >
          
          <h3 className="text-lg font-semibold text-gray-900">
            {question}
          </h3>

          {/* Icon */}
          {
            isOpen ? (
              <Minus 
                size={22}
                className="text-blue-600 transition-transform duration-300"
              />
            ) : (
              <Plus 
                size={22}
                className={`text-blue-600 transition-transform duration-300`}
              />
            )
          }
          
        </button>

        {
          isOpen && (
            <div className="border-t border-gray-200 px-7 pb-7 pt-5">
              <p className="leading-7 text-gray-600">
                {answer}
              </p>
            </div>
          )
        }

      </div>
    );
  }

  export default FQAItem;