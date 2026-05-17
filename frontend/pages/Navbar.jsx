import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <>
        <nav>
            <Link to={"/login"}>
                <button>Login</button>
            </Link>
            <Link to={"/signup"}>
                <button>Sign Up</button>
            </Link>
            <Link to={"/"}>
                <button>Home</button>
            </Link>
        </nav>
    </>
  )
}

export default Navbar