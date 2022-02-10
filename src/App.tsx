import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserDashboard from "./users/pages/UserDashboard";
import Businesses from "./businesses/pages/Businesses";
import NavLinks from "./shared/components/navigation/NavLinks";
import Auth from "./users/pages/Auth";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavLinks />
      <Routes>
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/users" element={<UserDashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
