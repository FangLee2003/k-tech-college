import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-3 px-6 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-blue-700 tracking-wide">Task Management</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">Welcome!</span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">U</div>
        </div>
      </header>
      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r shadow-sm py-6 px-4 hidden md:block">
          <nav className="flex flex-col gap-3">
            <a href="/tasks" className="text-blue-700 font-semibold hover:bg-blue-50 rounded px-3 py-2 transition">All Tasks</a>
            <a href="/my-tasks" className="text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded px-3 py-2 transition">My Tasks</a>
            <a href="/create-task" className="text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded px-3 py-2 transition">Create Task</a>
            <a href="/profile" className="text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded px-3 py-2 transition">Profile</a>
          </nav>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
