import React from 'react';

interface TaskManagementLayoutProps {
  children: React.ReactNode;
}

export default function TaskManagementLayout({ children }: TaskManagementLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}

