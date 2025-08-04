import React from "react";
import { useParams } from "react-router-dom";

function User() {
    const userName = useParams().name
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">User Profile</h1>
      <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-600">{userName?.charAt(0)?.toUpperCase()}</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{userName}</h2>
          <p className="text-gray-500 mt-2">User ID: {Math.floor(Math.random() * 10000)}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
