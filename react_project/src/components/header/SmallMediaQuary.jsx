/* eslint-disable react/prop-types */
import {
  Badge,
  Drawer,
  IconButton,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function SmallMediaQuery({
  closeDrawer,
  toggleDrawer,
  state,
  handleLogout,
  token,
  totalItems,
}) {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");

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
            <MenuIcon sx={{ color: "#fff", fontSize: "35px" }} />
          </IconButton>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            sx={{ ".MuiPaper-root": { height: "100%" } }}
          >
            <Link href="#menu" onClick={closeDrawer}>
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
            <Link href="#about" onClick={closeDrawer}>
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
            <Link href="#footer" onClick={closeDrawer}>
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
            <Link href="#footer" onClick={closeDrawer}>
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

            {token && (
              <Link
                component={RouterLink}
                to="/order-online"
                onClick={closeDrawer}
              >
                {/* <IconButton */}

                <Badge
                  badgeContent={totalItems}
                  color="error"
                  invisible={totalItems === 0}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: "3rem", color: "#fff" }}
                  />
                </Badge>
                {/* </IconButton> */}
              </Link>
            )}
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
                    My ordres
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
          </Drawer>
        </>
      )}
    </>
  );
}

export default SmallMediaQuery;
