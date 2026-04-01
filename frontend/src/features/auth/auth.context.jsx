import{createContext,useState} from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const[user,setUser]=useState(null)
    const[loading,setloading]=useState(true)
     
// createContext() → banaya context
//.Provider → data dene ke liye use kiya
// value={{...}} → jo data dena hai
//{children} → jinhe data milega

    return(
        <AuthContext.Provider value={{user,setUser,loading,setloading}}>                             
            {children}
        </AuthContext.Provider>
    ) 

}