import React from "react";
import UrlForm from "../components/urlForm";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Simple URL Shortener</h1>
        <UrlForm/>
      </div>
    </div>
  );
};

export default HomePage;
