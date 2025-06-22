import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { MenuIcon, SearchIcon, TicketPlus, User, XIcon } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  
  const handleChoiceClick = () => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Movies', path: '/movies' },
    { label: 'Theaters', path: '/' },
    { label: 'Favorites', path: '/favorites' },
  ];

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">

      {/* Logo */}
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="logo" className="w-36 h-auto hover:opacity-90 transition-opacity" />
      </Link>

      {/* Navbar Links */}
      <div
        className={`
          max-md:fixed max-md:top-0 max-md:left-0 max-md:bg-[#6045F8]/90 
          max-md:flex-col  max-md:justify-center max-md:items-center max-md:pt-20
          transition-all duration-300 ease-in-out
          flex md:flex-row gap-8
          ${isOpen ? 'max-md:w-full max-md:h-screen backdrop-blur-lg' : 'max-md:w-0 max-md:h-0 max-md:overflow-hidden'}
          md:static md:w-auto md:h-auto md:bg-transparent md:overflow-visible
        `}
      >
        {/* Mobile Close Icon */}
        <XIcon
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-5 right-6 w-8 h-8 cursor-pointer text-white hover:text-gray-300"
        />

        {/* Links */}
        {navLinks.map(({ label, path }) => (
          <Link
            key={label}
            onClick={handleChoiceClick}
            to={path}
            className="text-gray-300 hover:text-white font-medium transition-colors relative group"
          >
            {label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6045F8] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer text-gray-300 hover:text-white" />
        {!user ? (
          <button 
            onClick={openSignIn} 
            className="px-4 py-1 sm:px-7 sm:py-2 bg-[#6045F8] hover:bg-[#4B36C9] text-white font-medium rounded-full transition-all shadow-lg hover:shadow-[#6045F8]/30"
          >
            Login
          </button>
        ) : (
          <UserButton appearance={{
            elements: {
              userButtonAvatarBox: "w-9 h-9",
              userButtonPopoverCard: "bg-gray-800 border border-gray-700",
              userButtonPopoverActionButtonText: "text-gray-200",
              userButtonPopoverActionButton: "hover:bg-gray-700",
            }
          }}>
            <UserButton.MenuItems>
              <UserButton.Action 
                label='My Bookings' 
                labelIcon={<TicketPlus width={15} />} 
                onClick={() => navigate('/my-bookings')} 
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <MenuIcon
        onClick={() => setIsOpen(true)}
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer text-white hover:text-gray-300"
      />
    </div>
  );
};

export default Navbar;