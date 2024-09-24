import { Stack } from "@mui/material";
import {  Link, Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../Hero/images/logo.png";
function LogoHeader() {
  return (
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
  )
}

export default LogoHeader
