import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Session } from './ProtectedRoutes'

function PrivateRoutes({ children }) {

    const {
        loading,
        userIdentity,
        principalId,
        userData
    } = Session()

    const location = useLocation()

    const privateRoutes = [ '/portal', '/inbox', '/dashboard', '/projects', '/taskspage' ]

    if (loading) {
        return (
            <div className="loading"> <p>©2025 Reverion Technologies Co.</p> </div>
        )
    }

    if (!loading) {
    
        if (userIdentity && principalId && userData && ((userData.userType === 'User' && userData.userLevel === 'L1'))) {
            if ((privateRoutes.includes(location.pathname))) {
                return children
            } else {
                return <Navigate to="/portal" />
            }
        }
    }

    return children
}

export default PrivateRoutes