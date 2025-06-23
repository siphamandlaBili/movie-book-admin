import React from 'react';
import { dummyShowsData } from '../assets/assets.js';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b p-30 from-gray-900 to-black text-white p-6">
      {dummyShowsData.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-sm md:text-xl font-bold mb-8">Now Showing</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dummyShowsData.map((movie) => (
              <MovieCard 
                movie={movie} 
                key={movie._id}
                className="transition-transform duration-300 hover:scale-105"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-gray-500">No Movies Available</h1>
        </div>
      )}
    </div>
  );
};

export default Movies;