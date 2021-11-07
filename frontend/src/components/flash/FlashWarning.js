import React, { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

function FlashWarning({ message }) {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className="flex m-3 items-center bg-orange-400 border-l-4 border-orange-700 py-2 px-3 shadow-md mb-2">
      <div className="text-orange-500 rounded-full bg-white mr-3">
        <ExclamationCircleIcon className="h-7 y-7" />
      </div>
      <div className="text-white">{message}</div>
      <button
        className="ml-auto text-gray-300 text-lg hover:text-white"
        aria-label="Close"
        onClick={() => setIsVisible(false)}
      >
        &times;
      </button>
    </div>
  );
}

export default FlashWarning;
