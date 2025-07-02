import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');

  const navigate = (page) => setCurrentPage(page);

  const pages = {
    login: <LoginPage onNavigate={navigate} />,
    search: <SearchPage onNavigate={navigate} />,
    dashboard: <DashboardPage onNavigate={navigate} />,
    contacts: <ContactsPage onNavigate={navigate} />
  };

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
      {pages[currentPage]}
    </div>
  );
};

export default App;