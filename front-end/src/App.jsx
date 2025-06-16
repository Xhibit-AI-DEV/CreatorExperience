import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/pages/Login";
import CreatorDashboard from "./components/pages/CreatorDashboard";
import Payout from "./components/pages/Payout";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/creator" element={<CreatorDashboard />} />
          <Route path="/payout" element={<Payout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
