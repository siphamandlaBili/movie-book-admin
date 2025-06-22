import React from 'react'

const BlurCircle = ({ top = "auto", left = "auto", right = "auto", bottom = "auto", color = "primary" }) => {
  const colorClasses = {
    primary: 'bg-[#6045F8]/30',
    secondary: 'bg-[#4B36C9]/30',
    accent: 'bg-[#EC0404]/30'
  }

  return (
    <div 
      className={`absolute z-0 h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full ${colorClasses[color]} blur-[100px] pointer-events-none`}
      style={{
        top,
        left,
        right,
        bottom
      }}
    />
  )
}

export default BlurCircle