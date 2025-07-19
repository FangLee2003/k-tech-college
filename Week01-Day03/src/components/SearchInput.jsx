import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ placeholder, icon = true, rightIcon, rightIconBg }) => (
  <div className="relative">
    {icon && <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />}
    <input 
      className={`w-full bg-white py-4 rounded-2xl border-0 focus:outline-none ${icon ? 'pl-12' : 'pl-4'} pr-12`}
      placeholder={placeholder}
    />
    {rightIcon && (
      <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${rightIconBg}`}>
        {rightIcon}
      </div>
    )}
  </div>
);

export default SearchInput;