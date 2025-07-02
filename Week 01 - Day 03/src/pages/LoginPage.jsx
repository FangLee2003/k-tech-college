import React from 'react';
import Button from '../components/Button';

const LoginPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6 flex flex-col justify-center">
    <div className="space-y-4 max-w-sm mx-auto w-full">
      <Button onClick={() => onNavigate('search')}>
        Get started <span>→</span>
      </Button>
      
      <Button onClick={() => onNavigate('search')}>
        <div className="flex items-center gap-3">
          <span className="text-xl">🍎</span>
          Continue with Apple
        </div>
      </Button>
      
      <Button variant="secondary" onClick={() => onNavigate('search')}>
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-500">G</span>
          Continue with Google
        </div>
      </Button>
      
      <Button variant="secondary" onClick={() => onNavigate('search')}>
        <div className="flex items-center gap-3">
          <span className="text-xl text-blue-600">f</span>
          Continue with Facebook
        </div>
      </Button>
    </div>
  </div>
);

export default LoginPage;