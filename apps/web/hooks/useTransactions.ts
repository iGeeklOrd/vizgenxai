import { BACKEND_URL } from "@/app/config";
import { Transaction } from "@/types";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useTransactions = () => {
    const { getToken } = useAuth()
    const [ transactions, setTransactions ] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchTranactions = async() => {
        setIsLoading(true)
        const token = getToken()

        if(!token) return

        try{
            const response = await axios.get(`${BACKEND_URL}/payment/transactions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = response.data
            setTransactions(data.transaction)
        } catch (error: any) {
            if (error instanceof AxiosError) {
        setError(error.response?.data.message || error.message);
      } else {
        setError(error.message || "An error occurred");
      }
    } finally {
        setIsLoading(false)
    }

    }

    useEffect(() => {
        fetchTranactions()
    }, [])

    return{
        transactions, 
        isLoading, 
        error
    }
}