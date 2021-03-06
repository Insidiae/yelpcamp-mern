import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Slider from "react-slick";
import { LocationMarkerIcon, TrashIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

import ApiService from "../../services/api.service";
import CampgroundsService from "../../services/campgrounds.service";
import ReviewsService from "../../services/reviews.service";

import Flash from "../../components/flash";
import NewReview from "../../components/reviews/NewReview";

import { AuthContext } from "../../services/auth.context";

import { formatMoney } from "../../utils/formatMoney";

function Campground() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [campground, setCampground] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const mapContainer = useRef(null);
  const map = useRef(null);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getCampground = useCallback(async (id) => {
    try {
      const res = await CampgroundsService.get(id);
      setCampground(res.data);
      const coords = res.data.geometry.coordinates;
      if (map.current) return; // initialize map only once

      const mapRes = await ApiService.getMapboxToken();
      const { token } = mapRes.data;

      mapboxgl.accessToken = token;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v11",
        center: coords,
        zoom: 9,
      });

      map.current.addControl(new mapboxgl.NavigationControl());

      new mapboxgl.Marker()
        .setLngLat(coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3 class="text-base font-bold">${res.data.name}</h3><p>${res.data.location}</p>`
          )
        )
        .addTo(map.current);
    } catch (err) {
      setError(err.response.data);
    }
  }, []);

  async function deleteCampground(id) {
    await CampgroundsService.delete(id);

    navigate("/campgrounds", {
      state: { type: "danger", message: "Campground has been deleted." },
      replace: true,
    });
  }

  async function deleteReview(campgroundId, reviewId) {
    await ReviewsService.delete(campgroundId, reviewId);

    //! This looks kinda janky at the moment
    //TODO: Research how to pass location state on navigate(0)
    navigate(`/campgrounds/${campgroundId}`, {
      state: { type: "danger", message: "Review has been deleted." },
    });
    navigate(0);
  }

  useEffect(() => {
    getCampground(id);
  }, [id, getCampground]);

  useEffect(() => {
    if (campground) {
      document.title = `${campground.name} | YelpCamp`;
    }
  }, [campground]);

  useEffect(() => {
    if (error) {
      navigate("/campgrounds", {
        state: { type: "danger", message: "Cannot find the campground." },
        replace: true,
      });
    }
  }, [error, navigate]);

  if (!campground) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {location.state?.message && (
        <Flash type={location.state.type} message={location.state.message} />
      )}
      <div className="flex flex-col justify-center items-center min-h-full">
        <div className="flex flex-col bg-white border-2 border-gray-300 my-4 rounded-md tracking-wide shadow-lg w-11/12 overflow-hidden md:w-3/4 lg:w-1/2">
          <Slider {...sliderSettings}>
            {campground.images.map((img) => (
              <img
                key={img.filename}
                className="w-full"
                src={img.url}
                alt={campground.name}
              />
            ))}
          </Slider>

          <div className="px-6 py-3 border-b border-gray-300">
            <h1 className="text-3xl font-bold mb-2">{campground.name}</h1>
            <p className="italic text-sm mb-2">
              Submitted by: {campground.author.username}
            </p>
            <p className="font-semibold tracking-wider">
              {formatMoney(campground.price)}/night
            </p>
          </div>

          <div className="px-6 py-3 border-b border-gray-300">
            <p className="mb-3">{campground.description}</p>
            <div className="flex mb-3">
              <LocationMarkerIcon className="h-6 w-6 mr-2" />
              <p>{campground.location}</p>
            </div>

            <div>
              <div ref={mapContainer} className="map-container w-full h-96" />
            </div>
          </div>

          {campground.author._id === user?._id && (
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
          )}

          <div className="px-6 py-3">
            <h2 className="text-xl font-bold mb-2">Reviews</h2>
            {!campground.reviews.length ? (
              <p className="italic">
                No reviews yet. Be the first to leave a review!
              </p>
            ) : (
              campground.reviews.map((review) => (
                <div className="mb-2 w-full" key={review._id}>
                  <div className="flex flex-row items-center w-full mb-1">
                    <span className="font-semibold italic mr-3">
                      {review.author.username}
                    </span>
                    <span className="inline-block">
                      {Array(review.rating)
                        .fill(0)
                        .map((_, i) => (
                          <StarIcon
                            key={`filled-${i}`}
                            className="h-4 w-4 text-yellow-300 inline-block"
                          />
                        ))}
                      {Array(5 - review.rating)
                        .fill(0)
                        .map((_, i) => (
                          <StarIcon
                            key={`empty-${i}`}
                            className="h-4 w-4 text-gray-400 inline-block"
                          />
                        ))}
                    </span>
                    {user?._id === review.author._id && (
                      <button
                        onClick={() => deleteReview(id, review._id)}
                        className="inline-block ml-auto justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    )}
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
    </>
  );
}

export default Campground;
