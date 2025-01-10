import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import BookPage from "../pages/books/BookPage";
import PrivateRoute from "./PrivateRoute";
import Orders from "../pages/orders/orders";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/manageBooks/ManageBooks";
import EditBook from "../pages/dashboard/editbook/EditBook";
import AddBook from "../pages/dashboard/addbook/AddBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/orders",
        element: <Orders/>
      },
      {
        path: "/about",
        element: <div>About</div>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/cart",
        element: <CartPage/>
      },
      {
        path: "/checkout",
        element: <PrivateRoute><CheckoutPage/></PrivateRoute>
      },
      {
        path: "/books/:id",
        element: <BookPage/>
      }
      
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin/>
  },
  {
    path: '/dashboard',
    element: <AdminRoute><DashboardLayout/></AdminRoute>,
    children: [
      {
        path: "",
        element: <AdminRoute><Dashboard/></AdminRoute>
      },
      {
        path: "add-new-book",
        element: <AdminRoute><AddBook/></AdminRoute>
      },
      {
        path: "edit-book/:id",
        element: <AdminRoute><EditBook/></AdminRoute>
      },
      {
        path: "manage-books",
        element: <AdminRoute><ManageBooks/></AdminRoute>
      }
    ]
  }
])

export default router;