import { Stack, Box } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";

function Location() {
  return (
    <>
      <Box>
        <Stack
          sx={{
            // display: "flex",
            color: "#fff",
            fontSize: "20px",
            my: 2,
          }}
        >
          <Stack sx={{ display: "flex" }} direction={"row"}>
            <PinDropIcon sx={{fontWeight:"bold", fontSize:"30px"}}/>
            <Stack>Location</Stack>
          </Stack>

          <input type="text" className="inputFooter" />
        </Stack>
      </Box>
    </>
  );
}

export default Location;
