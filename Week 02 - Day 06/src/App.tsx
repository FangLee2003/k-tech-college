import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customers from "./pages/HomeworkPractices";
import WeatherApp from "./pages/AfternoonPractices";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/weather" element={<WeatherApp />} />
      </Routes>
    </Router>
  );
};

export default App;
