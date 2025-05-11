import React from 'react'
import {Routes, Route} from 'react-router-dom'

import { ProtectedRoutes } from './ProtectedRoutes'
import AccessRoutes from './AccessRoutes'
import PrivateRoutes from './PrivateRoutes'

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

        <ProtectedRoutes>

            <Routes >
                
                {/* Public routes */}
                <Route element={<Navbarlayout />}>
                    <Route path="/" element={<AccessRoutes><Hero /></AccessRoutes>} />
                    <Route path="/home" element={<AccessRoutes><Hero /></AccessRoutes>} />
                    <Route path="/product" element={<AccessRoutes><Product /></AccessRoutes>} />
                    <Route path="/pricing" element={<AccessRoutes><Pricing /></AccessRoutes>} />
                </Route>

                {/* Private routes */}
                <Route element={<Portal />}>
                    <Route path="/portal" element={<PrivateRoutes><Home /></PrivateRoutes>} />
                    <Route path="/inbox" element={<PrivateRoutes><Inbox /></PrivateRoutes>} />
                    <Route path="/dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
                    <Route path="/projects" element={<PrivateRoutes><Projects /></PrivateRoutes>} />
                    <Route path="/taskspage" element={<PrivateRoutes><TasksPage /></PrivateRoutes>} />
                </Route>

            </Routes>

        </ProtectedRoutes>

    )
}

export default Approutes