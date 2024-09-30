/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, Typography, Menu, MenuItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useTranslation } from "react-i18next";
import i18n from "../Translation/i18n.js";

function LinksHeader({ handleNavigation }) {
  const [activeLanguage, setActiveLanguage] = useState("en");

  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("lan") || "en";
    i18n.changeLanguage(savedLanguage);
    setActiveLanguage(savedLanguage);
  }, [i18n]); 

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lan", lng);
    setActiveLanguage(lng);
    handleClose();
  };

  return (
    <>
      {/* <LanguageOutlinedIcon
        sx={{
          fontSize: "30px",
          cursor: "pointer",
          color: "#777",
          mr: 5,
        }}
        onClick={handleClick}
      />
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
        sx={{ mt: 1, top: "1.3rem !important" }}
      >

        <MenuItem
        onClick={() => changeLanguage("en")}
        sx={{ fontSize: "1.2rem", fontWeight: activeLanguage === "en" ? "bold" : "normal" }}
      >
        English
      </MenuItem>
      <MenuItem
        onClick={() => changeLanguage("ar")}
        sx={{ fontSize: "1.2rem", fontWeight: activeLanguage === "ar" ? "bold" : "normal" }}
      >
        العربية
      </MenuItem>
      </Menu> */}
      <LanguageOutlinedIcon
        sx={{
          fontSize: "30px",
          cursor: "pointer",
          color: "#777",
          mr: 5,
        }}
        onClick={handleClick}
      />
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
        sx={{ mt: 1, top: "1.3rem !important"}}
      >
        <Typography
          onClick={() => changeLanguage("en")}
          sx={{
            fontSize: "1.2rem",
            fontWeight: activeLanguage === "en" ? "bold" : "normal",
            p: "1rem",
            color: activeLanguage === "en" ? "primary.main" : "text.primary",
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)", 
            },
            borderRadius: "4px", 
        }}  
          
        >
          English
        </Typography>
        <Typography 
          onClick={() => changeLanguage("ar")}
          sx={{
            fontSize: "1.2rem",
            fontWeight: activeLanguage === "ar" ? "bold" : "normal",
            p: "1rem",
            color: activeLanguage === "ar" ? "primary.main" : "text.primary", // تغيير اللون بناءً على اللغة النشطة
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)", 
            },
            borderRadius: ".3rem", 
        }}
        >
          العربية
        </Typography>
      </Menu>
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
          {t("menu")}
        </Typography>
      </Link>{" "}
      <Link component={RouterLink} to="/about-us">
        <Typography
          sx={{
            color: "#fff",
            fontSize: "2.2rem",
            fontFamily: "cairo",
            fontWeight: "bold",
          }}
          onClick={() => handleNavigation("about")}
        >
          {t("aboutUs")}
        </Typography>
      </Link>
      <Link component={RouterLink} to="/locations">
        <Typography
          sx={{
            color: "#fff",
            fontSize: "2.2rem",
            fontFamily: "cairo",
            fontWeight: "bold",
          }}
        >
          {t("locations")}
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
          {t("contactUs")}
        </Typography>
      </Link>
    </>
  );
}

export default LinksHeader;
