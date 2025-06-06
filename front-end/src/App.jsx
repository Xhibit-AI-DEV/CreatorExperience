import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import CreatorDashboard from "./components/pages/CreatorDashboard";
import Payout from "./components/pages/Payout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/creator" element={<CreatorDashboard />} />
        <Route path="/payout" element={<Payout />} />
      </Routes>
    </Router>
  );
};

export default App;
