import React from "react";
import { ChevronRight, X } from "lucide-react";

const RecentlyViewed = () => {
  const recentItems = [
    {
      id: 1,
      name: "VIVO Y18 8GB/128GB",
      price: "4.410.000đ",
      image: "images/viewed.jpg",
    },
    {
      id: 2,
      name: "FESTINA 40 mm Nam F20007/2",
      price: "3.846.000đ",
      image: "images/viewed.jpg",
    },
    {
      id: 3,
      name: "Samsung Galaxy A55 5G 8GB/256GB",
      price: "Ngưng kinh doanh",
      image: "images/viewed.jpg",
    },
    {
      id: 4,
      name: "Samsung Galaxy A56 5G 12GB/256GB",
      price: "11.480.000đ",
      image: "images/viewed.jpg",
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Sản phẩm đã xem</h2>
        <span className="text-blue-600 text-sm hover:underline cursor-pointer">
          Xóa lịch sử
        </span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {recentItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-3 min-w-[200px] hover:shadow-md transition-shadow relative"
          >
            <button className="absolute top-2 right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
              <X className="w-3 h-3" />
            </button>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-24 object-contain mb-2"
            />
            <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
              {item.name}
            </h3>
            <span
              className={`text-sm font-bold ${
                item.price === "Ngưng kinh doanh"
                  ? "text-red-600"
                  : "text-black"
              }`}
            >
              {item.price}
            </span>
          </div>
        ))}
        <button className="min-w-[40px] h-full flex items-center justify-center text-gray-400 hover:text-gray-600">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default RecentlyViewed;
