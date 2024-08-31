// /* eslint-disable react/prop-types */
// import {
//   Badge,
//   Drawer,
//   IconButton,
//   Link,
//   Stack,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import logo from "../Hero/images/logo.png";
// function SmallMediaQuery({
//   closeDrawer,
//   toggleDrawer,
//   state,
//   handleLogout,
//   token,
// }) {
//   const isSmallScreen = useMediaQuery("(max-width:1000px)");

//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleNavigation = (sectionId) => {
//     if (isHomePage) {
//       document
//         .getElementById(sectionId)
//         ?.scrollIntoView({ behavior: "smooth" });
//     } else {
//       navigate("/", { state: { scrollTo: sectionId } });
//     }
//     closeDrawer();
//   };
//   // التحقق مما إذا كان المسار الحالي هو الصفحة الرئيسية
//   const isHomePage = location.pathname === "/";
//   return (
//     <>
//       {isSmallScreen && (
//         <>
//           <IconButton
//             onClick={toggleDrawer("right", true)}
//             sx={{
//               position: "absolute",
//               top: 0,
//               right: 0,
//               fontSize: "35px",
//               cursor: "pointer",
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//               padding: "8px",
//               borderRadius: "50%",
//               "&:hover": {
//                 backgroundColor: "rgba(0, 0, 0, 0.7)",
//               },
//             }}
//           >
//             <MenuIcon
//               sx={{ color: isHomePage ? "#fff" : "#000", fontSize: "35px" }}
//             />
//           </IconButton>
//           <Drawer
//             anchor={"right"}
//             open={state["right"]}
//             onClose={toggleDrawer("right", false)}
//             sx={{ ".MuiPaper-root": { height: "100%" } }}
//           >
//             <Link href="#menu" onClick={() => handleNavigation("menu")}>
//               <Typography
//                 sx={{
//                   color: "#fff",
//                   fontSize: "2rem",
//                   fontFamily: "cairo",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Menu
//               </Typography>
//             </Link>
//             <Link href="#about" onClick={() => handleNavigation("about")}>
//               <Typography
//                 sx={{
//                   color: "#fff",
//                   fontSize: "2.2rem",
//                   fontFamily: "cairo",
//                   fontWeight: "bold",
//                 }}
//               >
//                 About Us
//               </Typography>
//             </Link>
//             <Link href="#footer" onClick={() => handleNavigation("footer")}>
//               <Typography
//                 sx={{
//                   color: "#fff",
//                   fontSize: "2rem",
//                   fontFamily: "cairo",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Location
//               </Typography>
//             </Link>
//             <Link href="#footer" onClick={() => handleNavigation("footer")}>
//               <Typography
//                 sx={{
//                   color: "#fff",
//                   fontSize: "2rem",
//                   fontFamily: "cairo",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Contact Us
//               </Typography>
//             </Link>

//             {token && (
//               <Link
//                 component={RouterLink}
//                 to="/order-online"
//                 onClick={closeDrawer}
//               >
//                 {/* <IconButton */}

//                 <Badge
//                   color="error"
//                 >
//                   <ShoppingCartOutlinedIcon
//                     sx={{ fontSize: "3rem", color: "#fff" }}
//                   />
//                 </Badge>
//                 {/* </IconButton> */}
//               </Link>
//             )}

//             {token ? (
//               <>
//                 <Link
//                   component={RouterLink}
//                   to="/profile"
//                   onClick={closeDrawer}
//                 >
//                   <Typography
//                     sx={{
//                       color: "#fff",
//                       fontSize: "2rem",
//                       fontFamily: "cairo",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Profile
//                   </Typography>
//                 </Link>
//                 <Link
//                   component={RouterLink}
//                   to="/my_orders"
//                   onClick={closeDrawer}
//                 >
//                   <Typography
//                     sx={{
//                       color: "#fff",
//                       fontSize: "2rem",
//                       fontFamily: "cairo",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     My ordres
//                   </Typography>
//                 </Link>
//                 <Link
//                   onClick={() => {
//                     handleLogout();
//                     closeDrawer();
//                   }}
//                   sx={{ cursor: "pointer" }}
//                 >
//                   <Typography
//                     sx={{
//                       color: "#fff",
//                       fontSize: "2rem",
//                       fontFamily: "cairo",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Logout
//                   </Typography>
//                 </Link>
//               </>
//             ) : (
//               <Link component={RouterLink} to="/login" onClick={closeDrawer}>
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Login
//                 </Typography>
//               </Link>
//             )}
//             {location.pathname !== "/" && (
//           <Stack
//             direction="row"
//             alignItems="center"
//             sx={{ padding: "10px",justifyContent: "center" ,alignItems: "center" }}
//           >
//            <Link component={RouterLink} to="/"  onClick={closeDrawer}>
//            <img src={logo} alt="Logo" style={{ height: "45px" , width:"97px" }} />
//            </Link>
//           </Stack>
//         )}
//           </Drawer>
//         </>
//       )}
//     </>
//   );
// }

