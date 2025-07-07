// components/Error.tsx
import React from 'react';

interface ErrorProps {
  message: string;
  onRetry: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-400 to-red-600">
      <div className="text-center px-6">
        <p className="text-white text-lg mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/30 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;