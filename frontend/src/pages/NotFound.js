import React, { useEffect } from "react";

function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found";
  }, []);

  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
    </div>
  );
}

export default NotFound;
