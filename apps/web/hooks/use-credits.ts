import { BACKEND_URL } from "@/app/config"
import { useAuth } from "./useAuth"
import { useEffect, useState } from "react"
import { creditUpdateEvent } from "./usePayment"

export function useCredits(){
    const { getToken } = useAuth()
    const [ credits, setCredits ] = useState(0)
    const [ loading, setLoading ] = useState(true)
    const baseURL = BACKEND_URL

    const fetchCredits= async() => {
        try{
            const token = await getToken()

            if(!token) return

            const response = await fetch(`${baseURL}/payment/credits`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                cache: "no-store"
            })

            if(response.ok){
                const data = await response.json()
                setCredits(data.credits)
            }
            
        } catch (error) {
            console.error("Error fetching credits:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCredits()
        
        const handleCreditUpdate = (event: Event) => {
            if(event instanceof CustomEvent){
                if(event.detail){
                    setCredits(event.detail)
                }
                
            }
            fetchCredits()
        }

        creditUpdateEvent.addEventListener("creditUpdate", handleCreditUpdate)

        const interval = setInterval(fetchCredits, 60 * 1000)

        return () => {
            creditUpdateEvent.removeEventListener("creditUpdate", handleCreditUpdate)
            clearInterval(interval)
        }
    }, [])

    return {
        credits,
        loading
    }
}