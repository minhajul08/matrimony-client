import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import {
  RouterProvider,
  
} from "react-router-dom";
import { router } from './Routes/Routes';
import AuthProvider from './providers/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='w-[1280px] mx-auto'>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </div>
  </StrictMode>,
)
