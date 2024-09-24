
import { Outlet, useLocation } from "react-router-dom";
// import Header from "../Header";

const MainLayout = ({ token, setToken }) => {
  const location = useLocation();
  const hideHeader = ["/login", "/register", "/forgot-password"].includes(location.pathname);

  return (
    <>
      {/* {!hideHeader && <Header token={token} setToken={setToken} />} */}
      <Outlet />
    </>
  );
};

export default MainLayout;

