import { AuthClient } from '@dfinity/auth-client'
import { createActor, canisterId } from 'declarations/reverion_engine'
import { HttpAgent } from '@dfinity/agent'

const network = process.env.DFX_NETWORK || "local"

const appName = "Reverion Technologies Co."

const identityProvider = network === 'ic'
    ? `https://nfid.one/authenticate/?applicationName=${encodeURIComponent(appName)}`
    : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/?${encodeURIComponent(appName)}`

const host = network === 'ic' ? "https://icp0.io" : "http://localhost:4943"

export async function authWithNFID() {

    try {

        const authClient = await AuthClient.create()
        
        return new Promise((resolve, reject) => {
            authClient.login({
                identityProvider,
                maxTimeToLive: BigInt(1 * 24 * 60 * 60 * 1000 * 1000 * 1000),
                onSuccess: async () => {
                    try {
                        const identity = authClient.getIdentity()
                        
                        const agent = new HttpAgent({ identity, host })
                        
                        if (network !== 'ic') {
                            await agent.fetchRootKey().catch(e => {
                                console.warn("Unable to fetch root key. Check to ensure that your local replica is running")
                            })
                        }
                        
                        const authenticatedActor = createActor(canisterId, {
                            agent
                        })
                        
                        resolve({ identity, authenticatedActor })
                    } catch (error) {
                        console.error(error)
                        reject(error)
                    }
                },
                onError: (error) => {
                    console.error(error)
                    reject(error)
                }
            })
        })

    } catch (error) {
        console.error(error)
        throw error
    }

}

export async function getIdentity() {

    try {

        const authClient = await AuthClient.create()
        
        if (await authClient.isAuthenticated()) {
            const identity = authClient.getIdentity()
            
            const agent = new HttpAgent({ identity, host })
            
            if (network !== 'ic') {
                await agent.fetchRootKey().catch(e => {
                    console.warn("Unable to fetch root key. Check to ensure that your local replica is running")
                    console.error(e)
                })
            }
            
            const authenticatedActor = createActor(canisterId, { agent })
            
            const principal = identity.getPrincipal().toString()
            
            if (principal === "2vxsx-fae") {
                console.warn("Still using anonymous principal despite being authenticated!")
                return null
            }
            
            return { identity, authenticatedActor }
        }

        return null

    } catch (error) {
        console.error(error)
        return null
    }

}

export async function signoutII() {

    try {

        const authClient = await AuthClient.create()
        await authClient.logout()

    } catch (error) {
        console.error(error)
    }

}