import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AfternoonPractices from "./pages/AfternoonPractices";
import HomeworkPractices from "./pages/HomeworkPractices";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AfternoonPractices />} />
        <Route path="/homework" element={<HomeworkPractices />} />
      </Routes>
    </Router>
  );
};

export default App;
