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
    <div>
      <h1>{campground.title}</h1>
      <p>{campground.location}</p>
      <p>
        <strong>{formatMoney(campground.price)}</strong>
      </p>
      <p>
        <em>{campground.description}</em>
      </p>

      <Link to={`/campgrounds/${id}/edit`}>Edit</Link>
      <button onClick={() => deleteCampground(id)}>Delete</button>
    </div>
  );
}

export default Campground;
