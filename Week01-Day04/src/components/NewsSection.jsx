// components/NewsSection.jsx
import React from 'react';

const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
      views: "140 lượt xem",
      image: "images/news/1.jpg"
    },
    {
      id: 2,
      title: "Google Pixel 5a dự kiến sẽ được ra mắt cùng thời điểm với Android 12",
      views: "127 lượt xem",
      image: "images/news/2.jpg"
    },
    {
      id: 3,
      title: "Galaxy A52 4G lộ diện trên Google Play Console Xác nhận dùng chip Snapdragon 720",
      views: "55 lượt xem",
      image: "images/news/3.jpg"
    },
    {
      id: 4,
      title: "Galaxy A82 5G chuẩn bị ra mắt với chip flagship và màn hình trượt độc đáo, Samfans gom lúa đi là vừa",
      views: "55 lượt xem",
      image: "images/news/4.jpg"
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">TIN MỚI</h2>
        <span className="text-blue-600 text-sm hover:underline cursor-pointer">Xem thêm</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-3 leading-tight">
                {item.title}
              </h3>
              <span className="text-xs text-orange-500">{item.views}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;