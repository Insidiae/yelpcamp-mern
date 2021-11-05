import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";

function FlashSuccess({ message }) {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className="flex m-3 items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2">
      <div className="text-green-500 rounded-full bg-white mr-3">
        <CheckIcon className="h-7 w-7" />
      </div>
      <div className="text-white max-w-xs ">{message}</div>
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

export default FlashSuccess;
