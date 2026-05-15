import { Link } from "react-router-dom";


const Layout = () => {
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

        <footer>
            <Link to={"/about"}>
                <button>About</button>
            </Link>
            <Link to={"/contact"}>
                <button>Contact</button>
            </Link>
        </footer>
    </>
  )
}

export default Layout