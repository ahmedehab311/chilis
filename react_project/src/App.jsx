import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Hero, Main, Menu, Footer, LoginPage, MainLayout, ForgetPass, Register } from "./components/header/index";
import Error from "./components/header/pages/Error"; 
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState();

  // eslint-disable-next-line no-unused-vars
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  };

  useEffect(() => {
    fetch("api", {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        'auth': `Token ${token}`,
      },
    })
    .then(result => {
   
    })
    .catch(error => {
    
    });
  }, [token]);

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
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPass />} />
          <Route path="*" element={<Error />} /> {/* مسار صفحة الخطأ */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
