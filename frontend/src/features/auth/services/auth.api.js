import axios from "axios"


const api=axios.create({
    baseURL:'https://interview-project-20e3.onrender.com/api/auth',
    withCredentials:true
})

export async function register({username,email,password}){
    try{
        const response= await api.post('/register',{
           username,email,password  
         },{
        withCredentials:true //access to read the cookies
    })
    return response.data
    } catch(e) {
       console.log(e.response.data);
    }
    
}

export async function login({email,password}){
    try{
         const response = await api.post("/login",{
            email,password
         },{
            withCredentials:true
         })
        
        return response.data
    }
    catch(e){
        if (e.response && e.response.data) {
      return e.response.data;   // return backend error message
     }

    return { message: "Network error" };
    }
}

export async function logout() {
    try{
        const response = await api.get("/logout")
        return response.data
    }
    catch(e){
        console.log(e);
    }
}

export async function getMe() {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const response = await api.get("/get-me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch(e) {
        console.log(e.response?.data);
        return null;
    }
}
















//     Frontend data send karta hai backend ko  using Axios
//  Backend data process karke response return karta hai
// Frontend response ke basis pe UI update karta hai