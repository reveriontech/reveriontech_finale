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
import Home from '../pages/Home'
import Inbox from '../pages/Inbox'
import Projects from '../pages/Projects'
import TasksPage from '../pages/TasksPage'


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
          <Route path="/portal" element={<Home />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/taskspage" element={<TasksPage />} />
        </Route>

      </Routes>

  )
}

export default Approutes