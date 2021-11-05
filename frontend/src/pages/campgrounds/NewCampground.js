import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import CampgroundsService from "../../services/campgrounds.service";

function NewCampground() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    document.title = "New Campground | YelpCamp";
  }, []);

  async function onSubmit(data) {
    data.price = data.price * 100;

    await CampgroundsService.create({ campground: data });

    navigate("/campgrounds", {
      state: { type: "success", message: "Added a new campground!" },
    });
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-full">
      <h1 className="text-3xl font-bold py-5">New Campground</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white border-2 border-gray-300 my-4 p-5 rounded-md tracking-wide shadow-lg w-4/5 sm:w-1/2"
      >
        <div className="my-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              errors.name && "ring-red-500 border-red-500"
            }`}
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 font-semibold sm:text-sm">
              Please enter a name.
            </span>
          )}
        </div>
        <div className="my-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            name="image"
            id="image"
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              errors.image && "ring-red-500 border-red-500"
            }`}
            placeholder="Image URL"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <span className="text-red-500 font-semibold sm:text-sm">
              Please enter an image URL.
            </span>
          )}
        </div>
        <div className="my-2">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              $
            </span>
            <input
              type="number"
              name="price"
              id="price"
              className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 ${
                errors.price && "ring-red-500 border-red-500"
              }`}
              placeholder="Price"
              step="0.01"
              min="0"
              {...register("price", { required: true })}
            />
          </div>
          {errors.price && (
            <span className="text-red-500 font-semibold sm:text-sm">
              Please enter a valid price.
            </span>
          )}
        </div>
        <div className="my-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md ${
              errors.description && "ring-red-500 border-red-500"
            }`}
            placeholder="Description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500 font-semibold sm:text-sm">
              Please enter a description.
            </span>
          )}
        </div>
        <div className="my-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              errors.location && "ring-red-500 border-red-500"
            }`}
            placeholder="Location"
            {...register("location", { required: true })}
          />
          {errors.location && (
            <span className="text-red-500 font-semibold sm:text-sm">
              Please enter a valid location.
            </span>
          )}
        </div>

        <div className="my-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <Link
            to="/campgrounds"
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-blue-600 bg-transparent hover:text-blue-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default NewCampground;
