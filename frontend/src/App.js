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

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/campgrounds" element={<CampgroundList />} />
            <Route path="/campgrounds/*">
              <Route path="new" element={<NewCampground />} />
              <Route path=":id" element={<Campground />} />
              <Route path=":id/edit" element={<EditCampground />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
