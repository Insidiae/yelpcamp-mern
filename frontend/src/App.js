import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CampgroundList from "./pages/campgrounds/CampgroundList";
import Campground from "./pages/campgrounds/Campground";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/campgrounds">Campgrounds</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/campgrounds" exact>
            <CampgroundList />
          </Route>
          <Route path="/campgrounds/:id" exact>
            <Campground />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
