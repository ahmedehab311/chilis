import { Stack, Box, Typography } from "@mui/material";
import {ContactUs,Location,Email}from "./index.jsx";
function Footer() {
  return (
    <div id="footer">
      <Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "3px solid #fff",
          background: "#e72323",
          position: "relative",
          p: 1,
        }}
        gap={2}
      >
        <Stack>
          <ContactUs />
        </Stack>
        <Stack>
          <Location />

        </Stack>
        <Stack>
          <Email />
        </Stack>
       
      </Box>
      <Typography sx={{color:"#fff",background:"#e72323", fontWight:"600",fontSize:"16px", textAlign:"center", textTransform:"uppercase", pb:2}}>
all rights reserved to chils egypt
        </Typography>
      </Stack>
      
    </div>
  );
}

export default Footer;
