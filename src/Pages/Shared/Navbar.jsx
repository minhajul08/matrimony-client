
import { Link } from "react-router-dom";
import logo from '../../../src/assets/logo.svg'
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const {user,logOut} = useAuth ()
  
  const handelLogout = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));

  }
    const navLinks = <>
    <li><Link to='/'>Home</Link></li>
    {/* <li><Link to='/'>{user?.displayName}</Link></li> */}
    <li><Link to='/biodatas'>Biodatas</Link></li>
    <li><Link to='/about'>About Us</Link></li>
    <li><Link to='/contract'>Contract Us</Link></li>
    <li><Link to='/dashboard/BioData'>Dashboard</Link></li>
    
     {
       user ? <>
       <li>
         <button onClick={handelLogout} className="bg-[#18719b] text-white btn rounded-full border-0">Logout</button></li>
     </> : <>
       <li><Link to="/login">Login</Link></li>
     </>
     }

    </>
    return (
        <div>
            <div className="navbar max-w-screen-xl text-white fixed z-10 bg-opacity-30 bg-black ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {navLinks}
      </ul>
    </div>
    <img className="w-16 h-12" src={logo} alt="" />
    <div className="text-xl w-12  h-12 font-bold ml-2">
      <h1 className="text-[#06684d]">Bangladeshi</h1>
      <h1 className="text-[#d73142]">Matrimony</h1> 
    </div>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navLinks}
    </ul>
  </div>
</div>
        </div>
    );
};

export default Navbar;