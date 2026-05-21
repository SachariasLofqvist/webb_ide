import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import About from "../pages/About.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Contact from "../pages/Contact.jsx";
import Login from "../pages/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import Landing from "../pages/Landing.jsx";
import File from "../pages/File.jsx";
import Create from "../pages/Create.jsx";
import Demo from "../pages/Demo.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/demo", element: <Demo /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/create", element: <Create /> },
  { path: "/dashboard/:id", element: <File /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
