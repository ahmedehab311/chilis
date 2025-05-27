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
  Profile,
  OrderOnline,
  OrderSuccessPage,
  OrderFailPage,
} from "./components/header/index";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./components/hooks/CardContext";
import ChangePasswordFromProfile from "./components/pages/ChangePassFromProfile";
import { useDispatch } from "react-redux";
import { setTotalItems } from "./rtk/slices/orderSlice";
import MyOrders from "./components/Menu/order/MyOrders/MyOrders";

import Locations from "./components/Locations/Locations";
import AboutUs from "./components/AboutUs/AboutUs";
import NotFound from "./components/pages/NoFound";
import { useNavigate } from "react-router-dom";
import Payment from "./components/Menu/order/OrderOnline/payment";
import PaymentSuccess from "./components/Menu/order/OrderOnline/payment/PaymentSuccess";
import PaymentFail from "./components/Menu/order/OrderOnline/payment/PaymentFail";
import PaymentFailPending from "./components/Menu/order/OrderOnline/payment/PaymentFailPending";
const AppContent = ({ token, setToken, userData, setUserData }) => {
  const location = useLocation();
  const excludedPaths = ["/*"];
const navigate = useNavigate()
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("api_token");
    localStorage.removeItem("user");
    localStorage.removeItem("counter");
    localStorage.removeItem("selectedAddress");
    localStorage.removeItem("activeIndex");
    window.location.href = "/";
  };

  return (
    <>
      {!excludedPaths.includes(location.pathname) && (
        <>
          <Header token={token} handleLogout={handleLogout} />
        </>
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
        <Route path="/locations" element={<Locations userData={userData} />} />
        <Route path="/about-us" element={<AboutUs userData={userData} />} />
        <Route
          path="/change-password"
          element={<ChangePasswordFromProfile />}
        />
        <Route path="/order-online" element={<OrderOnline />} />
        <Route path="/order-online/payment" element={<Payment />} />
        <Route
          path="/order-online/success/:orderCode"
          element={<OrderSuccessPage />}
        />
        <Route path="/order-online/fail" element={<OrderFailPage />} />
      <Route path="/order-online/payment/success/:orderCode" element={<PaymentSuccess />} />
      <Route path="/order-online/payment/fail/:orderCode" element={<PaymentFail />} />
      <Route path="/order-online/payment/failpending/:orderCode" element={<PaymentFailPending />} />
        <Route path="/my_orders" element={<MyOrders />} />
        <Route path="*" element={<NotFound />} />
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
