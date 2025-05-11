import React, { useState } from 'react'
import { authWithNFID, signoutII } from '../services/authWithNFID'

function AuthWithNFIDFunctions() {
    const [nfidUserIdentity, setNFIDUserIdentity] = useState(null)
    const [nfidAuthenticatedActor, setNFIDAuthenticatedActor] = useState(null)
    const [nfidPrincipalId, setNFIDPrincipalId] = useState(null)
    const [nfidIsSigningInAuth, setNFIDIsSigningInAuth] = useState(false)
    const [nfidUserData, setNFIDUserData] = useState(null)
    const [nfidSignInAuthError, setNFIDSignInAuthError] = useState(null)
    
    const handleSignInAuthWithNFID = async () => {
        setNFIDIsSigningInAuth(true)
        setNFIDSignInAuthError(null)
        
        try {
            const { identity: nfidUserIdentity, authenticatedActor: nfidAuthenticatedActor } = await authWithNFID()
            const principalId = nfidUserIdentity.getPrincipal()
            
            const existingUser = await nfidAuthenticatedActor.getUser(principalId)
            
            if (existingUser.ok) {
                const nfidUserData = existingUser.ok
                setNFIDUserIdentity(nfidUserIdentity)
                setNFIDAuthenticatedActor(nfidAuthenticatedActor)
                setNFIDPrincipalId(nfidPrincipalId)
                setNFIDUserData(nfidUserData)
                    
                window.location.reload()
                
            } else {
                const nfidResult = await nfidAuthenticatedActor.createUser(principalId)
                
                if (nfidResult.ok) {
                    const nfidUserData = nfidResult.ok
                    setNFIDUserIdentity(nfidUserIdentity)
                    setNFIDAuthenticatedActor(nfidAuthenticatedActor)
                    setNFIDPrincipalId(nfidPrincipalId)
                    setNFIDUserData(nfidUserData)
                    
                    window.location.reload()
                } else {
                    setNFIDSignInAuthError(nfidResult.err)
                }
            }
        } catch (error) {
            setNFIDSignInAuthError('Authentication Error. Please try again later.')
        } finally {
            setTimeout(() => {
                setNFIDIsSigningInAuth(false)
            }, 120)
        }
    }

    const handleSignOut = async () => {

        setIsSigningOut(true)

        try {

            const signout = await signoutII()

            if (signout) {
                if (location.pathname !== '/' && location.pathname !== '/home' && location.pathname !== '/product' && location.pathname !== '/pricing') {
                    await signoutII()
                    navigate('/home')
                }
                return
            } else {
                window.location.reload()
            }

        } catch (error) {
            console.error(error)
        } finally {
            window.location.reload()
            setTimeout(() => 
                setIsSigningOut(false), 800
            )
        }

    }
    
    return {
        nfidUserIdentity,
        setNFIDUserIdentity,
        nfidAuthenticatedActor,
        nfidPrincipalId,
        nfidUserData,
        nfidSignInAuthError,
        handleSignInAuthWithNFID,
        nfidIsSigningInAuth,
        setNFIDIsSigningInAuth,
        handleSignOut
    }
}

export default AuthWithNFIDFunctions