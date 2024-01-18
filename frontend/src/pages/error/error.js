import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex dark:bg-black items-center justify-center bg-gray-100">
      <div className="max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-4xl font-bold text-red-600 mb-4">Error 404</h2>
        <p className="text-gray-700 mb-4">
          Oops! The page you're looking for does not exist.
        </p>
        <p className="text-gray-700 mb-4">Let's get you back to safety.</p>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red transition duration-300"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error404;
