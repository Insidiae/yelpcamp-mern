import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router";
import { AuthContext } from "../../services/auth.context";

export default function RequireAuth() {
  const { isAuthenticated } = useContext(AuthContext);
  let location = useLocation();

  if (!isAuthenticated && !JSON.parse(localStorage.getItem("user"))) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          type: "danger",
          message: "You must be signed in.",
        }}
      />
    );
  }

  return <Outlet />;
}
