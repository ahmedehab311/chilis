/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Hero, Main, Menu, Footer, LoginPage, MainLayout, ForgetPass, Register } from "./components/header/index";
import Error from "./components/header/pages/Error";
import Profile from "./components/header/pages/profile"; 
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header';  
import Card from "./components/Menu/Card"
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
                {/* <Card/> */}
                <Footer />
              </>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage setToken={setToken} setUserData={setUserData} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/forgot-password" element={<ForgetPass setToken={setToken} />} />
        <Route path="/profile" element={<Profile userData={userData} />} />
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
      // Optionally fetch user data from API if needed
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <AppContent token={token} setToken={setToken} userData={userData} setUserData={setUserData} />
      </Router>
    </>
  );
}

export default App;
