import React from 'react';

const Avatar = ({ children, size = 'w-10 h-10', bg = 'bg-gray-300' }) => (
  <div className={`${size} ${bg} rounded-full flex items-center justify-center overflow-hidden`}>
    {children}
  </div>
);

export default Avatar;