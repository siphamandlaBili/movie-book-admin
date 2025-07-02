import React from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/MovieCard';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header section with View All button */}
        <div className="relative flex items-center justify-between pb-8">
          <h1 className="text-lg md:text-xl font-bold">Now Showing</h1>
        </div>

        {/* Movie grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {dummyShowsData.map((movie) => (
            <div 
              key={movie._id}
              className="w-full max-w-[260px] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)]"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Show More button */}
        <div className="flex justify-center mt-16">
          <button 
            onClick={() => window.scrollTo(0,0)} 
            className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movies;