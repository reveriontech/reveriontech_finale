import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Landing path
import Navbarlayout from '../component/layout/Navbarlayout'

// Pages 
import Hero from '../pages/Hero'
import Product from '../pages/Product'
import Pricing from '../pages/Pricing'

//Portal Path
import Portal from '../pages/Portal'
import Dashboard from '../pages/Dashboard'


const Approutes = () => {
  return (
      <Routes >
        
        {/* Public routes */}
         <Route element={<Navbarlayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>

        {/* Private routes */}
        <Route path="/" element={<Portal />}>
          <Route path="/portal" element={<Dashboard />} />
        </Route>
      </Routes>

  )
}

export default Approutes