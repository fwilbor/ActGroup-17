
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SetAvatar from "./components/SetAvatar";
//import { useAuthContext } from "./hooks/useAuthContext";


// pages & components

import FileUpload from "./components/FileUpload";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import  Navbar from "./components/Navbar";
import Chat from "./pages/Messenger";





function App() {
  //const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar /> 
    
        <div className="pages">
          <Routes>

            <Route  
            
            path = "/"
            element = {<Home />}
      
             />

            <Route  
            
            path = "/uploads"
            element = {<FileUpload />}
      
             />
            <Route 
            
            path="/login"
            element={<Login />}
            
            
            />

            <Route 
            
            path="/signup"
            element={<Signup />}
            
            
            />

<Route 
            
            path="/messenger"
            // element={!user ? <Navigate to = "/" />: <Messenger /> }
            element= {<Chat />}
                      
            
            />

<Route 
            
            path="/setAvatar"
            // element={!user ? <Navigate to = "/" />: <Messenger /> }
            element= {<SetAvatar />}
                      
            
            />

            

          </Routes>




        </div>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;

