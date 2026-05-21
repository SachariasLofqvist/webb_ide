import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to={"/"}>
            <button className="btn btn-ghost text-xl">Home</button>
          </Link>
        </div>
        <div className="flex-none">
          <Link to={"/contact"}>
            <button className="btn btn-ghost text-xl">Sign Up</button>
          </Link>
        </div>
        <div className="flex-none">
          <Link to={"/demo"}>
            <button className="btn btn-ghost text-xl left">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
