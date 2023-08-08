import "./App.css";
import Home from "./pages/home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useNavigate,
  Route,
} from "react-router-dom";
import Customers from "./pages/customers/Customers";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import Sales from "./pages/sales/Sales";
import Product from "./pages/product/Product";
import axios from "axios";
import Reports from "./pages/reports/Reports";
import Customer from "./pages/customer/Customer";
import SignUp from "./pages/signUp/SignUp";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  axios.defaults.baseURL = `http://localhost:3000`;
  const { currentUser } = useContext(AuthContext);
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      // element: <Layout />,
      element: currentUser ? <Layout /> : <Navigate to="/login" />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/customers", element: <Customers /> },
        { path: "/products", element: <Products /> },
        { path: "/sales", element: <Sales /> },
        { path: "/reports", element: <Reports /> },
        { path: "/customers/:id", element: <Customer /> },
        { path: "/products/:id", element: <Product /> },
      ],
    },
    {
      path: "/login",
      element: currentUser ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signUp",
      element: currentUser ? <Navigate to="/" /> : <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
