import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Users from "./users/pages/Users";
import Businesses from "./businesses/pages/Businesses";

import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
