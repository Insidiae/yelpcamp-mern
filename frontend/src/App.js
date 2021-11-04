import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CampgroundList from "./pages/campgrounds/CampgroundList";
import Campground from "./pages/campgrounds/Campground";
import NewCampground from "./pages/campgrounds/NewCampground";
import EditCampground from "./pages/campgrounds/EditCampground";
import NotFound from "./pages/NotFound";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen  bg-gray-200">
        <Header />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/campgrounds" element={<CampgroundList />} />
            <Route path="/campgrounds/new" element={<NewCampground />} />
            <Route path="/campgrounds/:id" element={<Campground />} />
            <Route path="/campgrounds/:id/edit" element={<EditCampground />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
