import { Link } from "react-router-dom"
<<<<<<< HEAD

const Navbar = () => {
=======
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }
>>>>>>> franklinbranch
    return (
        <header>
            <div className="container">
                <Link to="/">

                    <h2>KidzSnap</h2>
                </Link>
<<<<<<< HEAD
=======
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
>>>>>>> franklinbranch

            </div>

        </header>

    )
}

export default Navbar