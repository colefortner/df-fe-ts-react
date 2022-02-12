import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserDashboard from "./users/pages/UserDashboard";
import Businesses from "./businesses/pages/Businesses";
import BusinessShowPage from "./businesses/pages/BusinessShowPage";
import NavLinks from "./shared/components/navigation/NavLinks";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./users/pages/Auth";
import "./App.css";

const App: React.FC = () => {
  return (
    <AuthContext.Provider value={{ isLoggedIn: false }}>
      <BrowserRouter>
        <NavLinks />
        <Routes>
          <Route path="businesses" element={<Businesses />} />
          <Route path=":businessId/businesses" element={<BusinessShowPage />} />
          <Route path="users" element={<UserDashboard />} />
          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/users" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
