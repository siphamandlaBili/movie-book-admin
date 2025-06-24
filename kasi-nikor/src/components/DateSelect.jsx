import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DateSelect = ({ dateTime, id }) => {
    const [selected,setSelected] = useState(null);
    const navigate = useNavigate();

    const onDateSelect = () => {
        if(!selected){
            return toast.error('Please select a date first');
        }

        navigate(`/movie/${id}/${selected}`);
        scrollTo(0,0);
    }
  return (
    <div id='dateSelect' className='pt-20 pb-10'>
      <div className='relative p-8 bg-gray-900/50 border border-primary/30 rounded-xl backdrop-blur-sm overflow-hidden'>
        {/* Background elements */}
        <BlurCircle top='-100px' left='-100px' opacity={0.3} />
        <BlurCircle top='100px' left='0px' opacity={0.2} />
        
        {/* Glow effect */}
        <div className='absolute inset-0 rounded-xl pointer-events-none border border-primary/10' />
        <div className='absolute -inset-1 rounded-xl bg-primary/5 blur-md pointer-events-none' />

        <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8'>
          <div className='w-full md:w-auto'>
            <p className='text-xl font-semibold text-white mb-1'>Select Date & Time</p>
            <p className='text-sm text-gray-400 mb-5'>Choose your preferred showtime</p>
            
            <div className='flex items-center gap-4'>
              <button className='p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all text-primary'>
                <ChevronLeft size={24} />
              </button>
              
              <div className='flex-1 overflow-x-auto no-scrollbar'>
                <div className='flex gap-3 py-2 w-max'>
                  {Object.keys(dateTime).map((date,index) => (
                    <button 
                    onClick={() => setSelected(date)}
                      key={date} 
                      className={`flex flex-col items-center justify-center h-16 w-16 rounded-lg cursor-pointer transition-all
                      ${selected === date ? 'bg-primary text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
                    >
                      <span className='text-lg font-medium'>{new Date(date).getDate()}</span>
                      <span className='text-xs uppercase tracking-wider'>
                        {new Date(date).toLocaleDateString('en-US', { month: "short" })}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <button className='p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all text-primary'>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <button className='w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-primary/20' onClick={() => onDateSelect(selected)}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default DateSelect