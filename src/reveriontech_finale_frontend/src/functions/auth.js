import { AuthClient } from '@dfinity/auth-client'
import { createActor, canisterId } from 'declarations/user_engine'
import { HttpAgent } from '@dfinity/agent'

const network = process.env.DFX_NETWORK || 'local'
const host = network === 'ic' ? 'https://icp0.io' : 'http://localhost:4943'

// NFID-specific identity provider and derivation origin
const identityProvider = `https://nfid.one/authenticate?canisterId=${canisterId}`
const derivationOrigin = typeof window !== 'undefined' ? window.location.origin : ''

/**
 * Login using NFID
 * @returns { identity, authenticatedActor }
 */
export async function authWithNFID() {
  try {
    const authClient = await AuthClient.create()

    return new Promise((resolve, reject) => {
      authClient.login({
        identityProvider,
        derivationOrigin,
        maxTimeToLive: 7 * 24 * 60 * 60 * 1e9, // 7 days
        onSuccess: async () => {
          try {
            const identity = authClient.getIdentity()
            const agent = new HttpAgent({ identity, host })

            if (network !== 'ic') {
              await agent.fetchRootKey().catch(e => {
                console.warn('Unable to fetch root key. Is your local replica running?')
              })
            }

            const authenticatedActor = createActor(canisterId, { agent })

            resolve({ identity, authenticatedActor })
          } catch (error) {
            console.error('Error after login success:', error)
            reject(error)
          }
        },
        onError: (error) => {
          console.error('Login failed:', error)
          reject(error)
        },
        // Optional: Customize popup window
        windowOpenerFeatures:
          'toolbar=0,location=0,menubar=0,width=400,height=600,left=100,top=100',
      })
    })
  } catch (error) {
    console.error('authWithNFID initialization failed:', error)
    throw error
  }
}

/**
 * Get current session if authenticated
 * @returns { identity, authenticatedActor } or null
 */
export async function getNFIDIdentity() {
  try {
    const authClient = await AuthClient.create()
    const isAuthenticated = await authClient.isAuthenticated()

    if (!isAuthenticated) return null

    const identity = authClient.getIdentity()
    const agent = new HttpAgent({ identity, host })

    if (network !== 'ic') {
      await agent.fetchRootKey().catch(e => {
        console.warn('Unable to fetch root key. Is your local replica running?')
        console.error(e)
      })
    }

    const authenticatedActor = createActor(canisterId, { agent })
    const principal = identity.getPrincipal().toString()

    if (principal === '2vxsx-fae') {
      console.warn('Anonymous principal detected even after authentication.')
      return null
    }

    return { identity, authenticatedActor }
  } catch (error) {
    console.error('getNFIDIdentity error:', error)
    return null
  }
}

/**
 * Logout from NFID session
 */
export async function signoutNFID() {
  try {
    const authClient = await AuthClient.create()
    await authClient.logout()
  } catch (error) {
    console.error('signoutNFID error:', error)
  }
}
