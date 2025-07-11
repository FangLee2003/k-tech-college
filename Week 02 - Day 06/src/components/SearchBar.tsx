// components/SearchBar.tsx
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    const popularCities = [
        'Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hoi An', 'Nha Trang',
        'Tokyo', 'Seoul', 'Bangkok', 'Singapore', 'Kuala Lumpur',
        'Manila', 'Jakarta', 'New York', 'London', 'Paris',
        'Berlin', 'Sydney', 'Melbourne', 'Los Angeles', 'San Francisco'
    ];

    const filteredCities = popularCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
    );

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch();
            setShowSuggestions(false);
        }
    };

    const handleCitySelect = (city: string) => {
        onChange(city);
        setShowSuggestions(false);
        // Auto search when city is selected
        setTimeout(() => onSearch(), 100);
    };

    const handleInputFocus = () => {
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
        // Delay hiding suggestions to allow clicking
        setTimeout(() => setShowSuggestions(false), 150);
    };

    return (
        <div className="px-6 py-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Search cities..."
                    className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && value && filteredCities.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg max-h-48 overflow-y-auto z-10">
                        {filteredCities.slice(0, 8).map((city, index) => (
                            <div
                                key={index}
                                onClick={() => handleCitySelect(city)}
                                className="flex items-center px-4 py-3 hover:bg-white/20 cursor-pointer transition-colors border-b border-white/10 last:border-b-0"
                            >
                                <MapPin className="w-4 h-4 text-blue-600 mr-3" />
                                <span className="text-gray-800 font-medium">{city}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;