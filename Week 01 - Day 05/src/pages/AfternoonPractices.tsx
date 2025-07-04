import { useState } from 'react';

export default function AfternoonPractices() {
  // Exercise 1: Button Click Counter
  const [clickCount, setClickCount] = useState(0);

  // Exercise 2: Input Field Tracker
  const [inputValue, setInputValue] = useState('');

  // Exercise 3: Toggle Switch
  const [isOn, setIsOn] = useState(false);

  // Exercise 4: Hover Highlight
  const [isHovered, setIsHovered] = useState(false);

  // Exercise 5: Form Submission
  const [formInput, setFormInput] = useState('');

  // Exercise 6: Key Press Display
  const [lastKey, setLastKey] = useState('');

  // Exercise 7: Double Click Message
  const [showDoubleClick, setShowDoubleClick] = useState(false);

  // Exercise 8: Dropdown Selection
  const [selectedFruit, setSelectedFruit] = useState('');

  // Exercise 9: Checkbox Toggle
  const [isChecked, setIsChecked] = useState(false);

  // Exercise 10: Search Filter
  const [searchTerm, setSearchTerm] = useState('');
  const items = ["Apple", "Banana", "Orange", "Grapes", "Pineapple"];

  // Exercise 5: Form submission handler
  const handleFormSubmit = () => {
    if (formInput.trim()) {
      alert(`You submitted: ${formInput}`);
      setFormInput('');
    }
  };

  // Exercise 7: Double click handler
  const handleDoubleClick = () => {
    setShowDoubleClick(true);
    setTimeout(() => setShowDoubleClick(false), 2000);
  };

  // Exercise 10: Filter items based on search
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Event Handling Practices</h1>
      
      {/* Exercise 1: Button Click Counter */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Exercise 1: Button Click Counter</h2>
        <button 
          onClick={() => setClickCount(clickCount + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Click Me
        </button>
        <p className="mt-2">Clicked: {clickCount} times</p>
      </div>

      {/* Exercise 2: Input Field Tracker */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Exercise 2: Input Field Tracker</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
          className="border rounded px-3 py-2 w-full"
        />
        <p className="mt-2">You typed: {inputValue || 'nothing'}</p>
      </div>

      {/* Exercise 3: Toggle Switch */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Exercise 3: Toggle Switch</h2>
        <button
          onClick={() => setIsOn(!isOn)}
          className={`px-4 py-2 rounded text-white ${isOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
        >
          Turn {isOn ? 'OFF' : 'ON'}
        </button>
        <p className="mt-2">State: {isOn ? 'ON' : 'OFF'}</p>
      </div>

      {/* Exercise 4: Hover Highlight */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Exercise 4: Hover Highlight</h2>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`p-4 border-2 rounded cursor-pointer transition-colors ${
            isHovered ? 'bg-yellow-200' : 'bg-white'
          }`}
        >
          Hover me!
        </div>
      </div>

      {/* Exercise 5: Form Submission Alert */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Exercise 5: Form Submission Alert</h2>
        <div className="space-y-2">
          <input
            type="text"
            value={formInput}
            onChange={(e) => setFormInput(e.target.value)}
            placeholder="Enter text to submit..."
            className="border rounded px-3 py-2 w-full"
          />
          <button
            onClick={handleFormSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Exercise 6: Key Press Display */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Exercise 6: Key Press Display</h2>
        <input
          type="text"
          onKeyDown={(e) => setLastKey(e.key)}
          placeholder="Press any key..."
          className="border rounded px-3 py-2 w-full"
        />
        <p className="mt-2">Last key: {lastKey || 'none'}</p>
      </div>

      {/* Exercise 7: Double Click Message */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Exercise 7: Double Click Message</h2>
        <button
          onDoubleClick={handleDoubleClick}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Double-click me
        </button>
        {showDoubleClick && (
          <p className="mt-2 text-green-600 font-semibold">Double-clicked!</p>
        )}
      </div>

      {/* Exercise 8: Dropdown Selection */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Exercise 8: Dropdown Selection</h2>
        <select
          value={selectedFruit}
          onChange={(e) => setSelectedFruit(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Select a fruit</option>
          <option value="Apple">Apple</option>
          <option value="Banana">Banana</option>
          <option value="Orange">Orange</option>
        </select>
        <p className="mt-2">Selected fruit: {selectedFruit || 'none'}</p>
      </div>

      {/* Exercise 9: Checkbox Toggle */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Exercise 9: Checkbox Toggle</h2>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Toggle me</span>
        </label>
        <p className="mt-2">Checkbox is: {isChecked ? 'checked' : 'unchecked'}</p>
      </div>

      {/* Exercise 10: Search Filter */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Exercise 10: Search Filter</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search fruits..."
          className="border rounded px-3 py-2 w-full mb-3"
        />
        <div className="space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded">
                {item}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items found</p>
          )}
        </div>
      </div>
    </div>
  );
}