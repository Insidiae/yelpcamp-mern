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
    <div>
      <h1 className="text-3xl font-bold py-5">Campgrounds</h1>
      <ul>
        {campgrounds.map((campground) => (
          <li className="py-2" key={campground._id}>
            <h2 className="font-bold text-xl">
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
