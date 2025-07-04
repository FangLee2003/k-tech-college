import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AfternoonPractices from "./pages/AfternoonPractices";
import Calculator from "./pages/HomeworkPractices/Calculator";
import UserRegistrationForm from "./pages/HomeworkPractices/UserRegistrationForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AfternoonPractices />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/register" element={<UserRegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
