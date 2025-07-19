'use client';
// (client)/layout.tsx;
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface TaskManagementLayoutProps {
  children: React.ReactNode;
}

export default function TaskManagementLayout({
  children,
}: TaskManagementLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto p-4">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}