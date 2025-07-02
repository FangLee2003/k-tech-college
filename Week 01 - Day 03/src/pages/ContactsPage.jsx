import React from 'react';
import { Camera, Phone } from 'lucide-react';
import Card from '../components/Card';
import Avatar from '../components/Avatar';

const ContactsPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="space-y-4 max-w-sm mx-auto">
      <Card className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="w-12 h-12" bg="bg-yellow-400">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          </Avatar>
          <div>
            <div className="font-medium">Yolanda</div>
            <div className="text-sm text-gray-500">Web Development</div>
          </div>
        </div>
        <Camera className="w-6 h-6 text-gray-400" />
      </Card>
      
      <Card className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="w-12 h-12">
            <div className="w-full h-full bg-gray-400"></div>
          </Avatar>
          <div className="font-medium">Maria</div>
        </div>
        <Phone className="w-6 h-6 text-gray-400" />
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

export default ContactsPage;