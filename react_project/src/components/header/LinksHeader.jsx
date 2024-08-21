import { Link, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
function LinksHeader({ handleNavigation }) {
  return (
    <>
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
    </>
  );
}

export default LinksHeader;
