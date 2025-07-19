import React from 'react';

const StatusBar: React.FC = () => {
    return (
        <div className="flex justify-between items-center px-6 py-2 text-white text-sm font-medium">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                    <div className="w-1 h-3 bg-white rounded-full"></div>
                    <div className="w-1 h-3 bg-white rounded-full"></div>
                    <div className="w-1 h-3 bg-white rounded-full"></div>
                    <div className="w-1 h-3 bg-white/60 rounded-full"></div>
                </div>
                <div className="w-4 h-2 border border-white rounded-sm">
                    <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                </div>
            </div>
        </div>
    );
};

export default StatusBar;