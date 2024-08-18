/* eslint-disable react/prop-types */
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
  Box,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Hero from "../Hero/Hero";
import SmallMediaQuary from "./SmallMediaQuary";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useLocation } from "react-router-dom";
import logo from "../Hero/images/logo.png";
// import Headerr from "./Headerr"
function Header({ token, handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
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

  const totalItems = useSelector((state) => state.cart.totalItems);

  const handleNavigation = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // disable hero in these sections
  const showHero = ![
    "/order-online",
    "/my_orders",
    "/profile",
    "*",
    "/error",
    "/success",
  ].includes(location.pathname);
  return (
    <Stack className="hero">
      {/* header only */}
      <Stack sx={{ bgcolor: "#050304", position: "relative" }}>
        {useMediaQuery("(min-width:1000px)") && (
          <>
            <Stack
              gap={2}
              direction={"row"}
              alignItems={"center"}
              sx={{ textTransform: "uppercase", p: "10px !important" }}
              className="headerMenu"
            >
              {location.pathname !== "/" && (
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ padding: "10px" }}
                >
                  <Link component={RouterLink} to="/">
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ height: "45px", width: "97px" }}
                    />
                  </Link>
                </Stack>
              )}
              {/* <LanguageOutlinedIcon
                sx={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#777",
                  mr: 5,
                }}
              /> */}
              <Link href="#menu">
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "2.2rem",
                    fontFamily: "cairo",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleNavigation("menu")}
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
                  onClick={() => handleNavigation("about")}
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
                  onClick={() => handleNavigation("footer")}
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
                  onClick={() => handleNavigation("footer")}
                >
                  Contact Us
                </Typography>
              </Link>
              {token ? (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Link component={RouterLink} to="/order-online">
      <IconButton aria-label="cart" sx={{ ml: 'auto' }}>
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
    </Link>

    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      sx={{ color: "#fff" }}  
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
      sx={{ mt: 1 }}
    >
      <MenuItem
        onClick={handleClose}
        component={RouterLink}
        to="/profile"
      >
        <Typography sx={{ fontSize: "1.2rem" }}> Profile</Typography>
      </MenuItem>
      <MenuItem
        onClick={handleClose}
        component={RouterLink}
        to="/my_orders"
      >
        <Typography sx={{ fontSize: "1.2rem" }}> My Orders</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLogout();
          handleClose();
        }}
      >
        <Typography sx={{ fontSize: "1.2rem" }}> Logout</Typography>
      </MenuItem>
    </Menu>
  </Box>
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
            totalItems={totalItems}
          />
        )}
      </Stack>
      {showHero && <Hero />}
    </Stack>
  );
}

export default Header;
