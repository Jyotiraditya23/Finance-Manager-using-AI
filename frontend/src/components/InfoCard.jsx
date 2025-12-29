import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className='bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300'>
      <div 
        className='w-12 h-12 rounded-full flex items-center justify-center mb-4'
        style={{ backgroundColor: `${color}15` }}
      >
        <div style={{ color: color }}>
          {icon}
        </div>
      </div>
      <div className='space-y-1'>
        <h6 className='text-sm text-gray-500 mb-1 font-medium'>{label}</h6>
        <span className='text-[22px] font-bold text-gray-800'>&#8377;{value}</span>
      </div>
    </div>
  )
}

export default InfoCard