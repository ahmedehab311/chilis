// /* eslint-disable react/prop-types */
// import "./Header.css";
// import { useState } from "react";
// import {
//   IconButton,
//   Link,
//   Stack,
//   useMediaQuery,
//   Typography,
//   Badge,
//   Box,
// } from "@mui/material";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { SmallMediaQuary, Hero,LinksHeader,LinksIconCircle,LogoHeader } from "./index";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import { useLocation } from "react-router-dom";
// function Header({ token, handleLogout }) {
//   const location = useLocation();
//   const navigate = useNavigate();
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

//   const totalItems = useSelector((state) => state.cart.totalItems);

//   const handleNavigation = (sectionId) => {
//     if (location.pathname !== "/") {
//       navigate("/", { state: { scrollTo: sectionId } });
//     } else {
//       document
//         .getElementById(sectionId)
//         ?.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // disable hero in these sections
//   const showHero = ![
//     "/order-online",
//     "/my_orders",
//     "/profile",
//     "*",
//     "/error",
//       "/change-password",
//   ].includes(location.pathname);
//   return (
//     <Stack className="hero">
//       <Stack sx={{ bgcolor: "#050304", position: "relative" }}>
//         {useMediaQuery("(min-width:1000px)") && (
//           <>
//             <Stack
//               gap={2}
//               direction={"row"}
//               alignItems={"center"}
//               sx={{ textTransform: "uppercase", p: "10px !important" }}
//               className="headerMenu"
//             >
//               {location.pathname !== "/" && <LogoHeader />}

//               <LinksHeader handleNavigation={handleNavigation} />
//               {token ? (
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Link component={RouterLink} to="/order-online">
//                     <IconButton aria-label="cart" sx={{ ml: "auto" }}>
//                       <Badge
//                         badgeContent={totalItems}
//                         color="error"
//                         invisible={totalItems === 0}
//                       >
//                         <ShoppingCartOutlinedIcon
//                           sx={{ fontSize: "3rem", color: "#fff" }}
//                         />
//                       </Badge>
//                     </IconButton>
//                   </Link>
//                   <LinksIconCircle
//                    handleLogout={handleLogout}
//                     anchorEl={anchorEl}
//                     handleMenu={handleMenu}
//                     onClose={handleClose}
//                     handleClose={handleClose}
//                   />
//                 </Box>
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
//             totalItems={totalItems}
//           />
//         )}
//       </Stack>
//       {showHero && <Hero />}
//     </Stack>
//   );
// }

// export default Header;

import "./Header.css";
import { useEffect, useState } from "react";
import {
  IconButton,
  Link,
  Stack,
  useMediaQuery,
  Typography,
  Badge,
  Box,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SmallMediaQuary,
  Hero,
  LinksHeader,
  LinksIconCircle,
  LogoHeader,
} from "./index";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useLocation } from "react-router-dom";
import { updateCartItems } from "../../rtk/slices/cartSlice.js";
function Header({ token, handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalItems = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  useEffect(() => {
    // عند تحميل الصفحة، قراءة السلة من localStorage وتحديث Redux store
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(updateCartItems(cart.length));
  }, [dispatch]);

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

  const handleNavigation = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // إخفاء hero في هذه الصفحات
  const showHero = ![
    "/order-online",
    "/my_orders",
    "/profile",
    "*",
    "/error",
    "/change-password",
    "/locations",
    "/about-us",
  ].includes(location.pathname);

  const handleCartClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/order-online");
    }
  };

  return (
    <Stack className="hero">
      <Stack sx={{ bgcolor: "#050304", position: "relative" }}>
        {isLargeScreen && (
          <>
            <Stack
              gap={2}
              direction={"row"}
              alignItems={"center"}
              sx={{ textTransform: "uppercase", p: "10px !important" }}
              className="headerMenu"
            >
              {location.pathname !== "/" && <LogoHeader />}

              <LinksHeader handleNavigation={handleNavigation} />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  aria-label="cart"
                  sx={{ ml: "auto" }}
                  onClick={handleCartClick}
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
                {token ? (
                  <LinksIconCircle
                    handleLogout={handleLogout}
                    anchorEl={anchorEl}
                    handleMenu={handleMenu}
                    onClose={handleClose}
                    handleClose={handleClose}
                  />
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
              </Box>
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
            totalItems={totalItems}
          />
        )}
      </Stack>
      {showHero && <Hero />}
    </Stack>
  );
}

export default Header;
