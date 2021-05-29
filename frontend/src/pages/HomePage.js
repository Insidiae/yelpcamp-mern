import React, { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    document.title = "Welcome to YelpCamp";
  }, []);

  return (
    <div>
      <h1>Welcome to YelpCamp</h1>
    </div>
  );
}

export default HomePage;
