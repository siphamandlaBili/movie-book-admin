import React, { useState, useEffect } from 'react';
import Title from './Title';
import { dummyDashboardData } from '../../assets/assets';
import BlurCircle from '../../components/BlurCircle';
import Loader from '../../components/Loading';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to format date and time
  const formatShowDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Mimic API data fetching
  const fetchShows = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Use dummy data - in a real app, this would be an API call
      setShows(dummyDashboardData.activeShows);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch shows data');
      setLoading(false);
      console.error(err);
    }
  };

  const openShowDetails = (show) => {
    setSelectedShow(show);
    setIsModalOpen(true);
  };

  const closeShowDetails = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-6 md:px-8 flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 md:px-8">
        <Title text1="List" text2="Shows" />
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
          {error}
          <button 
            onClick={fetchShows}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:px-8 relative">
      <Title text1="List" text2="Shows" />
      
      <BlurCircle top="10%" left="-5%" />
      <BlurCircle bottom="10%" right="-5%" />
      
      {shows.length === 0 ? (
        <div className="mt-8 text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-500 text-lg">No active shows available</div>
          <div className="mt-2 text-gray-400">Create new shows to see them listed here</div>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto mt-6">
            <table className="min-w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-primary/10">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Movie Name</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Show Time</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Bookings</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shows.map((show) => {
                  const totalBookings = Object.keys(show.occupiedSeats).length;
                  const earnings = totalBookings * show.showPrice;
                  
                  if(totalBookings>0){
                  return (
                    <tr 
                      key={show._id} 
                      className="hover:bg-primary/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img 
                              className="h-12 w-12 rounded-md object-cover border border-gray-200" 
                              src={show.movie.poster_path} 
                              alt={show.movie.title} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{show.movie.title}</div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {show.movie.runtime} min
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        <div className="font-medium">{formatShowDateTime(show.showDateTime)}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(show.showDateTime).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          totalBookings > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {totalBookings} {totalBookings === 1 ? 'seat' : 'seats'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        <div className="font-bold">{currency}{earnings.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">
                          {currency}{show.showPrice} × {totalBookings}
                        </div>
                      </td>
                    </tr>
                  );
                  }
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden mt-6 grid grid-cols-1 gap-4">
            {shows.map((show) => {
              const totalBookings = Object.keys(show.occupiedSeats).length;
              const earnings = totalBookings * show.showPrice;
              
              if(totalBookings > 0){
              return (
                <div 
                  key={show._id} 
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-start">
                    <img 
                      className="h-20 w-14 rounded-md object-cover border border-gray-200" 
                      src={show.movie.poster_path} 
                      alt={show.movie.title} 
                    />
                    <div className="ml-4 flex-1">
                      <div className="font-medium text-gray-900">{show.movie.title}</div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {show.movie.runtime} min
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-500">Show Time</div>
                          <div className="text-sm font-medium">{formatShowDateTime(show.showDateTime)}</div>
                        </div>
                        
                        <button 
                          onClick={() => openShowDetails(show)}
                          className="bg-primary text-white px-3 py-1 rounded-md text-sm"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500">Bookings</div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        totalBookings > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {totalBookings} {totalBookings === 1 ? 'seat' : 'seats'}
                      </span>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500">Earnings</div>
                      <div className="text-sm font-medium">{currency}{earnings.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              );}

              return 0
            })}
          </div>
        </>
      )}

      {/* Show Details Modal */}
      {isModalOpen && selectedShow && (
  <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
      {/* Modal Header */}
      <div className="p-5 bg-gradient-to-r bg-primary  text-white rounded-t-xl flex justify-between items-center">
        <h3 className="text-xl font-bold">{selectedShow.movie.title}</h3>
        <button 
          onClick={closeShowDetails}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Modal Content */}
      <div className="p-5">
        <div className="flex justify-center mb-5">
          <img 
            className="h-64 w-44 rounded-lg object-cover shadow-md border-2 border-white"
            src={selectedShow.movie.poster_path} 
            alt={selectedShow.movie.title} 
          />
        </div>
        
        <div className="space-y-4">
          {/* Show Time */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Show Time</div>
              <div className="font-medium text-gray-800">
                {formatShowDateTime(selectedShow.showDateTime)}
              </div>
            </div>
          </div>
          
          {/* Runtime */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Runtime</div>
              <div className="font-medium text-gray-800">
                {selectedShow.movie.runtime} minutes
              </div>
            </div>
          </div>
          
          {/* Price */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Price</div>
              <div className="font-medium text-gray-800">
                {currency}{selectedShow.showPrice}
              </div>
            </div>
          </div>
          
          {/* Stats Container */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-100">
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Total Bookings</div>
              <div className="text-xl font-bold text-primary mt-1">
                {Object.keys(selectedShow.occupiedSeats).length}
              </div>
              <div className="text-xs text-gray-500 mt-1">Seats booked</div>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Earnings</div>
              <div className="text-xl font-bold text-primary mt-1">
                {currency}{(Object.keys(selectedShow.occupiedSeats).length * selectedShow.showPrice).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {currency}{selectedShow.showPrice} × {Object.keys(selectedShow.occupiedSeats).length}
              </div>
            </div>
          </div>
          
          {/* Booked Seats */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <h4 className="font-medium text-gray-800">Booked Seats</h4>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {Object.keys(selectedShow.occupiedSeats).length > 0 ? (
                Object.keys(selectedShow.occupiedSeats).map(seat => (
                  <span 
                    key={seat} 
                    className="bg-primary/10 text-primary-dark px-3 py-1.5 rounded-lg font-medium"
                  >
                    {seat}
                  </span>
                ))
              ) : (
                <div className="text-center w-full py-4 text-gray-500">
                  No seats booked yet
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Close Button */}
        <div className="mt-8">
          <button 
            onClick={closeShowDetails}
            className="w-full bg-gradient-to-r bg-primary hover:from-primary-dark hover:to-primary text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ListShows;