// /* eslint-disable react/prop-types */
// import "./Header.css";
// import { useState } from "react";
// import {
//   IconButton,
//   Link,
//   Stack,
//   useMediaQuery,
//   Menu,
//   MenuItem,
//   Typography,
//   Badge,
// } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import { Link as RouterLink } from "react-router-dom";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import Hero from "../Hero/Hero";
// import SmallMediaQuary from "./SmallMediaQuary";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// function Header({ token, handleLogout }) {
//   const [drawerState, setDrawerState] = useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setDrawerState({ ...drawerState, [anchor]: open });
//   };

//   const closeDrawer = () => {
//     setDrawerState({ ...drawerState, right: false });
//   };
//   const [anchorEl, setAnchorEl] = useState(null);
//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const isLargeScreen = useMediaQuery("(min-width:1000px)");
//   // const totalCounter = cartItems.reduce((total, item) => total + item.quantity, 0);
//   return (
//     <Stack className="hero">
//       <Stack sx={{ bgcolor: "#050304", p: 1, position: "relative" }}>
//         {useMediaQuery("(min-width:1000px)") && (
//           <>
//             <Stack
//               gap={2}
//               direction={"row"}
//               alignItems={"center"}
//               sx={{ textTransform: "uppercase", p: "10px !important" }}
//               className="headerMenu"
//             >
//               <LanguageOutlinedIcon
//                 sx={{
//                   fontSize: "30px",
//                   cursor: "pointer",
//                   color: "#777",
//                   mr: 5,
//                 }}
//               />
//               <Link href="#menu">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Menu
//                 </Typography>
//               </Link>{" "}
//               <Link href="#about">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   About Us
//                 </Typography>
//               </Link>
//               <Link href="#footer">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Location
//                 </Typography>
//               </Link>
//               <Link href="#footer">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Contact Us
//                 </Typography>
//               </Link>
//               {token ? (
//                 <Link component={RouterLink} to="/order-online">
//                   <ShoppingCartOutlinedIcon
//                     sx={{ fontSize: "3rem", mb: "-.8rem" }}
//                   />
//                 </Link>
//               ) : null}
            

