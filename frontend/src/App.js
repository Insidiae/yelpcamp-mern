import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import RequireAuth from "./components/auth/RequireAuth";
import CampgroundList from "./pages/campgrounds/CampgroundList";
import Campground from "./pages/campgrounds/Campground";
import NewCampground from "./pages/campgrounds/NewCampground";
import EditCampground from "./pages/campgrounds/EditCampground";
import NotFound from "./pages/NotFound";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { AuthContextProvider } from "./services/auth.context";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div className="flex flex-col min-h-screen  bg-gray-200">
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/campgrounds">
                <Route index element={<CampgroundList />} />
                <Route path=":id" element={<Campground />} />
                <Route element={<RequireAuth />}>
                  <Route path="new" element={<NewCampground />} />
                  <Route path=":id/edit" element={<EditCampground />} />
                </Route>
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
