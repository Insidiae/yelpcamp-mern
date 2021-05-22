import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import CampgroundsService from "../../services/campgrounds.service";

function EditCampground() {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  async function getCampgroundData(id) {
    const res = await CampgroundsService.get(id);
    setName(res.data.name);
    setImage(res.data.image);
    setPrice(res.data.price / 100);
    setDescription(res.data.description);
    setLocation(res.data.location);
  }

  useEffect(() => {
    getCampgroundData(id);
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const campground = {
      name: name,
      image,
      price: price * 100,
      description,
      location,
    };

    await CampgroundsService.edit(id, { campground });

    history.push(`/campgrounds/${id}`);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-full">
      <h1 className="text-3xl font-bold py-5">Edit Campground</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white border-2 border-gray-300 my-4 p-5 rounded-md tracking-wide shadow-lg w-1/2"
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
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
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
              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
              placeholder="Price"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
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
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="my-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
          <Link
            to={`/campgrounds/${id}`}
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-blue-600 bg-transparent hover:text-blue-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditCampground;
