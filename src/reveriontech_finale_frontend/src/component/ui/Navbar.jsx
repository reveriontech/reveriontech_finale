import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

// Ui component
import Button from './Button';

const Navbar = ({
  title = "Portfolio",
  imageLogoSrc = null,
  imageLogoAlt = "Logo",
  imageLogoHeight = 32,
  navItems = [
    { name: 'Hero', to: '/' },
    { name: 'Product', to: '/product' },
    { name: 'Pricing', to: '/pricing' },
  ],
  showLogin = true,
  loginPath = '/login',
  primaryColor = '#212529',
  hoverColor = '#c9184a',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path) => location.pathname === path;

  // Base navbar classes
  const baseClasses = 'w-full z-[9999] text-white rounded-xs fixed top-0 left-0 right-0 shadow-lg';
  
  // Mobile menu classes
  const mobileMenuClasses = `${isOpen ? 'block' : 'hidden'} md:hidden transition-all duration-300 ease-in-out`;
  
  // Render logo (image or text)
  const renderLogo = () => {
    if (imageLogoSrc) {
      return (
        <img 
          src={imageLogoSrc} 
          alt={imageLogoAlt} 
          className="h-auto transition-opacity duration-200 hover:opacity-80" 
          style={{ height: `${imageLogoHeight}px` }}
        />
      );
    }
    return title;
  };

  const LoginButton = () => (
    <Button 
      variant="outline" 
      size="md" 
      onClick={() => {}} 
      className="border-white text-white hover:bg-white/10"
    >
      <FaSignInAlt className="mr-2" />
      Login
    </Button>
  );

  return (
    <nav 
      className={`${baseClasses} ${className}`} 
      style={{ backgroundColor: primaryColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo (both mobile and desktop) */}
          <div className="flex-shrink-0 font-bold text-xl">
            <Link to="/" className="hover:text-gray-200 transition-colors duration-200 flex items-center">
              {renderLogo()}
            </Link>
          </div>

          {/* DESKTOP - Navigation menu */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <div className="flex justify-center space-x-[4px]">
              {navItems.map((item) => (
                <div key={item.name} className="px-3 py-2">
                  <Link 
                    to={item.to}
                    className={`relative flex items-center text-white hover:text-gray-200 transition-colors duration-200 ${
                      isActive(item.to) ? 'font-semibold' : ''
                    }`}
                  >
                    <span className="relative">
                      {item.name}
                      <span 
                        className={`absolute left-0 right-0 bottom-[-4px] h-0.5 bg-white transform origin-left transition-transform duration-300 ease-out ${
                          isActive(item.to) ? 'scale-x-100' : 'scale-x-0'
                        } hover:scale-x-100`}
                      ></span>
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Login button and mobile menu button container */}
          <div className="flex items-center">
            {/* DESKTOP - Login button area */}
            {showLogin && (
              <div className="hidden md:block ml-6">
                <Link to={loginPath}>
                  <LoginButton />
                </Link>
              </div>
            )}
            
            {/* MOBILE - Menu button (now on the right) */}
            <div className="md:hidden ml-4">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white transition duration-200"
                style={{ backgroundColor: isOpen ? hoverColor : 'transparent' }}
                onClick={toggleMenu}
                aria-expanded={isOpen}
              >
                <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE - Dropdown menu */}
      <div className={mobileMenuClasses}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3" style={{ borderTop: `1px solid ${hoverColor}` }}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-center px-3 py-2 rounded-md text-white hover:text-white transition-colors duration-200"
              style={{ backgroundColor: isActive(item.to) ? hoverColor : 'transparent' }}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
           {/* MOBILE - Login button */}
           {showLogin && (
            <div className="mt-4 px-3">
              <Link to={loginPath} className="w-full block" onClick={() => setIsOpen(false)}>
                <Button 
                  variant="outline" 
                  size="md" 
                  fullWidth
                  className="border-white text-white hover:bg-white/10"
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// PropTypes command
Navbar.propTypes = {
  title: PropTypes.string,          
  imageLogoSrc: PropTypes.string,     
  imageLogoAlt: PropTypes.string,    
  imageLogoHeight: PropTypes.number, 
  navItems: PropTypes.arrayOf(        
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ),
  showLogin: PropTypes.bool,         
  loginPath: PropTypes.string,       
  primaryColor: PropTypes.string,     
  hoverColor: PropTypes.string,      
  className: PropTypes.string,       
};

export default Navbar;