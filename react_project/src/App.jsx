// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import { useState, useEffect, useContext } from "react";
// import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// import { Main, Menu, Footer, LoginPage, MainLayout, ForgetPass, Register,Error,Profile,OrderOnline } from "./components/header/index";
// import { ToastContainer } from "react-toastify";
// import Header from "./components/header/Header";
// import { CartProvider } from "./components/hooks/CardContext";
// import { UserContext } from './components/hooks/UserContext';
// const AppContent = ({ token, setToken, userData, setUserData }) => {
//   const location = useLocation();
//   const excludedPaths = ["/login", "/register", "/forgot-password", "/profile", "/order-online"];
  
//   const handleLogout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };
//   const { setUser } = useContext(UserContext);

//   const handleLogin = (userData) => {
//     setUser(userData);
//   };


//   return (
//     <>
//       {!excludedPaths.includes(location.pathname) && (
//         <Header token={token} handleLogout={handleLogout} />
//       )}
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route
//             index
//             element={
//               <>
//                 <Main />
//                 <Menu />
//                 <Footer />
//               </>
//             }
//           />
//         </Route>
//         <Route
//           path="/login"
//           element={<LoginPage setToken={setToken} setUserData={setUserData} />}
//         />
//         <Route path="/register" element={<Register setToken={setToken} />} />
//         <Route
//           path="/forgot-password"
//           element={<ForgetPass setToken={setToken} />}
//         />
//         <Route path="/profile" element={<Profile userData={userData} />} />
//         <Route path="/order-online" element={<OrderOnline />} />
        
//         <Route path="*" element={<Error />} />
//       </Routes>
//     </>
//   );
// };
// export default AppContent
// import { useContext } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import { Main, Menu, Footer, LoginPage, MainLayout, ForgetPass, Register, Error, Profile, OrderOnline } from "./components/header/index";
// import Header from "./components/header/Header";
// import { UserContext } from './components/hooks/UserContext';

// const AppContent = ({ token, setToken, userData, setUserData }) => {
//   const { setUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     navigate("/login"); // استخدم navigate للانتقال إلى صفحة تسجيل الدخول
//   };

//   return (
//     <>
//       <Header token={token} handleLogout={handleLogout} />
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route
//             index
//             element={
//               <>
//                 <Main />
//                 <Menu />
//                 <Footer />
//               </>
//             }
//           />
//         </Route>
//         <Route
//           path="/login"
//           element={<LoginPage setToken={setToken} setUserData={setUserData} />}
//         />
//         <Route path="/register" element={<Register setToken={setToken} />} />
//         <Route
//           path="/forgot-password"
//           element={<ForgetPass setToken={setToken} />}
//         />
//         <Route path="/profile" element={<Profile userData={userData} />} />
//         <Route path="/order-online" element={<OrderOnline />} />
//         <Route path="*" element={<Error />} />
//       </Routes>
//     </>
//   );
// };

// export default AppContent;
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import { Main, Menu, Footer, LoginPage, MainLayout, ForgetPass, Register, Error, Profile, OrderOnline } from "./components/header/index";
// import { ToastContainer } from "react-toastify";
// import Header from "./components/header/Header";
// import { setUser, clearUser } from "./rtk/slices/userSlice"; // تأكد من أن المسار صحيح
// import { CartProvider } from "./components/hooks/CardContext";

// const AppContent = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const excludedPaths = ["/login", "/register", "/forgot-password", "/profile", "/order-online"];

//   const handleLogout = () => {
//     dispatch(clearUser()); // Clear user from the store
//     localStorage.removeItem("token");
//     navigate('/login'); // استخدم navigate للانتقال إلى صفحة تسجيل الدخول
//   };

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       // Optionally, you can also fetch user data based on the token here
//       dispatch(setUser({ token: storedToken })); // Set user data in the store
//     }
//   }, [dispatch]);

//   return (
//     <>
//       {!excludedPaths.includes(location.pathname) && (
//         <Header handleLogout={handleLogout} />
//       )}
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route
//             index
//             element={
//               <>
//                 <Main />
//                 <Menu />
//                 <Footer />
//               </>
//             }
//           />
//         </Route>
//         <Route
//           path="/login"
//           element={<LoginPage />}
//         />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/forgot-password"
//           element={<ForgetPass />}
//         />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/order-online" element={<OrderOnline />} />
//         <Route path="*" element={<Error />} />
//       </Routes>
//     </>
//   );
// };

// function App() {
//   return (
//     <>
//       <CartProvider>
//         <ToastContainer />
//         <Router>
//           <AppContent />
//         </Router>
//       </CartProvider>
//     </>
//   );
// }

// export default App;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Main, Menu, Footer, LoginPage, MainLayout, ForgetPass, Register,Error,Profile,OrderOnline } from "./components/header/index";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";
import { CartProvider } from "./components/hooks/CardContext";
import ChangePasswordFromProfile from "./components/pages/ChangePassFromProfile"
const AppContent = ({ token, setToken, userData, setUserData }) => {
  const location = useLocation();
  const excludedPaths = ["/login", "/register", "/forgot-password", "/profile", "/order-online","/change-password"];
  
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
        <Route path="/change-password" element={<ChangePasswordFromProfile />} />
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
    <CartProvider>
      <ToastContainer />
      <Router>
        <AppContent
          token={token}
          setToken={setToken}
          userData={userData}
          setUserData={setUserData}
        />
      </Router>
      </CartProvider>
    </>
  );
}

export default App;