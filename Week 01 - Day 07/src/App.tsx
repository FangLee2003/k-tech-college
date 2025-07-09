import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Users,
  BarChart3,
  Map,
  Building2,
  UserCheck,
  Clock,
  Settings,
  Search,
  Bell
} from 'lucide-react';
import ProductListing from "./pages/AfternoonPractices";

// Page Components
const PatientsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-800">Patients Page</h1>
  </div>
);

const OverviewPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-800">Overview Page</h1>
  </div>
);

const MapPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-800">Map Page</h1>
  </div>
);

const DepartmentsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-800">Departments Page</h1>
  </div>
);

const DoctorsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-800">Doctors Page</h1>
  </div>
);

const HistoryPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-800">History Page</h1>
  </div>
);

const SettingsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-800">Settings Page</h1>
  </div>
);

// Sidebar Component
const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Patients', path: '/dashboard/patients', icon: Users },
    { name: 'Overview', path: '/dashboard/overview', icon: BarChart3 },
    { name: 'Map', path: '/dashboard/map', icon: Map },
    { name: 'Departments', path: '/dashboard/departments', icon: Building2 },
    { name: 'Doctors', path: '/dashboard/doctors', icon: UserCheck },
    { name: 'History', path: '/dashboard/history', icon: Clock },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">+</span>
          </div>
          <span className="text-xl font-semibold text-gray-800">H-care</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${isActive
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

// Header Component
const Header = () => (
  <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
          <Bell size={20} />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">EK</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Emma Kwan</span>
        </div>
      </div>
    </div>
  </header>
);

// Main Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  </div>
);

// Main App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListing />} />

        <Route path="/dashboard/*" element={
          <Layout>
            <Routes>
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;