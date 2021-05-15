import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import CampgroundsService from "../../services/campgrounds.service";

function EditCampground() {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  async function getCampgroundData(id) {
    const res = await CampgroundsService.get(id);
    setName(res.data.title);
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
      title: name,
      price: price * 100,
      description,
      location,
    };

    await CampgroundsService.edit(id, { campground });

    history.push(`/campgrounds/${id}`);
  }

  return (
    <div>
      <h1>Edit Campground</h1>
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

      <Link to={`/campgrounds/${id}`}>Cancel</Link>
    </div>
  );
}

export default EditCampground;
