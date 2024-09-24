/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Hero,Main,Menu,Footer,LoginPage,MainLayout,ForgetPass,SignUp} from "./components/header/index"
import { useEffect, useState } from "react";
function App() {
  // const [isLoding, setIsLoding] = useState([]);
  const [token, setToken] = useState();
  const handleError = (response) => {
    if (!Response.Ok) {
      throw Error(response.statusText);
    }
    return response.json();
  };
  useEffect(()=>{
    fetch("api",  {
      method:"GET", 
      headers:{
        'contant-type' :'application',
        'auth' :`Token ${token}`
      }
    })

    .then(result => {

    })
  })
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgetPass />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
