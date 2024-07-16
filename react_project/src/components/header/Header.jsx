import "./Header.css";
import { useState } from "react";
import { Drawer, IconButton, Link, Stack, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderBigMedia from "./HeaderBigMedia";
import { Link as RouterLink } from "react-router-dom";
function Header() {
  const [state, setState] = useState({
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

    setState({ ...state, [anchor]: open });
  };
  const closeDrawer = () => {
    setState({ ...state, right: false });
  };
  return (
    <Stack sx={{ bgcolor: "#050304", p: 3 }}>
      {useMediaQuery("(min-width:1000px)") && (
  <HeaderBigMedia /> 
      )}

     
      {useMediaQuery("(max-width:1000px)") && (
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
              p: "10px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <MenuIcon
              color="#fff"
              sx={{ top: 0, right: 0, fontSize: "35px", cursor: "pointer" }}
            />
          </IconButton>
        </>
      )}
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
          Locaiton
        </Link>
        <Link href="#" onClick={closeDrawer}>
          order online
        </Link>
        <Link href="#footer" onClick={closeDrawer}>
          contact us
        </Link>
        <Link component={RouterLink} to="/login" onClick={closeDrawer}>
          Login
        </Link>
      </Drawer>
    </Stack>
  );
}

export default Header;
