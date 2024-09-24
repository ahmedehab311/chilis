import { Stack, Box } from "@mui/material";
import { Box1, Box2, Box3 } from "./index.jsx";
function Footer() {
  return (
    <div id="footer">
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
          <Box1 />
        </Stack>
        <Stack>
          <Box2 />
        </Stack>
        <Stack>
          <Box3 />
        </Stack>
      </Box>
    </div>
  );
}

export default Footer;
