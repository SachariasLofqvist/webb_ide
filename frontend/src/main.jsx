import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import About from '../pages/About.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Contact from '../pages/Contact.jsx';
import Login from '../pages/Login.jsx';
import NotFound from '../pages/NotFound.jsx';

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/dashboard", element: <Dashboard />},
  {path: "/about", element: <About />},
  {path: "/contact", element: <Contact />},
  {path: "/login", element: <Login />},
  {path: "*", element: <NotFound />}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
