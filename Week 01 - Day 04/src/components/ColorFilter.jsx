import React from "react";

const ColorFilter = () => {
  const colors = [
    { name: "Đen", active: true, color: "bg-black" },
    { name: "Hồng", active: false, color: "bg-pink-400" },
    { name: "Xanh", active: false, color: "bg-blue-400" },
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm">Màu:</span>
      {colors.map((color) => (
        <button
          key={color.name}
          className={`px-3 py-1 text-xs rounded border ${
            color.active
              ? "border-orange-500 text-orange-500 bg-orange-50"
              : "border-gray-300 text-gray-700 hover:border-orange-500"
          }`}
        >
          {color.name}
        </button>
      ))}
    </div>
  );
};

export default ColorFilter;
