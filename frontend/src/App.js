import React, { useState, useEffect } from "react";
import "./App.css";

import CampgroundsService from "./services/campgrounds.service";
import { formatMoney } from "./utils/formatMoney";

function App() {
  const [campgrounds, setCampgrounds] = useState([]);

  async function getCampgrounds() {
    const res = await CampgroundsService.getAll();
    setCampgrounds(res.data);
  }

  useEffect(() => {
    getCampgrounds();
  }, []);

  return (
    <div className="App">
      <h1>Campgrounds</h1>
      <ul>
        {campgrounds.map((campground) => (
          <li>
            <h2>
              {campground.title} - {campground.location}
            </h2>
            <p>{formatMoney(campground.price)}</p>
            <p>
              <em>{campground.description}</em>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
