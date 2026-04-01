import{RouterProvider} from "react-router"
import {router} from "./app.route.jsx"
import{AuthProvider} from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"

function App() {
  return (
    <InterviewProvider>
        <AuthProvider>
            <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
    </InterviewProvider>
   
  )
}
export default App
