import React from "react";
import { Star } from "lucide-react";

const DealOfTheDay = () => {
  const deals = [
    {
      id: 1,
      name: "LG White Front Load Steam Washer",
      price: "$1,422.7",
      originalPrice: "$1,025.5",
      discount: "-39%",
      discountPercent: "18% off",
      rating: 4,
      sold: 10,
      image: "images/deals/1.jpg",
      shop: "YOUNG SHOP",
    },
    {
      id: 2,
      name: "Edifier Powered Bookshelf Speakers",
      price: "$96",
      originalPrice: "$85",
      discount: "-13%",
      discountPercent: "18% off",
      rating: 4,
      sold: 15,
      image: "images/deals/2.jpg",
      shop: "YOUNG SHOP",
    },
    {
      id: 3,
      name: "Amcrest Security Camera in White Color",
      price: "$62.99",
      originalPrice: "$45.9",
      discount: "-37%",
      discountPercent: "18% off",
      rating: 4,
      sold: 20,
      image: "images/deals/3.jpg",
      shop: "YOUNG SHOP",
    },
    {
      id: 4,
      name: "Grand Slam Indoor Of Show Jumping Novel",
      price: "$41.99",
      originalPrice: "$32.99",
      discount: "-27%",
      discountPercent: "18% off",
      rating: 4,
      sold: 22,
      image: "images/deals/4.jpg",
      shop: "YOUNG SHOP",
    },
    {
      id: 5,
      name: "Sound Intone I65 Earphone White Version",
      price: "$106.96",
      originalPrice: "$108.90",
      discount: "-6%",
      discountPercent: "18% off",
      rating: 4,
      sold: 10,
      image: "images/deals/5.jpg",
      shop: "YOUNG SHOP",
    },
    {
      id: 6,
      name: "Korea Long Sofa Fabric In Blue Navy Color",
      price: "$670.2",
      originalPrice: "$567.8",
      discount: "-18%",
      discountPercent: "18% off",
      rating: 4,
      sold: 79,
      image: "images/deals/6.jpg",
      shop: "YOUNG SHOP",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Deal of the day</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">End in:</span>
          <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">
            6:17:17:39
          </span>
        </div>
        <span className="text-blue-600 text-sm hover:underline cursor-pointer">
          View all
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {deals.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow relative"
          >
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded z-10">
              {item.discount}
            </span>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <span className="text-xs text-gray-500 mb-1 block">
                {item.shop}
              </span>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-green-600 font-bold text-lg">
                  {item.price}
                </span>
                <span className="text-gray-400 text-sm line-through">
                  {item.originalPrice}
                </span>
                <span className="text-orange-500 text-xs">
                  {item.discountPercent}
                </span>
              </div>
              <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 leading-tight">
                {item.name}
              </h3>
              <div className="flex items-center gap-1 mb-2">
                {renderStars(item.rating)}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${(item.sold / 100) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">Sold: {item.sold}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealOfTheDay;
