import { Box, Stack } from "@mui/material";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
function box1() {
  return (
    <Box
      sx={{
        display: "flex",
        my: 3,
        fontSize: "25px",
        color: "#fff",
        margin: 0,
      }}
    >
      <Stack>
        <WifiCalling3Icon fontSize="25px" />
      </Stack>
      <Stack>19002</Stack>
    </Box>
  );
}

export default box1;
