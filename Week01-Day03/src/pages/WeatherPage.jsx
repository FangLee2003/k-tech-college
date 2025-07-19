// pages/WeatherPage.jsx
import React from 'react';
import { Sun, Calendar, MoreHorizontal } from 'lucide-react';
import Card from '../components/Card';
import Avatar from '../components/Avatar';

const WeatherPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="space-y-4 max-w-sm mx-auto">
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar size="w-10 h-10" bg="bg-teal-400">
              <div className="w-6 h-6 bg-teal-600 rounded"></div>
            </Avatar>
            <div>
              <div className="font-medium">Landscape</div>
              <div className="text-sm text-gray-500">423Km</div>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </Card>
      
      <Card className="bg-yellow-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar size="w-10 h-10" bg="bg-teal-400">
              <div className="w-6 h-6 bg-teal-600 rounded"></div>
            </Avatar>
            <div>
              <div className="font-medium">Falset Mountains</div>
              <div className="text-sm text-gray-500">423Km, 3 Week</div>
            </div>
          </div>
          <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🗻</span>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sun className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="font-medium">Great day to schedule</div>
              <div className="text-sm text-gray-500">Lorem ipsum dolor sitamet</div>
            </div>
          </div>
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">▶</span>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="flex justify-between mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
            <div key={day} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{day}</div>
              <Sun className="w-6 h-6 text-yellow-500 mx-auto" />
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="bg-gradient-to-r from-red-400 to-pink-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">32°</div>
            <div className="text-sm opacity-90">Seatle</div>
            <div className="text-xs opacity-75">Cloudy</div>
          </div>
          <div className="text-4xl">🌤️</div>
        </div>
      </Card>
      
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-medium">Great day to schedule</div>
            <div className="text-sm text-gray-500">Your usual hours</div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex justify-between text-center">
          {[
            { time: '09:27 PM', icon: '☀️' },
            { time: '06:00 AM', icon: '🌅' },
            { time: '07:30 PM', icon: '⭐' },
            { time: '12:00 PM', icon: '☀️' },
            { time: '04:00 PM', icon: '🌅' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="text-xs text-gray-500">{item.time}</div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-pink-500 font-bold text-lg">Jun</div>
            <div className="text-pink-500 font-bold text-2xl">23</div>
          </div>
          <div>
            <div className="font-medium">Wednesday</div>
            <div className="text-sm text-gray-500">08:00 PM - 18:30 PM</div>
          </div>
        </div>
      </Card>
    </div>
    
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
      <button 
        onClick={() => onNavigate('login')}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        Back to Start
      </button>
    </div>
  </div>
);

export default WeatherPage;