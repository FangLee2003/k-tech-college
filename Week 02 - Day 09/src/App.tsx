import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./pages/AfternoonPractices/SignInSignUp";
import RegistrationForm from "./pages/AfternoonPractices/Register";
import LoginForm from "./pages/AfternoonPractices/Login";
import UserRegistrationForm from "./pages/HomeworkPractices";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user-registration" element={<UserRegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
