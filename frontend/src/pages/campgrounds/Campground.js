import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  LocationMarkerIcon,
  TrashIcon,
  StarIcon as EmptyStar,
} from "@heroicons/react/outline";
import { StarIcon as SolidStar } from "@heroicons/react/solid";

import CampgroundsService from "../../services/campgrounds.service";
import ReviewsService from "../../services/reviews.service";
import NewReview from "../../components/reviews/NewReview";

import { formatMoney } from "../../utils/formatMoney";

function Campground() {
  const [campground, setCampground] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  async function getCampground(id) {
    try {
      const res = await CampgroundsService.get(id);
      setCampground(res.data);
    } catch (err) {
      setError(err.response.data);
    }
  }

  async function deleteCampground(id) {
    await CampgroundsService.delete(id);
    history.push("/campgrounds");
  }

  async function deleteReview(campgroundId, reviewId) {
    await ReviewsService.delete(campgroundId, reviewId);
    history.go(0);
  }

  useEffect(() => {
    getCampground(id);
  }, [id]);

  useEffect(() => {
    document.title = `${campground && campground.name} | YelpCamp`;
  }, [campground]);

  useEffect(() => {
    document.title = `${error && error.errorMsg} | YelpCamp`;
  }, [error]);

  if (!error && !campground) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.errorMsg}</div>;
  }

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
            <LocationMarkerIcon className="h-6 w-6 mr-2" />
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

        <div className="px-6 py-3">
          <h2 className="text-xl font-bold mb-2">Reviews</h2>
          {!campground.reviews.length ? (
            <p className="italic">
              No reviews yet. Be the first to leave a review!
            </p>
          ) : (
            campground.reviews.map((review) => (
              <div className="mb-2 w-full" key={review._id}>
                <div className="flex flex-row w-full mb-1">
                  <span className="inline-block">
                    {Array(review.rating)
                      .fill(0)
                      .map((_, i) => (
                        <SolidStar
                          key={`solid-${i}`}
                          className="h-6 w-6 inline-block"
                        />
                      ))}
                    {Array(5 - review.rating)
                      .fill(0)
                      .map((_, i) => (
                        <EmptyStar
                          key={`solid-${i}`}
                          className="h-6 w-6 inline-block"
                        />
                      ))}
                  </span>
                  <button
                    onClick={() => deleteReview(id, review._id)}
                    className="inline-block ml-auto justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                <p>{review.body}</p>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-3">
          <h2 className="text-xl font-bold mb-2">Leave a Review</h2>
          <NewReview campgroundId={id} />
        </div>

        <div className="px-6 py-3 bg-gray-200">
          <p>2 days ago</p>
        </div>
      </div>
    </div>
  );
}

export default Campground;