// export default SmallMediaQuery;

/* eslint-disable react/prop-types */
import {
  Badge,
  Drawer,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import logo from "../Hero/images/logo.png";
import { useSelector } from "react-redux";

function SmallMediaQuery({
  closeDrawer,
  toggleDrawer,
  state,
  handleLogout,
  token,
}) {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (sectionId) => {
    if (isHomePage) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    closeDrawer();
  };

  // التحقق مما إذا كان المسار الحالي هو الصفحة الرئيسية
  const isHomePage = location.pathname === "/";

  const handleCartClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/order-online");
    }
  };
  const totalItems = useSelector((state) => state.cart.totalItems);
  return (
    <>
      {isSmallScreen && (
        <>
          <IconButton
            onClick={toggleDrawer("right", true)}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              fontSize: "35px",
              cursor: "pointer",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "8px",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <MenuIcon
              sx={{ color: isHomePage ? "#fff" : "#000", fontSize: "35px" }}
            />
          </IconButton>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            sx={{ ".MuiPaper-root": { height: "100%" } }}
          >
            <Link href="#menu" onClick={() => handleNavigation("menu")}>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "2rem",
                  fontFamily: "cairo",
                  fontWeight: "bold",
                }}
              >
                Menu
              </Typography>
            </Link>
            <Link href="#about" onClick={() => handleNavigation("about")}>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "2.2rem",
                  fontFamily: "cairo",
                  fontWeight: "bold",
                }}
              >
                About Us
              </Typography>
            </Link>
            <Link href="#footer" onClick={() => handleNavigation("footer")}>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "2rem",
                  fontFamily: "cairo",
                  fontWeight: "bold",
                }}
              >
                Location
              </Typography>
            </Link>
            <Link href="#footer" onClick={() => handleNavigation("footer")}>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "2rem",
                  fontFamily: "cairo",
                  fontWeight: "bold",
                }}
              >
                Contact Us
              </Typography>
            </Link>

            <Stack
              sx={{ borderBottom: "1px solid #333" }}
              onClick={closeDrawer}
            >
              <IconButton
                aria-label="cart"
                onClick={handleCartClick}
                sx={{
                  display: "block",
                  margin: "10px auto",
                  p: 0,
                }}
              >
                <Badge
                  badgeContent={totalItems}
                  color="error"
                  invisible={totalItems === 0}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: "3rem", color: "#fff" }}
                  />
                </Badge>
              </IconButton>
            </Stack>

            {token ? (
              <>
                <Link
                  component={RouterLink}
                  to="/profile"
                  onClick={closeDrawer}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "2rem",
                      fontFamily: "cairo",
                      fontWeight: "bold",
                    }}
                  >
                    Profile
                  </Typography>
                </Link>
                <Link
                  component={RouterLink}
                  to="/my_orders"
                  onClick={closeDrawer}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "2rem",
                      fontFamily: "cairo",
                      fontWeight: "bold",
                    }}
                  >
                    My Orders
                  </Typography>
                </Link>
                <Link
                  onClick={() => {
                    handleLogout();
                    closeDrawer();
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "2rem",
                      fontFamily: "cairo",
                      fontWeight: "bold",
                    }}
                  >
                    Logout
                  </Typography>
                </Link>
              </>
            ) : (
              <Link component={RouterLink} to="/login" onClick={closeDrawer}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "2rem",
                    fontFamily: "cairo",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Typography>
              </Link>
            )}

            {location.pathname !== "/" && (
              <Stack
                direction="row"
                alignItems="center"
                sx={{ padding: "10px", justifyContent: "center" }}
              >
                <Link component={RouterLink} to="/" onClick={closeDrawer}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ height: "45px", width: "97px" }}
                  />
                </Link>
              </Stack>
            )}
          </Drawer>
        </>
      )}
    </>
  );
}

export default SmallMediaQuery;
