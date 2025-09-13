import { useState } from "react"
import { UseUserContext} from './useUserContext'

export const menteeLogin = ()=>{
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const {dispatch} = UseUserContext()
    const login = async (email,password) =>{
        setError(null)
        setIsLoading(true)
        try {
            const response = await fetch('https://e-commerce-bn-project-a9qh.onrender.com/api/user/login',{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email,password})
            })
            const user = await response.json()
            if(!response.ok){
                setIsLoading(false)
                throw new Error(user.error)
            }else{
                localStorage.setItem('user',JSON.stringify(user))
                dispatch({type: "login",payload:user})
            }
        } catch (error) {
            setError(error.message)
        }   
    }

    return { login , error , isLoading}
}