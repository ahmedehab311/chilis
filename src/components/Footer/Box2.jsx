import { Stack, Box } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";

function box2() {
  return (
    <>
      <Box className="midBox" >
        <Stack
        className="midBox"
          sx={{
            display: "flex",
            color: "#fff",
            fontSize: "20px",
            my:2
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Stack>
              <PinDropIcon fontSize="15px" />
            </Stack>
            <Stack>Location</Stack>
            <input type="text" className="inputFooter" />
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default box2;
