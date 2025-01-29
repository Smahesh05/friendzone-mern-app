import "bootstrap/dist/css/bootstrap.min.css";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import LoginScreen from "./pages/LoginScreen.jsx";
import ProfileScreen from "./pages/ProfileScreen.jsx";
import RegisterScreen from "./pages/RegisterScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
