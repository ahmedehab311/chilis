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
         
            <Stack sx={{ display: "flex" }}>
              <PinDropIcon fontSize="15px" />
              <Stack>Location</Stack>
            </Stack>
          
            <input type="text" className="inputFooter" />
       
        </Stack>
      </Box>
    </>
  );
}

export default box2;
