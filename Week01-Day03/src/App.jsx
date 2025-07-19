import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import DashboardPage from "./pages/DashboardPage";
import ContactsPage from "./pages/ContactsPage";
import NotificationsPage from "./pages/NotificationPage";
import TeamsPage from "./pages/TeamsPage";
import WeatherPage from "./pages/WeatherPage";

const App = () => {
  return (
    <Router>
      <div className="max-w-sm mx-auto bg-white min-h-screen border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
