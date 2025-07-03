import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AfternoonPractices from "./pages/AfternoonPractices";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AfternoonPractices />} />
      </Routes>
    </Router>
  );
};

export default App;
