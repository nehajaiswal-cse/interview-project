import{useContext, useEffect} from "react";

import { AuthContext } from "../auth.context";
import { login, register, logout ,getMe} from "../services/auth.api";
//hooklayer handle state
export const useAuth=()=>{
    const context = useContext(AuthContext)
    const{user,setUser,loading,setloading} = context

    const handleLogin = async({email,password})=>{
        setloading(true)
        try{
            const data = await login({email,password})
            if (data?.token) {
              localStorage.setItem("token", data.token)
            }
            if (data?.user) {
              setUser(data.user)
            }
            return data
        }
       catch(e){
           console.error("Login error:", e)
           return null
        }
        finally{
            setloading(false)
        }
       
    }

    const handleRegister = async({username,email,password})=>{
        setloading(true)
        try{
           const data = await register({username,email,password})
            if (data?.token) {
              localStorage.setItem("token", data.token)
            }
            if (data?.user) {
              setUser(data.user)
            }
            return data
        }catch(err){
            console.error("Register error:", err)
            return null
        }
        finally{
           setloading(false)
        }
        
    }

    const handleLogout = async()=>{
         setloading(true)
        try{
           const data = await logout()
            setUser(null)
        }
        catch(err){
            
        }
       finally{
        setloading(false)
       }
        
    }

    useEffect(()=>{
        const getAndSetUser = async()=>{
           try {
            const res = await getMe()
            setUser(res?.user || null)
        } catch {
            setUser(null)
        } finally {
            setloading(false)
        }
        }
        getAndSetUser()
    },[])

    return{user,loading,handleRegister,handleLogin,handleLogout}
}