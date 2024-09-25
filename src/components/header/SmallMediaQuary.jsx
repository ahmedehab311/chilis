/* eslint-disable react/prop-types */
import { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { updateCartItems } from "../../rtk/slices/cartSlice.js";
import { useTranslation } from "react-i18next";
  function SmallMediaQuery({
    closeDrawer,
    toggleDrawer,
    state,
    handleLogout,
    token,
  }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const totalItems = useSelector((state) => state.cart.totalItems);
    useEffect(() => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch(updateCartItems(cart.length));
    }, [dispatch]);

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
      navigate("/order-online");
    };

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
                    textTransform: "capitalize",
                  }}
                >
                  {t("menu")}
                </Typography>
              </Link>
              <Link component={RouterLink} to="/about-us" onClick={closeDrawer}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "2.2rem",
                    fontFamily: "cairo",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {t("aboutUs")}
                </Typography>
              </Link>
              <Link component={RouterLink} to="/locations" onClick={closeDrawer}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "2rem",
                    fontFamily: "cairo",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {t("locations")}
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
                  {t("contactUs")}
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
                        textTransform: "capitalize",
                      }}
                    >
                      {t("Profile")}
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
                        textTransform: "capitalize",
                      }}
                    >
                      {t("MyOrders")}
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
                        textTransform: "capitalize",
                      }}
                    >
                      {t("Logout")}
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
