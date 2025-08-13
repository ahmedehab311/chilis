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
import useCleanFawaterkStyles from "./components/hooks/useCleanFawaterkStyles";
import GoHome from "./components/pages/GoHome";
const AppContent = ({ token, setToken, userData, setUserData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const excludedPaths = ["/*"];
  const isExcluded = excludedPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  useCleanFawaterkStyles();
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
  useEffect(() => {
    localStorage.removeItem("orderCode");
    if (location.pathname === "/order-online/payment") {
      navigate("/", { replace: true });
    }
  }, []);
  useEffect(() => {
    window.history.replaceState(null, "", window.location.href);
    const blockBack = () => {
      window.history.replaceState(null, "", window.location.href);
    };
    window.addEventListener("popstate", blockBack);
    return () => {
      window.removeEventListener("popstate", blockBack);
    };
  }, []);

  return (
    <>
      {!excludedPaths.includes(location.pathname) && (
        <>
          <Header token={token} handleLogout={handleLogout} />
        </>
      )}
      {/* {!isExcluded && <Header token={token} handleLogout={handleLogout} />} */}
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
          element={
            <GoHome token={token}>
              <ForgetPass setToken={setToken} />
            </GoHome>
          }
        />
        <Route
          path="/profile"
          element={
            <GoHome token={token}>
              <Profile userData={userData} />
            </GoHome>
          }
        />
        <Route path="/locations" element={<Locations userData={userData} />} />
        <Route path="/about-us" element={<AboutUs userData={userData} />} />
        <Route
          path="/change-password"
          element={
            <GoHome token={token}>
              <ChangePasswordFromProfile />
            </GoHome>

          }
        />
        <Route path="/order-online" element={<OrderOnline />} />
        <Route
          path="/order-online/payment"
          element={
            <GoHome token={token}>
              <Payment />
            </GoHome>
          }
        />
        <Route
          path="/order-online/success/:orderCode"
          element={
            <GoHome token={token}>
              <OrderSuccessPage />
            </GoHome>
          }
        />
        <Route
          path="/order-online/fail"
          element={
            <GoHome token={token}>
              <OrderFailPage />
            </GoHome>
          }
        />
        <Route
          path="/order-online/payment/success/:orderCode"
          element={
            <GoHome token={token}>
              <PaymentSuccess />
            </GoHome>
          }
        />
        <Route
          path="/order-online/payment/fail"
          element={
            <GoHome token={token}>
              <PaymentFail />
            </GoHome>
          }
        />
        <Route
          path="/order-online/payment/failpending/:orderCode"
          element={
            <GoHome token={token}>
              <PaymentFailPending />
            </GoHome>
          }
        />
        <Route
          path="/my-orders"
          element={
            <GoHome token={token}>
              <MyOrders />
            </GoHome>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

function App() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsTokenLoaded(true);
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
  if (!isTokenLoaded) return null;
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
