import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CreateUser from "./components/CreateUser.jsx"
import axios from 'axios';
import ListVMs from "./components/GetVMs.jsx";

axios.defaults.withCredentials = true;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<RegisterScreen />} />
      <Route path="/createvms" element={<CreateUser />} />
      <Route path="/getvms" element={<ListVMs />} />
      <Route path="" element={<PrivateRoute />}>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
