import React, { useEffect, useState } from 'react'
import { NFID } from "@nfid/embed"
import { Principal } from '@dfinity/principal'

function AuthWithII() {
    const [nfid, setNfid] = useState(null)
    const [delegation, setDelegation] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const initNFID = async () => {
        try {
            const nfIDInstance = await NFID.init({
            application: {
                name: "NFID Login",
                logo: "https://dev.nfid.one/static/media/id.300eb72f3335b50f5653a7d6ad5467b3.svg"
            },
            idleOptions: {
                idleTimeout: 600000,
                captureScroll: true,
                scrollDebounce: 100,
            },
            });
            setNfid(nfIDInstance);
        } catch (error) {
            setError("Failed to initialize NFID.")
        }
        };

        initNFID()
    }, [])


    const handleNFIDCall = async () => {

        const canisterArray = process.env.CANISTER_ID_NFID_LOGIN_BACKEND
        
        if (nfid) {
            try {
                const identity = nfid.getIdentity()
                console.log(identity)

                const delegationResult = await nfid.getDelegation({ targets: canisterArray })
                const theUserPrincipal = Principal.from(delegationResult.getPrincipal()).toText()
                console.log(theUserPrincipal)
                const isLogin = await nfid.getDelegationType()
                console.log(isLogin,'Delegation type')
                setDelegation(theUserPrincipal)
            } catch (error) {
                setError("Failed to get NFID delegation.")
            }
        } else {
        setError("NFID is not initialized.")
        }
    };
    return {
        nfid,
        delegation,
        error,
        handleNFIDCall
    }
}

export default AuthWithII