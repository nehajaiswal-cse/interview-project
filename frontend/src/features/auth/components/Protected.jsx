import {useAuth} from "../hooks/UseAuth";
import { Navigate } from "react-router";
import React from "react"


const Protected = ({children})=>{
    const{loading,user} = useAuth()
    
    if(loading){
        return (<main>Loading...</main>)
    }
    if(!user){
        return <Navigate to={"/login"}></Navigate>
    }

    return <>{children}</>

}
export default Protected