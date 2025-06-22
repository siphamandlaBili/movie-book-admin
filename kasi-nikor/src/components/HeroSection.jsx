import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate= useNavigate()
  return (
    <div className='relative flex items-center justify-start px-6 md:px-16 lg:px-36 h-screen w-full overflow-hidden'>
      {/* Background Image with Gradient Overlay */}
      <div className='absolute inset-0 z-0'>
        <div 
          className='absolute inset-0 bg-[url("/backgroundImage.png")] bg-cover bg-center bg-no-repeat'
          style={{
            backgroundPosition: 'center 30%'
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/30 to-transparent' />
      </div>
      
      {/* Content */}
      <div className='relative z-10 flex flex-col items-start justify-center gap-6 max-w-3xl mt-20'>
        <img 
          src={assets.marvelLogo} 
          alt="marvel logo" 
          className='max-h-11 lg:h-11 opacity-90 hover:opacity-100 transition-opacity duration-300'
        />
        
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#ec0404] to-[#f60313]'>
            Guardians
          </span>
          <br/>
          <span className='text-white'>of the Galaxy</span>
        </h1>

        <p className='text-lg text-gray-300 max-w-2xl'>
          A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.
        </p>

        <div className='flex flex-wrap items-center gap-4 text-gray-300 text-sm md:text-base'>
          <span className='bg-gray-800/60 px-3 py-1 rounded-full'>Sci-Fi</span>
          
          <div className='flex items-center gap-1 bg-gray-800/60 px-3 py-1 rounded-full'>
            <CalendarIcon className='w-4 h-4 text-[#6045F8]'/> 
            <span>2018</span>
          </div>

          <div className='flex items-center gap-1 bg-gray-800/60 px-3 py-1 rounded-full'>
            <ClockIcon className='w-4 h-4 text-[#6045F8]'/> 
            <span>2h 16m</span>
          </div>
        </div>

        <div className='flex gap-4 mt-6'>
          <button className='flex items-center gap-2 bg-[#6045F8] hover:bg-[#4B36C9] text-white font-medium px-6 py-3 rounded-full transition-all duration-300 group' onClick={() => navigate('/movies')}>
            Explore Movies
            <ArrowRight className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection