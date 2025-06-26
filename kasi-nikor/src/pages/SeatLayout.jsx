import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loader from '../components/Loading';
import { ClockIcon, ArrowRightIcon } from "lucide-react"
import BlurCircle from '../components/BlurCircle';
import toast from "react-hot-toast"

const SeatLayout = () => {
  const groupRows = [["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
  }
  
  const handleSeatClick = (seatId) => {
    if(!selectedTime) {
      return toast.error("Please select the time first");
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast.error("You can only select 5 seats");
    }
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]);
  }

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    navigate('/checkout');
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button 
              key={seatId} 
              onClick={() => handleSeatClick(seatId)} 
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer transition-all ${
                selectedSeats.includes(seatId) ? "bg-primary text-white scale-110" : "hover:bg-primary/10"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );

  // FIXED TIME FORMATTING FUNCTION
  const formatTime = (timeString) => {
    // Extract time from ISO string (HH:MM:SS format)
    const timePart = timeString.split('T')[1]?.split('.')[0] || timeString;
    const [hours, minutes] = timePart.split(':');
    const hoursInt = parseInt(hours, 10);
    const period = hoursInt >= 12 ? 'PM' : 'AM';
    const displayHours = hoursInt % 12 || 12;
    return `${displayHours}:${minutes} ${period}`;
  }

  const handleTimeSelect = (timeObj) => {
    setSelectedTime(timeObj);
  }

  useEffect(() => {
    getShow();
  }, [])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-40 gap-8'>
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-lg font-semi-bold px-6'>Available Time Slots</p>

        <div className='mt-5 space-y-1'>
          {show.dateTime[date].map((item, index) => (
            <div
              key={index}
              onClick={() => handleTimeSelect(item)}
              className={`flex items-center gap-2 px-6 py-2 w-full rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20'
              }`}
            >
              <ClockIcon className='w-4 h-4' />
              {/* Use fixed time formatting */}
              <p className='text-sm'>{formatTime(item.time)}</p>
            </div>
          ))}
        </div>
        
        {selectedSeats.length > 0 && (
          <div className="mt-8 pt-6 border-t border-primary/20 px-6">
            <h3 className="font-semibold mb-3">Your Selected Seats</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map(seat => (
                <div 
                  key={seat} 
                  className="bg-primary text-white px-3 py-1 rounded-full text-sm transition-transform hover:scale-105"
                >
                  {seat}
                </div>
              ))}
            </div>
            <p className="mt-4 font-medium">
              Total: <span className="text-lg">${selectedSeats.length * 12}</span>
            </p>
            <div className="group">
              <button 
                className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md active:scale-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRightIcon className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' left='-100px'/>
        <BlurCircle top='0' right='0'/>

        <h1 className='text-2xl font-semibold mb-4'>Select Your Seat</h1>
        <img src={assets.screenImage} alt="screen" className="transition-transform hover:scale-[1.01]" />
        <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

        <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
            {groupRows[0].map(row => renderSeats(row))}
          </div>

          <div className='grid grid-cols-2 gap-11'>
            {groupRows.slice(1).map((group, index) => (
              <div key={index}>
                {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default SeatLayout