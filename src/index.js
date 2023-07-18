import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import TableProductID from "./components/TableProductID";
import TableTastes from "./components/TableTastes";
import ProductCard from "./components/ProductCard";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Types from "./pages/Types";
import Models from "./pages/Models";
import Devices from "./pages/Devices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "adminpanel",
    element: <AdminPanel />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "brands",
        element: <Categories />,
      },
      {
        path: "types",
        element: <Types />,
      },
      {
        path: "models",
        element: <Models />,
      },
      {
        path: "devices",
        element: <Devices />,
      },
      {
        path: "categories/:productID",
        element: <TableProductID />,
      },
      {
        path: "categories/:productID/:thisProductID",
        element: <TableTastes />,
      },
      {
        path: "categories/:productID/:thisProductID/:tasteID",
        element: <ProductCard />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
