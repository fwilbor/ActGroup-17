import { Link } from "react-router-dom"
import logo from '../assets/logo.png';
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container" style={{ 
      backgroundColor: '#FFDB58', // Set background color to mustard
      borderRadius:'10px',     
    }}>
                <Link to="/splash">
                <img 
        src={logo} 
        alt="Company Logo" 
        style={{ 
          width: '100%',
          height: 'auto',
          maxWidth: '110px', 
          borderRadius:'20px',
          
        }} 
      />
                    
                </Link>

                <nav>
                    {user && (
                        <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                        </div>
                    )}

                </nav>


            </div>

        </header>

    )
}

export default Navbar