import { Link, Stack } from "@mui/material"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";


function HeaderBigMedia() {
  return (
    <Stack
    gap={2}
    direction={"row"}
    alignItems={"center"}
    sx={{ textTransform: "uppercase", p: "10px !important" }}
    className="headerMenu"
  >
    <LanguageOutlinedIcon
      sx={{
        fontSize: "30px",
        cursor: "pointer",
        color: "#777",
        mr: 5,
        // position:"relative"
      }}
    />
    <Link href="#menu">Menu</Link>
    <Link href="#about">About Us</Link>
    <Link href="#footer">Locaiton</Link>
    <Link href="#">order online</Link>
    <Link href="#footer">contact us</Link>
  </Stack>
  )
}

export default HeaderBigMedia