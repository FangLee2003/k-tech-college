import React from 'react';
import { Star } from 'lucide-react';

const RatingFilter = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm">Chọn đánh giá của bạn</span>
      <div className="flex items-center gap-1">
        {renderStars(4)}
      </div>
      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Bình thường</span>
    </div>
  );
};

export default RatingFilter;