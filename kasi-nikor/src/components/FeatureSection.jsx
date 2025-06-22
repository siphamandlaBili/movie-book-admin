import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets, dummyShowsData } from '../assets/assets'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'
const FeatureSection = () => {
  const navigate = useNavigate()

  return (
    <div className='md:px-16 lg:px-20 xl:px-34 py-12'>
        <BlurCircle top='-10' right='6%' />
      <BlurCircle bottom='-60%' left='-12%' />
      <div className='relative flex items-center justify-between pb-8'>
        <div>
          <p >
            Now Showing
          </p>
        </div>
        <button 
          onClick={() => navigate('/movies')}
          className='group cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors'
        >
          View All
          <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1 text-[#6045F8] group-hover:text-[#4B36C9]'/>
        </button>
      </div>
      <div className='flex flex-wrap max-sm:justify-center gap-3 mt-3'>
        { dummyShowsData.slice(0,6).map((show)=>(
            <MovieCard key={show._id} movie={show}/>
        ))}
      </div>
      <div className='flex justify-center mt-20'>
        <button onClick={()=>{navigate('/movies'),scrollTo(0,0)}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
      </div>
    </div>
  )
}

export default FeatureSection