import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  useEffect(() => {
    document.title = "Welcome to YelpCamp";
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-home-splash bg-cover bg-center">
      <main class="flex flex-col items-center w-10/12">
        <h1 className="text-4xl font-bold text-gray-200 mb-3">YelpCamp</h1>
        <p class="text-xl text-center text-gray-200 mb-3">
          {" "}
          Welcome to YelpCamp! <br /> Jump right in and explore our many
          campgrounds. <br />
          Feel free to share some of your own and comment on others!
        </p>
        <Link
          to="/campgrounds"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Campgrounds
        </Link>
      </main>
    </div>
  );
}

export default HomePage;
