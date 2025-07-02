import React from 'react';
import { Minus, Menu, Check, Smile } from 'lucide-react';
import SearchInput from '../components/SearchInput';

const SearchPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="space-y-3 max-w-sm mx-auto">
      <SearchInput placeholder="" />
      <SearchInput placeholder="Search" />
      <SearchInput placeholder="Textfield" />
      <SearchInput 
        placeholder="Search in the web" 
        rightIcon={<Minus className="text-gray-500 w-3 h-3" />}
        rightIconBg="bg-gray-100"
      />
      <SearchInput 
        placeholder="Search crypto" 
        rightIcon={<Menu className="text-gray-500 w-3 h-3" />}
        rightIconBg="bg-gray-100"
      />
      <SearchInput 
        placeholder="Phone number" 
        icon={false}
        rightIcon={<Check className="text-white w-3 h-3" />}
        rightIconBg="bg-green-500"
      />
      <SearchInput 
        placeholder="Search in the web" 
        rightIcon={<Smile className="text-white w-3 h-3" />}
        rightIconBg="bg-yellow-400"
      />
    </div>
    
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
      <button 
        onClick={() => onNavigate('dashboard')}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        Next →
      </button>
    </div>
  </div>
);

export default SearchPage;