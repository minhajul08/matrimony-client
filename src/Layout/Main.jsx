import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";



const Main = () => {
    const location = useLocation ();
    const noHeaderNoFooter = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
          { noHeaderNoFooter || <Navbar></Navbar> } 
            <Outlet></Outlet>
            { noHeaderNoFooter || <Footer></Footer> }
        </div>
    );
};

export default Main;