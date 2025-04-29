import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Component then layout
import Navbarlayout from '../component/layout/Navbarlayout'

// Pages 
import Hero from '../pages/Hero'
import Product from '../pages/Product'
import Pricing from '../pages/Pricing'

const Approutes = () => {
  return (
      <Routes >
        
        {/* Public routes */}
         <Route element={<Navbarlayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>
      </Routes>

  )
}

export default Approutes