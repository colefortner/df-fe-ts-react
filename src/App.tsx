import React, { useCallback, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserDashboard from "./users/pages/UserDashboard";
import Businesses from "./businesses/pages/Businesses";
import BusinessShowPage from "./businesses/pages/BusinessShowPage";
import NavLinks from "./shared/components/navigation/NavLinks";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./users/pages/Auth";
import "./App.css";

const App: React.FC = () => {
  const [token, setToken] = useState<null | string>(null);
  const [userId, setUserId] = useState<null | string>(null);

  const login = useCallback((uid: string, token: string) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    // https://stackoverflow.com/questions/67700374/use-localstorage-getitem-with-typescript
    // had to rig with empty string, look into this later for better solution or understanding
    // of what is
    // const storedData = JSON.parse(localStorage.getItem("userData") || "");
    // found a better solution with the type check, but still go back when you have time
    const value = localStorage.getItem("userData");
    let storedData;
    if (typeof value === "string") {
      storedData = JSON.parse(value);
    }
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
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
