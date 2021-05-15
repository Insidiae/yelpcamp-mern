import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import CampgroundsService from "../../services/campgrounds.service";

function NewCampground() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const campground = {
      title: name,
      price: price * 100,
      description,
      location,
    };

    await CampgroundsService.create({ campground });

    history.push("/campgrounds");
  }

  return (
    <div>
      <h1>New Campground</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Name</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <Link to="/campgrounds">Cancel</Link>
    </div>
  );
}

export default NewCampground;
