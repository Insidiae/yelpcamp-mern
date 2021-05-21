import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CampgroundList from "./pages/campgrounds/CampgroundList";
import Campground from "./pages/campgrounds/Campground";
import NewCampground from "./pages/campgrounds/NewCampground";
import EditCampground from "./pages/campgrounds/EditCampground";

import Header from "./components/layout/Header";

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/campgrounds">Campgrounds</Link>
            </li>
            <li>
              <Link to="/campgrounds/new">New Campground</Link>
            </li>
          </ul>
        </nav> */}
        <Header />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/campgrounds" exact>
            <CampgroundList />
          </Route>
          <Route path="/campgrounds/new" exact>
            <NewCampground />
          </Route>
          <Route path="/campgrounds/:id" exact>
            <Campground />
          </Route>
          <Route path="/campgrounds/:id/edit" exact>
            <EditCampground />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
