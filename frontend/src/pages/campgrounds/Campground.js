import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import CampgroundsService from "../../services/campgrounds.service";
import { formatMoney } from "../../utils/formatMoney";

function Campground() {
  const [campground, setCampground] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  async function getCampground(id) {
    const res = await CampgroundsService.get(id);
    setCampground(res.data);
  }

  async function deleteCampground(id) {
    await CampgroundsService.delete(id);
    history.push("/campgrounds");
  }

  useEffect(() => {
    getCampground(id);
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center min-h-full">
      <div className="flex flex-col bg-white border-2 border-gray-300 my-4 rounded-md tracking-wide shadow-lg w-1/2 overflow-hidden">
        <img className="w-full" src={campground.image} alt={campground.name} />

        <div className="px-6 py-3 border-b border-gray-300">
          <h1 className="text-3xl font-bold mb-2">{campground.name}</h1>
          <p className="font-semibold tracking-wider">
            {formatMoney(campground.price)}/night
          </p>
        </div>

        <div className="px-6 py-3 border-b border-gray-300">
          <div className="flex mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
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
            <p>{campground.location}</p>
          </div>
          <p>{campground.description}</p>
        </div>

        <div className="px-6 py-3 border-b border-gray-300">
          <Link
            to={`/campgrounds/${id}/edit`}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteCampground(id)}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>

        <div className="px-6 py-3 bg-gray-200">
          <p>2 days ago</p>
        </div>
      </div>
    </div>
  );
}

export default Campground;
