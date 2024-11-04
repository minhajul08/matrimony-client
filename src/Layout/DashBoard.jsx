import { useContext } from "react";
import {  FaEdit, FaHome, FaUser } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const DashBoard = () => {
    const navigate = useNavigate ()
    const {logOut} = useContext (AuthContext)

    const handelLogout = () => {
        logOut()
          .then(() => { })
          .catch(error => console.log(error));
          navigate ('/');
    
      }
    return (
        <div className="flex min-h-screen">
           <div className="w-64 min-h-full bg-blue-400">
           <ul className="menu p-4 text-xl font-serif">
           <li> 
            <NavLink to='/'> <FaHome /> Home</NavLink>
           </li>
           <li> 
            <NavLink to='/dashboard/edit'> <FaEdit /> Edit BioData</NavLink>
           </li>
           <li> 
            <NavLink to='/dashboard/userHome'> <GrView /> View BioData</NavLink>
           </li>
           <li> 
            <NavLink to='/dashboard/userHome'> <FaUser></FaUser> My contract request</NavLink>
           </li>
           <li> 
            <NavLink to='/dashboard/favorite'> <MdOutlineFavorite />Favorites Biodata</NavLink>
           </li>
         <li><button onClick={handelLogout} className="bg-[#18719b] text-white btn rounded-full border-0">Logout</button></li>
           </ul>
           </div>
           <div className="flex-1">
           <Outlet></Outlet>
           </div>
        </div>
    );
};

export default DashBoard;