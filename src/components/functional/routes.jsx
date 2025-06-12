import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import AdminOrders from "@/pages/AdminOrders";
import AdminProducts from "@/pages/AdminProducts";
import AdminUsers from "@/pages/AdminUsers";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import Checkout from "@/pages/Checkout";
import Product from "@/pages/Product";
import Products from "@/pages/Products";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "adminorders", element: <AdminOrders /> },
      { path: "adminproducts", element: <AdminProducts /> },
      { path: "adminusers", element: <AdminUsers /> },
      { path: "profile", element: <Profile /> },
      { path: "register", element: <Register /> },
      { path: "checkout", element: <Checkout /> },
      { path: "products/:id", element: <Product /> },
      { path: "products", element: <Products /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);