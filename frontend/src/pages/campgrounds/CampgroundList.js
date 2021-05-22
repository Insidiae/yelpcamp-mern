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
    <div className="flex flex-col items-center min-h-screen py-4">
      <h1 className="text-3xl font-bold py-5">Campgrounds</h1>
      <ul>
        {campgrounds.map((campground) => (
          <li
            className="flex justify-start items-center max-w-2xl bg-white border-2 border-gray-300 my-4 p-5 rounded-md tracking-wide shadow-lg"
            key={campground._id}
          >
            <div className="flex">
              <img
                className="w-48 rounded-md border-2 object-cover border-gray-300"
                src={campground.image}
                alt={campground.name}
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-xl font-semibold mb-2 text-blue-600">
                  <Link to={`/campgrounds/${campground._id}`}>
                    {campground.name} - {formatMoney(campground.price)}
                  </Link>
                </h2>
                <p className="text-gray-800 mt-2">{campground.description}</p>
                <div className="flex mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="ml-3">{campground.location}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampgroundList;
