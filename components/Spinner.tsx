
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-600"></div>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Generating Hotel Listings...</h2>
      <p className="text-gray-500 mt-2">Our AI is finding the best stays in Chennai for you. Please wait a moment.</p>
    </div>
  );
};

export default Spinner;
