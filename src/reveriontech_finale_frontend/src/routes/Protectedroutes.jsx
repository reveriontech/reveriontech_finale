import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getIdentity, signoutII } from '../services/authWithNFID'

const SessionContext = createContext()

export const ProtectedRoutes = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [userIdentity, setUserIdentity] = useState(null)
    const [authenticatedActor, setAuthenticatedActor] = useState(null)
    const [principalId, setPrincipalId] = useState(null)
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    const privateRoutes = [ '/portal', '/inbox', '/dashboard', '/projects', '/taskspage' ]

    useEffect(() => {
        
        const checkSession = async () => {

            try {
                setLoading(true)

                const auth = await getIdentity()

                if (!auth) {
                    if (location.pathname !== '/' && location.pathname !== '/home' && location.pathname !== '/product' && location.pathname !== '/pricing') {
                        await signoutII()
                        navigate('/home')
                    }
                    return
                }

                if (auth) {
                    const { identity: userIdentity, authenticatedActor } = auth
                    const principalId = userIdentity.getPrincipal()

                    if (!authenticatedActor) {
                        if (location.pathname !== '/' && location.pathname !== '/home' && location.pathname !== '/product' && location.pathname !== '/pricing') {
                            await signoutII()
                            navigate('/home')
                        }
                        return
                    }
                    
                    setAuthenticatedActor(authenticatedActor)

                    const result = await authenticatedActor.getUser(principalId)

                    if (!result) {
                        if (location.pathname !== '/' && location.pathname !== '/home' && location.pathname !== '/product' && location.pathname !== '/pricing') {
                            await signoutII()
                            navigate('/home')
                        }
                        return
                    }

                    if (result.ok) {

                        setUserIdentity(userIdentity)
                        setPrincipalId(principalId)

                        if (!principalId) {
                            if (location.pathname !== '/' && location.pathname !== '/home' && location.pathname !== '/product' && location.pathname !== '/pricing') {
                                await signoutII()
                                navigate('/home')
                            }
                            return
                        }

                        const userData = result.ok
                        const shortUsername = userData.username.slice(0, 10)
                        userData.username = `${shortUsername}`
                        
                        if (!userData) {
                            if (location.pathname !== '/' && location.pathname !== '/home' && location.pathname !== '/product' && location.pathname !== '/pricing') {
                                await signoutII()
                                navigate('/home')
                            }
                            return
                        }

                        const userType = Object.keys(userData.userType)[0]
                        const userLevel = Object.keys(userData.userLevel)[0]

                        userData.userType = userType
                        userData.userLevel = userLevel
                        const username = userData.username
                        setUserData(userData)
                        
                        if (userType === 'User' && userLevel === 'L1') {
                            if (privateRoutes.includes(location.pathname)) {
                                navigate(privateRoutes)
                            } else {
                                navigate('/portal')
                            }
                        } else if (userType === 'Admin' && userLevel === 'L100') {
                            if (privateRoutes.includes(location.pathname)) {
                                navigate(privateRoutes)
                            } else {
                                navigate('/portal')
                            }
                        } else {
                            if (location.pathname !== '/' && location.pathname !== '/home' && location.pathname !== '/product' && location.pathname !== '/pricing') {
                                await signoutII()
                                navigate('/home')
                            }
                        }
                        
                    }
                }
                
            } catch (error) {
                if (location.pathname !== '/' && location.pathname !== '/home' && location.pathname !== '/product' && location.pathname !== '/pricing') {
                    await signoutII()
                    navigate('/home')
                }
            } finally {
                setTimeout(() => 
                    setLoading(false), 120
                )
            }
            
        }
        checkSession()

    }, [])

    return (
        <SessionContext.Provider value={{ loading, userIdentity, principalId, authenticatedActor, userData, setUserData, navigate, location }} >
            {children}
        </SessionContext.Provider>
    )
}

export const Session = () => {
    return useContext(SessionContext)
}