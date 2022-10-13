<<<<<<< HEAD
 import { BrowserRouter, Routes, Route } from "react-router-dom"
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext";

>>>>>>> franklinbranch

// pages & components

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import  Navbar from "./components/Navbar";
import Messenger from "./pages/Messenger";





function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar /> 
    
        <div className="pages">
          <Routes>

            <Route  
            
            path = "/"
            element = {user ? <Home /> : <Navigate to = "/login" />}
      
             />

            <Route 
            
            path="/login"
            element={!user ? <Login /> : <Navigate to = "/" />}
            
            
            />

            <Route 
            
            path="/signup"
            element={!user ? <Signup /> : <Navigate to = "/" />}
            
            
            />

<Route 
            
            path="/messenger"
            // element={!user ? <Navigate to = "/" />: <Messenger /> }
            element= {<Messenger />}
                      
            
            />

          </Routes>




        </div>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;

