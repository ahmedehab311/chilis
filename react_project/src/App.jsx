/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Hero, Main, Menu, Footer, LoginPage, MainLayout, ForgetPass, Register } from "./components/header/index";
import Error from "./components/header/pages/Error"; 
import {  useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [token, setToken] = useState();
  const [token2, setToken2] = useState();

  // eslint-disable-next-line no-unused-vars
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <>
                  <Hero />
                  <Main />
                  <Menu />
                  <Footer />
                </>
              }
            />
          </Route>
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken}/>} />
          <Route path="/forgot-password" element={<ForgetPass />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
