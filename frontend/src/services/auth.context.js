import React, { useState, useEffect, createContext } from "react";
import { useLocation, useNavigate } from "react-router";

import AuthService from "./auth.service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [error, setError] = useState(null);

  //* Save user data to localStorage to persist on page refresh
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    setIsLoading(false);
    setError(null);
  }, [location]);

  async function onRegister(data) {
    try {
      setIsLoading(true);
      const res = await AuthService.register(data);
      const currentUser = res.data;

      setUser(currentUser);
      setIsLoading(false);
      navigate("/campgrounds", {
        state: { type: "success", message: "Welcome to YelpCamp!" },
        replace: true,
      });
    } catch (err) {
      setError(err.response.data.errorMsg);
      setIsLoading(false);
    }
  }

  async function onLogin(data, from = "/campgrounds") {
    try {
      setIsLoading(true);
      const res = await AuthService.login(data);
      const currentUser = res.data;

      setUser(currentUser);
      setIsLoading(false);
      console.log(from);
      navigate(from, {
        state: {
          type: "success",
          message: `Welcome back, ${currentUser.username}!`,
        },
        replace: true,
      });
    } catch (err) {
      setError("Invalid username or password.");
      setIsLoading(false);
    }
  }

  async function onLogout(data) {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setUser(null);
      setIsLoading(false);
      navigate("/campgrounds", {
        state: { type: "success", message: "Successfully logged out." },
      });
    } catch (err) {
      setError(err.toString());
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        onRegister,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
