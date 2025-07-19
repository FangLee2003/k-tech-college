import React from "react";

const AccessoriesSection = () => {
  const accessories = [
    {
      id: 1,
      name: "Cáp chuyển đổi USB-C sang SD",
      price: "1.290.000đ",
      originalPrice: "790.000đ",
      discount: "-25%",
      image: "images/accessories/1.jpg",
    },
    {
      id: 2,
      name: "Adapter sạc Apple Type C 20W",
      price: "520.000đ",
      image: "images/accessories/2.png",
    },
    {
      id: 3,
      name: "Cáp sạc Lightning 2m",
      price: "840.000đ",
      image: "images/accessories/3.jpg",
    },
    {
      id: 4,
      name: "AirPods 3",
      price: "890.000đ",
      originalPrice: "1.450.000đ",
      discount: "-20%",
      image: "images/accessories/4.png",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Phụ kiện tương thích</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {accessories.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow relative"
          >
            {item.discount && (
              <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                {item.discount}
              </span>
            )}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-contain mb-3"
            />
            <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
              {item.name}
            </h3>
            <div className="flex flex-col">
              <span className="text-red-600 font-bold text-sm">
                {item.price}
              </span>
              {item.originalPrice && (
                <span className="text-gray-400 text-xs line-through">
                  {item.originalPrice}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesSection;
