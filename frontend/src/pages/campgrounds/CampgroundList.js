import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocationMarkerIcon } from "@heroicons/react/outline";

import Flash from "../../components/flash";

import CampgroundsService from "../../services/campgrounds.service";
import { formatMoney } from "../../utils/formatMoney";

function CampgroundList() {
  const location = useLocation();
  const [campgrounds, setCampgrounds] = useState([]);

  async function getCampgrounds() {
    const res = await CampgroundsService.getAll();
    setCampgrounds(res.data);
  }

  useEffect(() => {
    document.title = "Campgrounds | YelpCamp";
    getCampgrounds();
  }, []);

  return (
    <>
      {location.state?.message && (
        <Flash type={location.state.type} message={location.state.message} />
      )}
      <div className="flex flex-col items-center min-h-screen py-4">
        <h1 className="text-3xl font-bold py-5">Campgrounds</h1>
        <ul className="flex flex-col items-center">
          {campgrounds.map((campground) => (
            <li
              className="flex justify-start items-center w-10/12 sm:w-1/2 bg-white border-2 border-gray-300 my-4 p-5 rounded-md tracking-wide shadow-lg"
              key={campground._id}
            >
              <div className="flex">
                <img
                  className="w-1/2 rounded-md border-2 object-cover border-gray-300"
                  src={campground.images[0].thumbUrl}
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
                    <LocationMarkerIcon className="h-6 w-6" />
                    <p className="ml-3">{campground.location}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CampgroundList;
