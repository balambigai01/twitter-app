
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/Home/HomePage.jsx"
import LoginPage from "./Pages/auth/Login/LoginPage.jsx"
import SignUpPage from "./Pages/auth/signup/SignUpPage.jsx"
import NotificationPage from "./Pages/notification/NotificationPage.jsx"
import ProfilePage from "./Pages/profile/ProfilePage.jsx"
import Sidebar from "./components/common/sideBar.jsx"
import RightPanel from "./components/common/RightPanel.jsx"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "./components/common/LoadingSpinner.jsx"

function App() {
 const {data:authUser,isLoading}=useQuery({
queryKey:["authUser"],
queryFn:async()=>{
  try {
    const res=await fetch("/api/auth/me")
    const data=await res.json()
    if(data.error) return null;
    if(!res.ok){
      throw new Error(data.error || "something went wrong")
    }
    console.log("authuser is here:",data)
    return data
  } catch (error) {
    throw new Error(error)
  }
},
retry:false
 })
 if(isLoading){
  return(
    <div className="h-screen flex justify-center items-center">
      <LoadingSpinner size="lg"></LoadingSpinner>
    </div>
  )
 }
  return (
    <div className='flex max-w-6xl mx-auto'>
    {authUser && <Sidebar/> }  
        <Routes>
          <Route path="/" element={authUser?<HomePage />: <Navigate to="/login"/>}/>
          <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
          <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
          <Route path="/notifications" element={authUser?<NotificationPage/>:<Navigate to="/login"/>}/>
          <Route path="/profile/:username" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
        </Routes>
      {authUser && <RightPanel/> } 
       <Toaster/> 
    </div>
  )
}

export default App
