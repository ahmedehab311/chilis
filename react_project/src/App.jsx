/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Main, Menu, Footer, LoginPage, MainLayout, ForgetPass, Register,Error,Profile,OrderOnline } from "./components/header/index";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";

const AppContent = ({ token, setToken, userData, setUserData }) => {
  const location = useLocation();
  const excludedPaths = ["/login", "/register", "/forgot-password", "/profile"];

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
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
        <Route path="/order-online" element={<OrderOnline />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

function App() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <AppContent
          token={token}
          setToken={setToken}
          userData={userData}
          setUserData={setUserData}
        />
      </Router>
    </>
  );
}

export default App;
