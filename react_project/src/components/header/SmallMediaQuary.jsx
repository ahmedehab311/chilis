/* eslint-disable react/prop-types */
import { Drawer, IconButton, Link, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
function SmallMediaQuery({ closeDrawer, toggleDrawer, state, handleLogout, token }) {
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
              Menu
            </Link>
            <Link href="#about" onClick={closeDrawer}>
              About Us
            </Link>
            <Link href="#footer" onClick={closeDrawer}>
              Location
            </Link>
       
            <Link href="#footer" onClick={closeDrawer}>
              Contact Us
            </Link>
            <Link component={RouterLink} to="/order-online" onClick={closeDrawer}>
         <ShoppingCartOutlinedIcon/>
            </Link>
            {token ? (
              <>
                <Link component={RouterLink} to="/profile" onClick={closeDrawer}>
                  Profile
                </Link>
                <Link onClick={() => { handleLogout(); closeDrawer(); }}>
                  Logout
                </Link>
              </>
            ) : (
              <Link component={RouterLink} to="/login" onClick={closeDrawer}>
                Login
              </Link>
            )}
          </Drawer>
        </>
      )}
    </>
  );
}

export default SmallMediaQuery;
