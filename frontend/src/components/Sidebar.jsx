import React, {useContext} from 'react'
import { AppContext } from '../context/AppContext';
import { User } from 'lucide-react';
import { SIDE_BAR_DATA } from '../assets/assests';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const {user} = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 sticky top-[61px] left-0 overflow-y-auto shadow-sm'>
      {/* User Profile Section */}
      <div className='p-6 border-b border-gray-100 bg-gradient-to-br from-purple-50 to-blue-50'>
        <div className='flex flex-col items-center justify-center gap-4'>
          {user?.profileImageUrl ? (
            <div className='relative group'>
              <img 
                src={user?.profileImageUrl || ""} 
                alt="profile image" 
                className='w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-purple-200 transition-all duration-300 group-hover:ring-purple-300 group-hover:scale-105'
              />
            <div className='absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
            </div>
          ) : (
            <div className='w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center border-4 border-white shadow-lg ring-2 ring-purple-200 transition-all duration-300 hover:ring-purple-300 hover:scale-105'>
              <User className='w-10 h-10 text-purple-600' />
            </div>
          )}
          
          <div className='text-center'>
            <h5 className='text-gray-900 font-semibold text-lg leading-6 mb-1'>
              {user?.fullName || "Welcome User"}
            </h5>
            <p className='text-gray-500 text-sm'>
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className='p-4 space-y-2'>
        <div className='mb-4'>
          <h6 className='text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3'>
            Navigation
          </h6>
        </div>
        
        {SIDE_BAR_DATA.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              onClick={() => navigate(item.path)}
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-sm font-medium py-3 px-4 rounded-xl transition-all duration-200 text-left group relative overflow-hidden ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-[1.02]' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600 hover:translate-x-1'
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className='absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full'></div>
              )}
              
              {/* Icon with enhanced styling */}
              <div className={`transition-all duration-200 ${
                isActive ? 'text-white' : 'text-gray-500 group-hover:text-purple-500'
              }`}>
                <item.icon className='w-5 h-5' />
              </div>
              
              {/* Label */}
              <span className='transition-all duration-200'>
                {item.label}
              </span>
              
              {/* Hover effect overlay */}
              {!isActive && (
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-200 rounded-xl'></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section - Optional */}
      <div className='absolute bottom-4 left-4 right-4'>
        <div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100'>
          <div className='text-center'>
            <div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2'>
              <span className='text-white text-sm font-bold'>💰</span>
            </div>
            <h6 className='text-sm font-semibold text-gray-800 mb-1'>
              Money Manager
            </h6>
            <p className='text-xs text-gray-500'>
              Track your finances easily
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;