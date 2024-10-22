import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Home/Home/Login";
import Register from "../Pages/Home/Home/Register";
import BioDataPage from "../Pages/Home/Home/BioDataPage/BioDataPage";
import BioDataDetailsPage from "../Pages/Home/Home/BioDataDetailsPage/BioDataDetailsPage";

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
          element: <BioDataDetailsPage></BioDataDetailsPage>
        }
      ]
    },
  ]);