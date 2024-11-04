import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Home/Home/Login";
import Register from "../Pages/Home/Home/Register";
import BioDataPage from "../Pages/Home/Home/BioDataPage/BioDataPage";
import BioDataDetailsPage from "../Pages/Home/Home/BioDataDetailsPage/BioDataDetailsPage";
import PrivateRoutes from "./PrivateRoutes";
import DashBoard from "../Layout/DashBoard";
import BioData from "../Pages/DashBoard/BioData/BioData";
import Edit from "../Pages/DashBoard/Edit/Edit";
import Favorite from "../Pages/DashBoard/Favorite/Favorite";

  export const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path:'/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path:'/bioDatas',
          element: <BioDataPage></BioDataPage>
        },
        {
          path: '/bioDataDetails/:id',
          element: <PrivateRoutes>
            <BioDataDetailsPage></BioDataDetailsPage>
          </PrivateRoutes>
        }
      ]
    },
    {
      path:'dashboard',
      element:<DashBoard></DashBoard>,
      children:[
        {
          path: 'bioData',
          element: <PrivateRoutes>
            <BioData></BioData>
          </PrivateRoutes>
        },
        {
          path: 'edit',
          element: <Edit></Edit>
        },
        {
          path: 'favorite',
          element: <Favorite></Favorite>
        }
      ]
    }
  ]);