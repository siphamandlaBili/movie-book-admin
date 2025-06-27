import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets';
import Loader from '../components/Loading';
import BlurCircle from '../components/BlurCircle';

const MyBookings = () => {
const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBookings = async()=>{
    setBookings(dummyBookingData);
    setLoading(false);
  }

  useEffect(()=>{
    getBookings();
  },[])

  return !loading? (
    <div className='relative px-6 md:px-16 lg:px-40  pt-30 md:pt-40 min-h-[80vh]'>
      <BlurCircle top='100px' left='100px'/>
      <div>
        <BlurCircle bottom='0px' left='600px'/>
      </div>

      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

      {bookings.map((item,index)=>{

        console.log(item);
        return <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
          <div className='flex flex-col md:flex-row'>
            <img src={item?.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
            <div className='flex flex-col p-4'>
              <p className='text-lg font-semi-bold'>{item?.show.movie.title}</p>
              <p className='text-gray-400 text-sm'>{item?.show.movie.runtime}m</p>
              <p className='text-gray-400 text-sm mt-auto'>
  {new Date(item?.show.showDateTime).toLocaleString('en-US', {
    weekday: 'short',    // e.g., "Mon"
    month: 'short',      // e.g., "Jun"
    day: 'numeric',     // e.g., "30"
    hour: '2-digit',    // e.g., "02"
    minute: '2-digit',  // e.g., "30"
    hour12: true        // e.g., "AM/PM"
  })}
</p>
            </div>
          </div>
<div className='flex flex-col md:items-end md:text-right justify-between p-4'>
    <div className='flex items-center gap-4'>
      <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
      {!item.isPaid && <button className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer text-white'>Pay Now</button>}
    </div>

    <div className='text-sm'>
      <p className='text-end'><span className='text-gray-400'>Total Tickets</span> {item?.bookedSeats.length}</p>
      <p><span className='text-gray-400'>Seats Booked</span> {item?.bookedSeats.join(", ")}</p>
    </div>
</div>

        </div>
      })}
    </div>
  ) :
  (
    <Loader/>
  )
}

export default MyBookings
