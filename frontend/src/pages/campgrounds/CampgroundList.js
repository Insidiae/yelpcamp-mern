import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CampgroundsService from "../../services/campgrounds.service";
import { formatMoney } from "../../utils/formatMoney";

function CampgroundList() {
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
              <Link to={`/campgrounds/${campground._id}`}>
                {campground.title} - {campground.location}
              </Link>
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

export default CampgroundList;
