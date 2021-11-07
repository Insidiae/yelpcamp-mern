import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { PaperAirplaneIcon, LockClosedIcon } from "@heroicons/react/solid";

import { AuthContext } from "../../services/auth.context";

export default function Register() {
  const {
    isLoading,
    error: registerError,
    onRegister,
  } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    document.title = "Sign Up | YelpCamp";
  }, []);

  async function onSubmit(data) {
    await onRegister(data);
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <PaperAirplaneIcon
            className="mx-auto h-12 text-indigo-600 w-auto"
            alt="YelpCamp"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for a free account
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors.email && "ring-red-500 border-red-500"
                }`}
                placeholder="Email address"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 font-semibold sm:text-sm">
                  Please enter a valid email address.
                </span>
              )}
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors.username && "ring-red-500 border-red-500"
                }`}
                placeholder="Username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-red-500 font-semibold sm:text-sm">
                  Please enter a username.
                </span>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors.password && "ring-red-500 border-red-500"
                }`}
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500 font-semibold sm:text-sm">
                  Please enter a password.
                </span>
              )}
            </div>
            {registerError && (
              <span className="text-red-500 font-semibold sm:text-sm">
                {registerError}
              </span>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
