// pages/NotificationsPage.jsx
import React from 'react';
import { Bell, MoreHorizontal } from 'lucide-react';
import Card from '../components/Card';

const NotificationsPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="space-y-4 max-w-sm mx-auto">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">-</span>
            </div>
            <span className="font-medium">Nike store</span>
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-right">
            <div className="font-bold">-27.50</div>
            <div className="text-xs text-gray-500">Visas</div>
          </div>
        </div>
        <div className="text-sm text-gray-500">6 months of promotions</div>
      </Card>
      
      <Card>
        <div className="flex items-center justify-between">
          <span className="font-medium">All your notifications are<br />well turned on</span>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="bg-black text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              3
            </div>
          </div>
        </div>
      </Card>
    </div>
    
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
      <button 
        onClick={() => onNavigate('weather')}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        Next →
      </button>
    </div>
  </div>
);

export default NotificationsPage;