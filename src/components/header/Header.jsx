/* eslint-disable react/prop-types */
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
import { useTranslation } from "react-i18next";
function Header({ token, handleLogout }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const convertNumberToArabic = (number) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(number).replace(/[0-9]/g, (digit) => arabicNumbers[digit]);
  };
  const isArabic = i18n.language === "ar";
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  useEffect(() => {
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

  const handleCartClick = () => {
    navigate("/order-online");
  };

  return (
    <Stack className="hero ">
      <Stack sx={{ bgcolor: "#22235b", position: "relative" }}>
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
                    sx={{ ml: "auto !important" }}
                    onClick={handleCartClick}
                  >
                    <Badge
                      badgeContent={
                        <Typography
                          sx={{
                            fontSize: "9px !important",
                            color: "#fff !important",
                            fontWeight: "bold !important",
                          }}
                        >
                          {i18n.language === "ar"
                            ? convertNumberToArabic(totalItems)
                            : totalItems}
                        </Typography>
                      }
                      color="error"
                      invisible={totalItems === 0}
                    >
                      <ShoppingCartOutlinedIcon
                        sx={{ fontSize: "30px !important", color: "#fff !important" }}
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
                          fontSize: isArabic === "ar" ? "2.2rem !important" : "1.9rem !important",
                          fontFamily: "cairo !important",
                          fontWeight: "bold !important",
                          // all: "unset",
                        }}
                      >
                        {t("login")}
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
   
      {/* <Hero /> */}
      {location.pathname === "/" && <Hero />}
    </Stack>
  );
}

export default Header;
