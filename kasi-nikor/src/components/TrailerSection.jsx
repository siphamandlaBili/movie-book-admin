import React, { useState, useRef } from 'react';
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player/lazy';
import BlurCircle from './BlurCircle';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';

const TrailerSection = () => {
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const playerRef = useRef(null);

  const handleTrailerSelect = (index) => {
    setCurrentTrailerIndex(index);
    setPlaying(true); // Auto-play when changing trailers
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      const wrapper = playerRef.current.wrapper;
      if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen();
      } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen();
      } else if (wrapper.msRequestFullscreen) {
        wrapper.msRequestFullscreen();
      }
    }
  };

  return (
    <section className="relative px-6 md:px-16 lg:px-24 py-20 xl:px-44 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Latest Trailers</h2>
          <p className='text-gray-300 font-medium text-lg max-w-[960px]'>
            Watch the newest trailers from your favorite movies and shows
          </p>
        </div>

        <div className="relative group" 
             onMouseEnter={() => setHovered(true)} 
             onMouseLeave={() => setHovered(false)}>
          {/* Background blur circles */}
          <BlurCircle top='-10%' right='10%' size="lg" opacity="30" />
          <BlurCircle bottom='-60%' left='-12%' size="xl" opacity="20" />
          
          {/* Video player with enhanced controls */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 transform group-hover:scale-[1.01]">
            <ReactPlayer 
              ref={playerRef}
              url={dummyTrailers[currentTrailerIndex].videoUrl} 
              playing={playing}
              muted={muted}
              width="100%"
              height="100%"
              style={{ aspectRatio: '16/9' }}
              className="mx-auto"
              light={!playing && dummyTrailers[currentTrailerIndex].image}
              playIcon={<button className="p-4 bg-white/20 rounded-full hover:bg-white/30 transition-all">
                <FaPlay size={10} className="text-white" />
              </button>}
            />
            
            {/* Custom controls overlay */}
            {(hovered || !playing) && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-between p-4 transition-opacity duration-300">
                <div className="flex justify-end">
                  <button 
                    onClick={() => setMuted(!muted)}
                    className="p-2 text-white hover:text-gray-300 transition-colors"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                  </button>
                  <button 
                    onClick={handleFullscreen}
                    className="p-2 text-white hover:text-gray-300 transition-colors ml-2"
                    aria-label="Fullscreen"
                  >
                    <FaExpand size={20} />
                  </button>
                </div>
                
                <div className="flex items-center">
                  <button 
                    onClick={() => setPlaying(!playing)}
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all"
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? <FaPause size={24} className="text-white" /> : <FaPlay size={24} className="text-white" />}
                  </button>
                  <div className="ml-4 text-white">
                    <h3 className="text-xl font-bold">Trailer {currentTrailerIndex + 1}</h3>
                    <p className="text-gray-300 text-sm">Now playing</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trailer thumbnails carousel */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dummyTrailers.map((trailer, index) => (
            <div 
              key={index}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all ${currentTrailerIndex === index ? 'ring-2 ring-white scale-[1.02]' : 'hover:scale-105'}`}
              onClick={() => handleTrailerSelect(index)}
            >
              <img 
                src={trailer.image} 
                alt={`Trailer ${index + 1}`} 
                className="w-full h-full object-cover aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <h4 className="text-white font-medium text-sm">Trailer {index + 1}</h4>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full ${currentTrailerIndex === index ? 'bg-white/30' : 'bg-black/50'} transition-all`}>
                  <FaPlay className={`text-white ${currentTrailerIndex === index ? 'text-xl' : 'text-sm'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrailerSection;