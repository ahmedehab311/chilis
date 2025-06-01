/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
function LinksIconCircle({
  handleMenu,
  anchorEl,
  onClose,
  handleClose,
  handleLogout,
}) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{ color: "#fff" }}
      >
        <AccountCircle sx={{ fontSize: "28px !important" }} />
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
        <MenuItem onClick={handleClose} component={RouterLink} to="/profile">
          <Typography sx={{ fontSize:"12px !important", }}>{t('Profile')}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} component={RouterLink} to="/my_orders">
          <Typography sx={{ fontSize:"12px !important", }}>{t('MyOrders')}</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
            handleClose();
          }}
        >
          <Typography sx={{ fontSize:"12px !important", }}>{t('Logout')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default LinksIconCircle;
