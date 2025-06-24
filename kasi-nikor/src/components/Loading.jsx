import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing circle */}
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 1
          }}
        />
        
        {/* Text with fading animation */}
        <motion.p 
          className="text-white font-medium"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            repeat: Infinity,
            duration: 1.5
          }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  )
}

export default Loader