import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Card from '../components/Card';
import Avatar from '../components/Avatar';

const DashboardPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="space-y-4 max-w-sm mx-auto">
      <Card className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="w-8 h-8" bg="bg-red-500">
            <span className="text-white text-xs font-bold">T</span>
          </Avatar>
          <span className="font-medium">Spain</span>
          <span className="text-yellow-500">⚽</span>
        </div>
        <div className="text-lg font-bold">0 : 0</div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
          <span className="font-medium">France</span>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-400" />
      </Card>
      
      <Card className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="w-8 h-8" bg="bg-red-600">
            <span className="text-white text-xs">MU</span>
          </Avatar>
          <span className="font-medium">Manchester United</span>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-400" />
      </Card>
      
      <Card className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <div className="w-full h-full bg-gray-400"></div>
          </Avatar>
          <div>
            <div className="font-medium">Wade Warren</div>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span className="text-blue-600 font-bold">VISA</span>
              <span>4293 3242 ****</span>
            </div>
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-xs">👁</span>
        </div>
      </Card>
      
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-4">
            <span className="font-medium border-b-2 border-black pb-1">Highlight</span>
            <span className="text-gray-500">Feeds</span>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <div className="font-medium mb-1">Dashboard</div>
          <div className="text-sm text-gray-500 mb-3">Business management service</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
          </div>
          <div className="text-right text-sm font-medium">80%</div>
        </div>
      </Card>
    </div>
    
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
      <button 
        onClick={() => onNavigate('contacts')}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        Next →
      </button>
    </div>
  </div>
);

export default DashboardPage;