//               {token ? (
//                 <>
//                   <IconButton
//                     size="large"
//                     aria-label="account of current user"
//                     aria-controls="menu-appbar"
//                     aria-haspopup="true"
//                     onClick={handleMenu}
//                     sx={{ color: "#fff", position: "absolute", right: "10px" }}
//                   >
//                     <AccountCircle sx={{ fontSize: "28px" }} />
//                   </IconButton>
//                   <Menu
//                     id="menu-appbar"
//                     anchorEl={anchorEl}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "right",
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                     sx={{
//                       mt: 1,
//                     }}
//                   >
//                     <MenuItem
//                       onClick={handleClose}
//                       component={RouterLink}
//                       to="/profile"
//                     >
//                       Profile
//                     </MenuItem>
//                     <MenuItem
//                       onClick={() => {
//                         handleLogout();
//                         handleClose();
//                       }}
//                     >
//                       Logout
//                     </MenuItem>
//                   </Menu>
//                 </>
//               ) : (
//                 <Link component={RouterLink} to="/login">
//                   <Typography
//                     sx={{
//                       color: "#fff",
//                       fontSize: "2.2rem",
//                       fontFamily: "cairo",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Login
//                   </Typography>
//                 </Link>
//               )}
//             </Stack>
//           </>
//         )}

//         {!isLargeScreen && (
//           <SmallMediaQuary
//             toggleDrawer={toggleDrawer}
//             closeDrawer={closeDrawer}
//             state={drawerState}
//             token={token}
//             handleLogout={handleLogout}
//           />
//         )}
//       </Stack>
//       <Hero />
//     </Stack>
//   );
// }

// export default Header;
/* eslint-disable react/prop-types */
// import "./Header.css";
// import { useState } from "react";
// import {
//   IconButton,
//   Link,
//   Stack,
//   useMediaQuery,
//   Menu,
//   MenuItem,
//   Typography,
//   Badge,
// } from "@mui/material";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import { Link as RouterLink } from "react-router-dom";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import Hero from "../Hero/Hero";
// import SmallMediaQuary from "./SmallMediaQuary";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// function Header({ token, handleLogout, cartItems = [] }) {
//   const [drawerState, setDrawerState] = useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setDrawerState({ ...drawerState, [anchor]: open });
//   };

//   const closeDrawer = () => {
//     setDrawerState({ ...drawerState, right: false });
//   };

//   const [anchorEl, setAnchorEl] = useState(null);
//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const isLargeScreen = useMediaQuery("(min-width:1000px)");
  
//   // حساب إجمالي عدد العناصر في العربة
//   const totalCounter = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
// console.log(totalCounter)
//   return (
//     <Stack className="hero">
//       <Stack sx={{ bgcolor: "#050304", p: 1, position: "relative" }}>
//         {useMediaQuery("(min-width:1000px)") && (
//           <>
//             <Stack
//               gap={2}
//               direction={"row"}
//               alignItems={"center"}
//               sx={{ textTransform: "uppercase", p: "10px !important" }}
//               className="headerMenu"
//             >
//               <LanguageOutlinedIcon
//                 sx={{
//                   fontSize: "30px",
//                   cursor: "pointer",
//                   color: "#777",
//                   mr: 5,
//                 }}
//               />
//               <Link href="#menu">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Menu
//                 </Typography>
//               </Link>{" "}
//               <Link href="#about">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   About Us
//                 </Typography>
//               </Link>
//               <Link href="#footer">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Location
//                 </Typography>
//               </Link>
//               <Link href="#footer">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Contact Us
//                 </Typography>
//               </Link>
//               {token ? (
//                 <Link component={RouterLink} to="/order-online">
//                   <Badge
//                     badgeContent={totalCounter}
//                     color="error"
//                     sx={{ fontSize: "1.5rem", mr: 1 }}
//                   >
//                     <ShoppingCartOutlinedIcon sx={{ fontSize: "3rem", mb: "-.8rem" }} />
//                   </Badge>
//                 </Link>
//               ) : null}
//               {token ? (
//                 <>
//                   <IconButton
//                     size="large"
//                     aria-label="account of current user"
//                     aria-controls="menu-appbar"
//                     aria-haspopup="true"
//                     onClick={handleMenu}
//                     sx={{ color: "#fff", position: "absolute", right: "10px" }}
//                   >
//                     <AccountCircle sx={{ fontSize: "28px" }} />
//                   </IconButton>
//                   <Menu
//                     id="menu-appbar"
//                     anchorEl={anchorEl}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "right",
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                     sx={{
//                       mt: 1,
//                     }}
//                   >
//                     <MenuItem
//                       onClick={handleClose}
//                       component={RouterLink}
//                       to="/profile"
//                     >
//                       Profile
//                     </MenuItem>
//                     <MenuItem
//                       onClick={() => {
//                         handleLogout();
//                         handleClose();
//                       }}
//                     >
//                       Logout
//                     </MenuItem>
//                   </Menu>
//                 </>
//               ) : (
//                 <Link component={RouterLink} to="/login">
//                   <Typography
//                     sx={{
//                       color: "#fff",
//                       fontSize: "2.2rem",
//                       fontFamily: "cairo",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Login
//                   </Typography>
//                 </Link>
//               )}
//             </Stack>
//           </>
//         )}

//         {!isLargeScreen && (
//           <SmallMediaQuary
//             toggleDrawer={toggleDrawer}
//             closeDrawer={closeDrawer}
//             state={drawerState}
//             token={token}
//             handleLogout={handleLogout}
//           />
//         )}
//       </Stack>
//       <Hero />
//     </Stack>
//   );
// }

// export default Header;
// Import necessary Redux hooks
// import { useSelector } from "react-redux";

// // Your other imports remain the same
// import "./Header.css";
// import { useState } from "react";
// import {
//   IconButton,
//   Link,
//   Stack,
//   useMediaQuery,
//   Menu,
//   MenuItem,
//   Typography,
//   Badge,
// } from "@mui/material";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import { Link as RouterLink } from "react-router-dom";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import Hero from "../Hero/Hero";
// import SmallMediaQuary from "./SmallMediaQuary";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// function Header({ token, handleLogout }) {
//   // Use useSelector to get cart items from Redux store
//   const cartItems = useSelector((state) => state.cart.items);
  
//   const [drawerState, setDrawerState] = useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setDrawerState({ ...drawerState, [anchor]: open });
//   };

//   const closeDrawer = () => {
//     setDrawerState({ ...drawerState, right: false });
//   };

//   const [anchorEl, setAnchorEl] = useState(null);
//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const isLargeScreen = useMediaQuery("(min-width:1000px)");
  
//   // حساب إجمالي عدد العناصر في العربة
//   const totalCounter = cartItems.reduce((total, item) => total + item.quantity, 0);
//   console.log(totalCounter);

//   return (
//     <Stack className="hero">
//       <Stack sx={{ bgcolor: "#050304", p: 1, position: "relative" }}>
//         {useMediaQuery("(min-width:1000px)") && (
//           <>
//             <Stack
//               gap={2}
//               direction={"row"}
//               alignItems={"center"}
//               sx={{ textTransform: "uppercase", p: "10px !important" }}
//               className="headerMenu"
//             >
//               <LanguageOutlinedIcon
//                 sx={{
//                   fontSize: "30px",
//                   cursor: "pointer",
//                   color: "#777",
//                   mr: 5,
//                 }}
//               />
//               <Link href="#menu">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Menu
//                 </Typography>
//               </Link>{" "}
//               <Link href="#about">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   About Us
//                 </Typography>
//               </Link>
//               <Link href="#footer">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Location
//                 </Typography>
//               </Link>
//               <Link href="#footer">
//                 <Typography
//                   sx={{
//                     color: "#fff",
//                     fontSize: "2.2rem",
//                     fontFamily: "cairo",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Contact Us
//                 </Typography>
//               </Link>
//               {token ? (
//                 <Link component={RouterLink} to="/order-online">
//                   <Badge
//                     badgeContent={totalCounter}
//                     color="error"
//                     sx={{ fontSize: "1.5rem", mr: 1 }}
//                   >
//                     <ShoppingCartOutlinedIcon sx={{ fontSize: "3rem", mb: "-.8rem" }} />
//                   </Badge>
//                 </Link>
//               ) : null}
//               {token ? (
//                 <>
//                   <IconButton
//                     size="large"
//                     aria-label="account of current user"
//                     aria-controls="menu-appbar"
//                     aria-haspopup="true"
//                     onClick={handleMenu}
//                     sx={{ color: "#fff", position: "absolute", right: "10px" }}
//                   >
//                     <AccountCircle sx={{ fontSize: "28px" }} />
//                   </IconButton>
//                   <Menu
//                     id="menu-appbar"
//                     anchorEl={anchorEl}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "right",
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                     sx={{
//                       mt: 1,
//                     }}
//                   >
//                     <MenuItem
//                       onClick={handleClose}
//                       component={RouterLink}
//                       to="/profile"
//                     >
//                       Profile
//                     </MenuItem>
//                     <MenuItem
//                       onClick={() => {
//                         handleLogout();
//                         handleClose();
//                       }}
//                     >
//                       Logout
//                     </MenuItem>
//                   </Menu>
//                 </>
//               ) : (
//                 <Link component={RouterLink} to="/login">
//                   <Typography
//                     sx={{
//                       color: "#fff",
//                       fontSize: "2.2rem",
//                       fontFamily: "cairo",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Login
//                   </Typography>
//                 </Link>
//               )}
//             </Stack>
//           </>
//         )}

//         {!isLargeScreen && (
//           <SmallMediaQuary
//             toggleDrawer={toggleDrawer}
//             closeDrawer={closeDrawer}
//             state={drawerState}
//             token={token}
//             handleLogout={handleLogout}
//           />
//         )}
//       </Stack>
//       <Hero />
//     </Stack>
//   );
// }

// export default Header;
import { useSelector } from "react-redux";
import "./Header.css";
import { useState } from "react";
import {
  IconButton,
  Link,
  Stack,
  useMediaQuery,
  Menu,
  MenuItem,
  Typography,
  Badge,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link as RouterLink } from "react-router-dom";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Hero from "../Hero/Hero";
import SmallMediaQuary from "./SmallMediaQuary";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function Header({ token, handleLogout }) {
  const cartItems = useSelector((state) => state.cart.items);

  // تحقق من البيانات المحفوظة في cartItems
  console.log("cartItems", cartItems);

  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const closeDrawer = () => {
    setDrawerState({ ...drawerState, right: false });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLargeScreen = useMediaQuery("(min-width:1000px)");

  // حساب إجمالي عدد العناصر في العربة
  const totalCounter = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  // تحقق من حساب totalCounter
  console.log("totalCounter", totalCounter);

  return (
    <Stack className="hero">
      <Stack sx={{ bgcolor: "#050304", p: 1, position: "relative" }}>
        {isLargeScreen && (
          <>
            <Stack
              gap={2}
              direction={"row"}
              alignItems={"center"}
              sx={{ textTransform: "uppercase", p: "10px !important" }}
              className="headerMenu"
            >
              <LanguageOutlinedIcon
                sx={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#777",
                  mr: 5,
                }}
              />
              <Link href="#menu">
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "2.2rem",
                    fontFamily: "cairo",
                    fontWeight: "bold",
                  }}
                >
                  Menu
                </Typography>
              </Link>{" "}
              <Link href="#about">
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
              <Link href="#footer">
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "2.2rem",
                    fontFamily: "cairo",
                    fontWeight: "bold",
                  }}
                >
                  Location
                </Typography>
              </Link>
              <Link href="#footer">
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "2.2rem",
                    fontFamily: "cairo",
                    fontWeight: "bold",
                  }}
                >
                  Contact Us
                </Typography>
              </Link>
              {token && (
                <Link component={RouterLink} to="/order-online">
                  <Badge
                    badgeContent={totalCounter}
                    color="error"
                    sx={{ fontSize: "1.5rem", mr: 1 }}
                  >
                    <ShoppingCartOutlinedIcon sx={{ fontSize: "3rem", mb: "-.8rem" }} />
                  </Badge>
                </Link>
              )}

              {token ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    sx={{ color: "#fff", position: "absolute", right: "10px" }}
                  >
                    <AccountCircle sx={{ fontSize: "28px" }} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                      mt: 1,
                    }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      component={RouterLink}
                      to="/profile"
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleLogout();
                        handleClose();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link component={RouterLink} to="/login">
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "2.2rem",
                      fontFamily: "cairo",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </Typography>
                </Link>
              )}
            </Stack>
          </>
        )}

        {!isLargeScreen && (
          <SmallMediaQuary
            toggleDrawer={toggleDrawer}
            closeDrawer={closeDrawer}
            state={drawerState}
            token={token}
            handleLogout={handleLogout}
          />
        )}
      </Stack>
      <Hero />
    </Stack>
  );
}

export default Header;
