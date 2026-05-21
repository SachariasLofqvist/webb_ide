import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Contact from "../pages/Contact.jsx";
import NotFound from "../pages/NotFound.jsx";
import Landing from "../pages/Landing.jsx";
import Demo from "../pages/Demo.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/demo", element: <Demo /> },
  { path: "/contact", element: <Contact /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
