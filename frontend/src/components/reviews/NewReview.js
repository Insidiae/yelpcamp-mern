import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../services/auth.context";
import ReviewsService from "../../services/reviews.service";

function NewReview({ campgroundId }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function onSubmit(data) {
    await ReviewsService.create(campgroundId, { review: data });

    navigate(`/campgrounds/${campgroundId}`, {
      state: { type: "success", message: "Your review has been posted!" },
    });
    navigate(0);
  }

  if (!user) {
    return (
      <div className="my-2">
        <p className="italic">
          <Link to="/login" className="text-indigo-600 hover:underline">
            Sign in
          </Link>{" "}
          to leave a review!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-2">
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700"
        >
          Review
        </label>
        <textarea
          name="body"
          id="body"
          rows={3}
          className={
            "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
          }
          placeholder="Write a review..."
          {...register("body", { required: true })}
        />
        {errors.body && (
          <span className="text-red-500 font-semibold sm:text-sm">
            Please enter a review.
          </span>
        )}
      </div>
      <div className="my-2">
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700"
        >
          Rating
        </label>
        <input
          name="rating"
          id="rating"
          type="range"
          min="1"
          max="5"
          {...register("rating")}
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}

export default NewReview;
