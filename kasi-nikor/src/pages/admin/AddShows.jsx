import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Loader from '../../components/Loading';
import Title from './Title';
import numeral from 'numeral';
import { StarIcon, CheckCircle2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };
  
  const handleDateTimeAdd = () => {
    if (!dateTimeInput) {
      toast.error('Please select a date and time', {
        style: {
          background: '#fee2e2',
          color: '#b91c1c',
          fontSize: '0.875rem'
        }
      });
      return;
    }

    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    // Normalize time to HH:mm format for comparison
    const normalizedTime = time.substring(0, 5);
    const existingTimes = dateTimeSelection[date] || [];

    // Check if time already exists for this date
    const isDuplicate = existingTimes.some(t => 
      t.substring(0, 5) === normalizedTime
    );

    if (isDuplicate) {
      toast.error('This time already exists for the selected day', {
        style: {
          background: '#fee2e2',
          color: '#b91c1c',
          fontSize: '0.875rem'
        }
      });
      return;
    }

    setDateTimeSelection(prev => ({
      ...prev,
      [date]: [...existingTimes, time]
    }));
    
    toast.success('Time slot added successfully', {
      style: {
        background: '#dcfce7',
        color: '#166534',
        fontSize: '0.875rem'
      }
    });
    
    setDateTimeInput("");
  };

  const handleRemoveTime = (date, timeToRemove) => {
    setDateTimeSelection(prev => {
      const times = prev[date] || [];
      const updatedTimes = times.filter(time => time !== timeToRemove);
      
      if (updatedTimes.length === 0) {
        const newState = { ...prev };
        delete newState[date];
        return newState;
      }
      
      return { ...prev, [date]: updatedTimes };
    });
    
    toast('Time slot removed', {
      icon: '🗑️',
      style: {
        fontSize: '0.875rem'
      }
    });
  };

  const handleSubmit = () => {
    if (!selectedMovie) {
      toast.error('Please select a movie', { duration: 2000 });
      return;
    }
    
    if (!showPrice || isNaN(showPrice)) {
      toast.error('Please enter a valid price', { duration: 2000 });
      return;
    }
    
    if (Object.keys(dateTimeSelection).length === 0) {
      toast.error('Please add at least one show time', { duration: 2000 });
      return;
    }
    
    // Submit logic would go here
    toast.success('Show added successfully!', { duration: 2000 });
    
    // Reset form
    setSelectedMovie(null);
    setShowPrice("");
    setDateTimeSelection({});
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return nowPlayingMovies.length > 0 ? (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <Toaster position="top-center" />
      <Title text1="Add" text2="Shows" />
      <p className="mt-10 text-lg font-medium">Movies Playing Now</p>

      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies?.map((movie) => (
            <div 
              key={movie._id} 
              onClick={() => setSelectedMovie(movie._id)} 
              className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 ${
                selectedMovie === movie._id ? 'ring-2 ring-primary rounded-lg' : ''
              }`}
            >
              <div className="relative rounded-lg overflow-hidden">
                {selectedMovie === movie._id && (
                  <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1">
                    <CheckCircle2 className="w-6 h-6 text-primary fill-primary/20" />
                  </div>
                )}
                
                <img 
                  src={movie.poster_path} 
                  alt={movie.title} 
                  className="w-full h-60 object-cover brightness-90"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="text-white font-medium truncate">{movie.title}</h3>
                  <p className="text-gray-300 text-xs mt-1">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <div className="text-sm flex items-center justify-between mt-2">
                    <p className="flex items-center gap-1 text-gray-400">
                      <StarIcon className="w-4 h-4 text-primary fill-primary"/>
                      {movie.vote_average.toFixed(1)}
                    </p>
                    <p className="text-gray-300 text-xs">
                      {numeral(movie.vote_count).format('0.[0]a')} votes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md w-64">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input 
            type="number" 
            min={0} 
            value={showPrice} 
            className="outline-none w-full bg-transparent" 
            placeholder="enter show price" 
            onChange={(e) => setShowPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg w-full max-w-md">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md w-full bg-transparent"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer whitespace-nowrap"
          >
            Add Time
          </button>
        </div>
      </div>

      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Added Show Times</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <div key={date} className="border border-gray-600 rounded-lg p-3">
                <p className="font-medium text-sm">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {times.map((time) => (
                    <div 
                      key={time} 
                      className="bg-primary text-white px-3 py-1.5 rounded-md flex items-center"
                    >
                      <span className="text-sm">
                        {time.substring(0, 5)}
                      </span>
                      <button 
                        onClick={() => handleRemoveTime(date, time)}
                        className="ml-2 text-white/80 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-8 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition font-medium"
      >
        Create Shows
      </button>
    </div>
  ) : (
    <Loader />
  );
};

export default AddShows;