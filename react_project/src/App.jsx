/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Header,
  Main,
  Menu,
  Footer,
  LoginPage,
  MainLayout,
  ForgetPass,
  Register,
  Error,
  Profile,
  OrderOnline,
} from "./components/header/index";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./components/hooks/CardContext";
import ChangePasswordFromProfile from "./components/pages/ChangePassFromProfile";
import { useDispatch } from "react-redux";
import { setTotalItems } from "./rtk/slices/orderSlice";
import MyOrders from "./components/Menu/order/MyOrders/MyOrders";
import { Dialog } from "@mui/material";
import Locations from "./components/Locations/Locations";
const AppContent = ({ token, setToken, userData, setUserData }) => {
  const location = useLocation();
  const excludedPaths = [
    "/login",
    "/register",
    "/forgot-password",
    // "/change-password",
    "*"
  ];

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("api_token");
    localStorage.removeItem("user");
    localStorage.removeItem("counter");
    window.location.href = "/";
  };

  return (
    <>
      {!excludedPaths.includes(location.pathname) && (
        <Header token={token} handleLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <>
                <Main />
                <Menu />
                <Footer />
              </>
            }
          />
        </Route>
        <Route
          path="/login"
          element={<LoginPage setToken={setToken} setUserData={setUserData} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="/forgot-password"
          element={<ForgetPass setToken={setToken} />}
        />
        <Route path="/profile" element={<Profile userData={userData} />} />
        <Route path="/Locations" element={<Locations userData={userData} />} />
        <Route
          path="/change-password"
          element={<ChangePasswordFromProfile />}
        />
        <Route path="/order-online" element={<OrderOnline />} />
        <Route path="/my_orders" element={<MyOrders />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

function App() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // const storedToken = localStorage.getItem("api_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const storedTotalItems = localStorage.getItem("totalItems");
    if (storedTotalItems) {
      dispatch(setTotalItems(parseInt(storedTotalItems, 10)));
    }
  }, [dispatch]);

  //  useEffect(() => {
  //   // Reset the badge count to zero
  //   localStorage.setItem('totalItems', '0');
  //   dispatch(setTotalItems(0));
  // }, [dispatch]);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      document
        .getElementById(location.state.scrollTo)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]); 

  return (
    <>
      <CartProvider>
        <ToastContainer />
        <AppContent
          token={token}
          setToken={setToken}
          userData={userData}
          setUserData={setUserData}
        />
      </CartProvider>
    </>
  );
}

export default App;
