import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/outline";

import CampgroundsService from "../../services/campgrounds.service";
import ApiService from "../../services/api.service";
import { AuthContext } from "../../services/auth.context";

const MAX_IMAGES = 10;

function EditCampground() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
  } = useForm();

  //TODO: Research the proper way to set values in edit form.
  //? This one throws an exhaustive-deps warning
  //? when passed into useEffect.
  // async function getCampgroundData(id) {
  //   const res = await CampgroundsService.get(id);
  //   setValue("name", res.data.name);
  //   setValue("image", res.data.image);
  //   setValue("price", res.data.price / 100);
  //   setValue("description", res.data.description);
  //   setValue("location", res.data.location);
  // }

  //? ESLint suggest using useCallback to get rid of the
  //? exhaustive-deps warning, but this still feels iffy.
  const getCampgroundData = useCallback(async () => {
    const res = await CampgroundsService.get(id);
    if (res.data.author._id !== user?._id) {
      navigate(`/campgrounds/${id}`, {
        state: {
          type: "danger",
          message: "You do not have the permision to edit this campground.",
        },
        replace: true,
      });
    }
    setImages(
      res.data.images.map((img) => {
        const { _id, ...rest } = img;
        return rest;
      })
    );
    setValue("name", res.data.name);
    setValue("price", res.data.price / 100);
    setValue("description", res.data.description);
    setValue("location", res.data.location);
  }, [id, setValue, navigate, user]);

  //? The setValue calls seem to be the one throwing
  //? the exhaustive-deps warning, meaning I have to add
  //? getCampgroundData into the dependency list now.
  useEffect(() => {
    document.title = "Edit Campground | YelpCamp";
    getCampgroundData(id);
  }, [id, getCampgroundData]);

  async function onSubmit(data) {
    const { imageFiles, ...campgroundData } = data;

    if (images.length + imageFiles.length > MAX_IMAGES) {
      return setError("imageFile", {
        type: "manual",
        message: `Too many images. Max allowed is ${
          MAX_IMAGES - images.length
        }.`,
      });
    }

    for (let imageFile of imageFiles) {
      if (!imageFile.type.includes("image")) {
        return setError("imageFile", {
          type: "manual",
          message: "Please upload a valid image file.",
        });
      }
    }

    campgroundData.price = campgroundData.price * 100;

    const res = await ApiService.getCloudinaryKeys();
    const { cloudName } = res.data;

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const uploadedImages = [];

    for (let imageFile of imageFiles) {
      const uploadBody = new FormData();
      uploadBody.append("file", imageFile);
      uploadBody.append("upload_preset", "YelpCamp");

      const uploadRes = await axios.post(url, uploadBody);
      console.log(uploadRes);
      uploadedImages.push(uploadRes.data);
    }

    const body = {
      ...campgroundData,
      images: images.concat(
        uploadedImages.map((img) => {
          return {
            url: img.secure_url,
            thumbUrl: img.eager[0].secure_url,
            filename: img.public_id,
          };
        })
      ),
    };

    await CampgroundsService.edit(id, { campground: body, deletedImages });

    navigate(`/campgrounds/${id}`, {
      state: { type: "info", message: "Campground has been updated." },
      replace: true,
    });
  }

  function deleteImage(toDelete) {
    setDeletedImages((prevState) => [...prevState, toDelete]);
    setImages(images.filter((img) => img.filename !== toDelete.filename));
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-full">
      <h1 className="text-3xl font-bold py-5">Edit Campground</h1>
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
            Add more images (Max: {MAX_IMAGES - images.length})
          </label>
          <input
            type="file"
            multiple
            name="imageFiles"
            id="imageFiles"
            accept="image/*"
            disabled={images.length >= MAX_IMAGES}
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              errors.imageFile && "ring-red-500 border-red-500"
            }`}
            {...register("imageFiles")}
          />
          {errors.imageFile && (
            <span className="text-red-500 font-semibold sm:text-sm">
              {errors.imageFile.message || "Please upload an image."}
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
          {images.map((img) => (
            <div key={img.filename} className="inline-block relative mr-2">
              <img src={img.url} alt="" className="w-20" />
              <button
                role="button"
                className="inline-block absolute top-2 right-2 ml-auto justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => deleteImage(img)}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
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

export default EditCampground;
