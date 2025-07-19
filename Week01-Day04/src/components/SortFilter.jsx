import React from "react";
import { ChevronDown, X } from "lucide-react";

const SortFilter = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = React.useState(false);

  const sortOptions = [
    "Sản phẩm nổi bật",
    "Giá từ thấp đến cao",
    "Giá từ cao đến thấp",
  ];

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400"
        >
          <span className="text-sm">Bộ nhớ trong</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowPriceDropdown(!showPriceDropdown)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400"
        >
          <span className="text-sm">Sắp xếp</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showPriceDropdown && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="p-2">
              {sortOptions.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded"
                  onClick={() => setShowPriceDropdown(false)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPriceDropdown(false)}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortFilter;
