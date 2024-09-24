// import { Link, Typography } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// function LinksHeader({ handleNavigation }) {
//   return (
//     <>
//       <LanguageOutlinedIcon
//         sx={{
//           fontSize: "30px",
//           cursor: "pointer",
//           color: "#777",
//           mr: 5,
//         }}
//       />
//       <Link href="#menu">
//         <Typography
//           sx={{
//             color: "#fff",
//             fontSize: "2.2rem",
//             fontFamily: "cairo",
//             fontWeight: "bold",
//           }}
//           onClick={() => handleNavigation("menu")}
//         >
//           Menu
//         </Typography>
//       </Link>{" "}
//       <Link  component={RouterLink} to="/about-us">
//         <Typography
//           sx={{
//             color: "#fff",
//             fontSize: "2.2rem",
//             fontFamily: "cairo",
//             fontWeight: "bold",
//           }}
//           onClick={() => handleNavigation("about")}
//         >
//           About Us
//         </Typography>
//       </Link>
//       <Link component={RouterLink} to="/locations">
//   <Typography
//     sx={{
//       color: "#fff",
//       fontSize: "2.2rem",
//       fontFamily: "cairo",
//       fontWeight: "bold",
//     }}
//   >
//     Locations
//   </Typography>
// </Link>
//       <Link href="#footer">
//         <Typography
//           sx={{
//             color: "#fff",
//             fontSize: "2.2rem",
//             fontFamily: "cairo",
//             fontWeight: "bold",
//           }}
//           onClick={() => handleNavigation("footer")}
//         >
//           Contact Us
//         </Typography>
//       </Link>
//     </>
//   );
// }

// export default LinksHeader;
import { useState } from "react";
import { Link, Typography, Menu, MenuItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useTranslation } from 'react-i18next';
import i18n from '../languages/i18n.js';

function LinksHeader({ handleNavigation }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lan', lng); // تخزين اللغة في localStorage
    handleClose();
  };

  return (
    <>
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
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
        {/* <MenuItem onClick={() => changeLanguage('ar')}>العربية</MenuItem> */}
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
          {t('menu')}
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
          {t('aboutUs')}
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
          {t('locations')}
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
          {t('contactUs')}
        </Typography>
      </Link>
    </>
  );
}

export default LinksHeader;
