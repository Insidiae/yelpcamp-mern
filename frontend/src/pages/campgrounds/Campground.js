import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CampgroundsService from "../../services/campgrounds.service";
import { formatMoney } from "../../utils/formatMoney";

function Campground() {
  const [campground, setCampground] = useState([]);
  const { id } = useParams();

  async function getCampground(id) {
    const res = await CampgroundsService.get(id);
    setCampground(res.data);
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
    </div>
  );
}

export default Campground;
