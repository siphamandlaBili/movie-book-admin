import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon, X } from 'lucide-react';
import ReactPlayer from 'react-player';
import DateSelect from '../components/DateSelect';
import Loader from '../components/Loading';

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const getShowDetails = async () => {
    const show = dummyShowsData.find((show) => {
      return show._id === id;
    })
    if(show){
    setShow({ movie: show, dateTime: dummyDateTimeData });
    }
  };

  useEffect(() => {
    getShowDetails();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-26 lg:px-40 pt-30 pb-20">
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white-100/350 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl mx-4">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white hover:text-primary transition"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-w-16 h-100 aspect-h-9 rounded-lg overflow-hidden">
              <ReactPlayer
                url={show.movie.videoUrl}
                width="100%"
                height="100%"
                controls={true}
                playing={true}
                className="react-player"
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={show?.movie?.poster_path} alt=""
          className='max-md:mx-auto rounded-xl h-90 max-w-70 object-cover' />

        <div className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left='-100px' />
          <p className='text-primary'>English</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show?.movie?.title}</h1>

          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-primary fill-primary' />
            {show?.movie?.vote_average.toFixed(1)} User Rating
          </div>

          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show?.movie?.overview}</p>

          <p>{show?.movie?.runtime}m | {show?.movie?.genres.map(genre => genre.name).join(" | ")} | {show?.movie?.release_date.split("-")[0]}</p>

          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <button 
              onClick={() => setShowTrailer(true)}
              className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-900 hover:bg-gray-800 transition rounded-md font-medium cursor-pointer active:scale-95'
            >
              <PlayCircleIcon className='w-5 h-5' />
              Watch Trailer
            </button>
            <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
            <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
              <Heart className={'w-5 h-5'} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Cast Section */}
      <div className="mt-20 max-w-6xl mx-auto">
        <p className="text-lg mb-8 text-white flex items-center gap-3">
          Your Favorite Cast
        </p>
        
        <div className="relative">
          <div className="overflow-x-auto no-scrollbar py-4">
            <div className="flex gap-2 px-4 w-max">
              {show?.movie?.casts.slice(0, 10).map((cast, index) => (
                <div 
                  key={index} 
                  className="group relative flex flex-col items-center transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img 
                      className="rounded-full h-20 w-20 md:h-28 md:w-28 object-cover border-2 border-transparent group-hover:border-primary transition-all duration-300"
                      src={cast?.profile_path} 
                      alt={cast?.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                      <span className="text-white text-sm">{cast?.character}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-center max-w-[100px]">
                    <p className="font-medium text-white group-hover:text-primary transition-colors duration-300 truncate">
                      {cast?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DateSelect dateTime={show?.dateTime} id={id}/>
    </div>
  ) : (
    <Loader/>
  );
}

export default MovieDetails;