import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/assets';
import Loader from '../../components/Loading';
import Title from './Title';
import BlurCircle from '../../components/BlurCircle';

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Format date and time
  const formatDateTime = (dateTimeString) => {
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

  // Mock API call
  const getAllBookings = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="px-4 py-6 md:px-8 relative">
      <Title text1='List' text2='Bookings' />
      
      <BlurCircle top="10%" left="-5%" />
      <BlurCircle bottom="10%" right="-5%" />
      
      {bookings.length === 0 ? (
        <div className="mt-8 text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-500 text-lg">No bookings found</div>
          <div className="mt-2 text-gray-400">All bookings will appear here</div>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-primary/10">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Movie</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Show Time</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Seats</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking, index) => (
                  <tr key={index} className="hover:bg-primary/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img 
                            className="h-12 w-12 rounded-md object-cover border border-gray-200" 
                            src={booking.show.movie.poster_path} 
                            alt={booking.show.movie.title} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{booking.show.movie.title}</div>
                          <div className="text-xs text-gray-500">
                            {booking.show.movie.runtime} min
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      <div className="font-medium">{formatDateTime(booking.show.showDateTime)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(booking.show.showDateTime).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[120px]">
                        {booking.bookedSeats.map((seat, idx) => (
                          <span 
                            key={idx} 
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {seat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      {currency}{booking.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.isPaid 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {booking.isPaid ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {!booking.isPaid && (
                        <button className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-md text-sm transition-colors">
                          Collect
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden mt-6 grid grid-cols-1 gap-4">
            {bookings.map((booking, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-start">
                  <img 
                    className="h-20 w-14 rounded-md object-cover border border-gray-200" 
                    src={booking.show.movie.poster_path} 
                    alt={booking.show.movie.title} 
                  />
                  <div className="ml-4 flex-1">
                    <div className="font-medium text-gray-900">{booking.show.movie.title}</div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {booking.show.movie.runtime} min
                    </div>
                    
                    <div className="mt-2">
                      <div className="text-xs text-gray-500">Show Time</div>
                      <div className="text-sm text-gray-900 font-medium">{formatDateTime(booking.show.showDateTime)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-500">Seats</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {booking.bookedSeats.map((seat, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-900">Amount</div>
                    <div className="text-sm text-gray-900 font-medium">{currency}{booking.amount.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500">Status</div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.isPaid 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {booking.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                  
                  <div>
                    {!booking.isPaid && (
                      <button className="bg-primary text-white px-3 py-1.5 rounded-md text-sm">
                        Collect
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListBookings;