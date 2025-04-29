import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';

const Navbarlayout = () => {
    const customNavItems = [
        { name: 'Home', to: '/' },
        { name: 'Product', to: '/product' },
        { name: 'Pricing', to: '/pricing' },
      ];
  return (
         <div className="min-h-screen flex flex-col">
            <Navbar 
                imageLogoSrc= "/images/ReverionTechLogo-dark.png"
                navItems={customNavItems}
                showLogin={true}
                loginPath="/login"
                primaryColor="#212529"
                hoverColor="#6c757d"
            />
            <main className="pt-16">
                <Outlet />
            </main>
        </div>
  )
}

export default Navbarlayout