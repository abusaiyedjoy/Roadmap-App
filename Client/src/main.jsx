import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './Pages/LandingPage.jsx';
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/signin",
        element: <SignIn/>
      },
      {
        path: "/signup",
        element: <SignUp/>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
