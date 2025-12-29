import { LogOut, Menu, User, X } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react'
import { useRef } from 'react';
import {useNavigate} from "react-router-dom";
import { assets, SIDE_BAR_DATA } from '../assets/assests'; // Import SIDE_BAR_DATA
import { AppContext } from '../context/AppContext';

const Menubar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const {user, clearUser} = useContext(AppContext);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setOpenSideMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (openSideMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openSideMenu]);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  }

  const handleMobileNavigation = (path) => {
    navigate(path);
    setOpenSideMenu(false);
  }

  return (
    <div className='flex items-center justify-between gap-5 bg-white border-b border-gray-200 px-4 py-3 shadow-sm sticky top-0 z-50'>
      {/* Left side - menu button and title */}
      <div className='flex items-center gap-4'>
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className='block lg:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-all duration-200 hover:scale-105'
          aria-label="Toggle mobile menu">
          {openSideMenu ? (
            <X className='w-6 h-6' />
          ) : (
            <Menu className='w-6 h-6' />
          )}
        </button>

        <div className='flex items-center gap-3'>
          <img
            src={assets.logo}
            alt='logo'
            className='h-10 w-10 rounded-lg shadow-md'
          />
          <span className='text-xl font-bold text-gray-800 truncate bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
            Money Manager
          </span>
        </div>
      </div>

      {/* Right side - avatar dropdown */}
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className='flex items-center justify-center w-11 h-11 bg-gradient-to-br from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 rounded-full transition-all duration-200 hover:scale-105 shadow-md border-2 border-purple-200'
          aria-label="User menu">
          <User className='w-5 h-5 text-purple-600' />
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl border border-gray-200 shadow-xl z-10 overflow-hidden transform transition-all duration-200 ease-out">
            {/* User info */}
            <div className='px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full border-2 border-purple-200'>
                  <User className='w-5 h-5 text-purple-600' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-semibold text-gray-800 truncate'>
                    {user?.fullName || 'User'}
                  </p>
                  <p className='text-xs text-gray-500 truncate'>
                    {user?.email || 'No email'}
                  </p>
                </div>
              </div>
            </div>

            {/* Dropdown options */}
            <div className='py-2'>
              <button
                onClick={handleLogout}
                className='flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group'>
                <LogOut className='w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors duration-200' />
                <span className='font-medium'>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile side menu overlay - Fixed backdrop issue */}
      {openSideMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" 
            onClick={() => setOpenSideMenu(false)}
          />
          
          {/* Mobile menu */}
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={assets.logo} alt='logo' className='h-10 w-10 rounded-lg shadow-md' />
                  <span className='text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
                    Money Manager
                  </span>
                </div>
                <button
                  onClick={() => setOpenSideMenu(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-white/50 transition-colors">
                  <X className='w-5 h-5' />
                </button>
              </div>
            </div>
            
            {/* User info in mobile menu */}
            <div className='p-6 border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full border-2 border-purple-200'>
                  <User className='w-6 h-6 text-purple-600' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-base font-semibold text-gray-800 truncate'>
                    {user?.fullName || 'User'}
                  </p>
                  <p className='text-sm text-gray-500 truncate'>
                    {user?.email || 'No email'}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile navigation menu */}
            <div className="p-4 space-y-2">
              <div className='mb-4'>
                <h6 className='text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3'>
                  Navigation
                </h6>
              </div>
              
              {SIDE_BAR_DATA.map((item, index) => (
                <button
                  key={`mobile_menu_${item.id}`}
                  onClick={() => handleMobileNavigation(item.path)}
                  className='w-full flex items-center gap-4 text-sm font-medium py-4 px-4 rounded-xl transition-all duration-200 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 group'>
                  <div className='transition-all duration-200 text-gray-500 group-hover:text-purple-500'>
                    <item.icon className='w-5 h-5' />
                  </div>
                  <span className='transition-all duration-200'>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile logout button */}
            <div className='p-4 border-t border-gray-100 mt-auto'>
              <button
                onClick={handleLogout}
                className='w-full flex items-center gap-4 text-sm font-medium py-4 px-4 rounded-xl transition-all duration-200 text-left text-red-600 hover:bg-red-50 group'>
                <LogOut className='w-5 h-5' />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Menubar