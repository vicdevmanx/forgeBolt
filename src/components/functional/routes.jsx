import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import Checkout from "@/pages/Checkout";
import Product from "@/pages/Product";
import Products from "@/pages/Products";
import ResetPassword from "@/pages/resetPassword";
import AdminOverview from "@/pages/AdminOverview";
import AdminCreateProduct from "@/pages/AdminCreateProduct";
import AdminGetUsers from "@/pages/AdminGetUsers";
import MyOrder from "@/pages/myOrder";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "admin-overview", element: <AdminOverview /> },
      { path: "create-product", element: <AdminCreateProduct /> },
      { path: "all-users", element: <AdminGetUsers /> },
      { path: "profile", element: <Profile /> },
      { path: "register", element: <Register /> },
      { path: "checkout", element: <Checkout /> },
      { path: "products/:id", element: <Product /> },
      { path: "products", element: <Products /> },
      { path: "my-order", element: <MyOrder /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);