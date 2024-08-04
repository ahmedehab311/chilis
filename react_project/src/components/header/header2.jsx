

// // 
//   import "./Header.css";
// import { useState } from "react";
// import { UserContext } from '../hooks/UserContext';
// import {
//   IconButton,
//   Link,
//   Stack,
//   useMediaQuery,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import { Link as RouterLink } from "react-router-dom";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import Hero from "../Hero/Hero";
// import SmallMediaQuary from "./SmallMediaQuary";
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// function Header({ token, handleLogout }) {

//   const [cartItems, setCartItems] = useState([]);
//   const isCartEmpty = cartItems.length === 0;
  
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
//               <Link href="#menu">Menu</Link>
//               <Link href="#about">About Us</Link>
//               <Link href="#footer">Location</Link>
//               <Link href="#footer">Contact Us</Link>
//               {/* shopping icon */}
//               {token && (
//                 <Link component={RouterLink} to="/order-online">
//                   <ShoppingCartOutlinedIcon sx={{ fontSize: "3rem", mb: "-.8rem" }} />
//                 </Link>
//               )}
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
//                       sx={{ cursor: "pointer" }}
//                     >
//                       Logout
//                     </MenuItem>
//                   </Menu>
//                 </>
//               ) : (
//                 <Link component={RouterLink} to="/login">
//                   Login
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
import "./Header.css";
import { useState, useContext } from "react";
import { UserContext } from '../hooks/UserContext'; // تأكد من تحديث مسار الاستيراد إذا لزم الأمر
import {
  IconButton,
  Link,
  Stack,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link as RouterLink } from "react-router-dom";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Hero from "../Hero/Hero";
import SmallMediaQuary from "./SmallMediaQuary";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Header({ handleLogout }) {
  const { user } = useContext(UserContext);
  const isCartEmpty = (user && user.cartItems && user.cartItems.length === 0) || true;

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
              <Link href="#menu">Menu</Link>
              <Link href="#about">About Us</Link>
              <Link href="#footer">Location</Link>
              <Link href="#footer">Contact Us</Link>
              {/* shopping icon */}
              {user && (
                <Link component={RouterLink} to="/order-online">
                  <ShoppingCartOutlinedIcon sx={{ fontSize: "3rem", mb: "-.8rem" }} />
                </Link>
              )}
              {user ? (
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
                      sx={{ cursor: "pointer" }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link component={RouterLink} to="/login">
                  Login
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
            token={user}
            handleLogout={handleLogout}
          />
        )}
      </Stack>
      <Hero />
    </Stack>
  );
}

export default Header;