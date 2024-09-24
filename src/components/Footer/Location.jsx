import { Stack, Box, TextField } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";

function Location() {
  return (
    <>
      <Box>
        <Stack
          sx={{
            display: "flex",
            color: "#fff",
            fontSize: "22px",
            my: 2,
          }}
        >
          <Stack sx={{ display: "flex",marginRight:"7px" }} direction={"row"} alignItems={"center"}>
            <PinDropIcon
              sx={{
                marginBottom: "12px",
                fontSize: "35px",
                color: "#fff",
                marginRight: "6px",
                fontWeight: "bold",
              }}
            />
            <Stack>Location</Stack>
          </Stack>

          <TextField
      variant="outlined"
      // size="small"
      className="custom-input" 
      sx={{
        width: '200px',

        margin: '10px 0',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#fff', 
          },
          '&:hover fieldset': {
            borderColor: '#fff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#fff', 
          },
        },
        '& .MuiInputLabel-root': {
          color: '#fff', 
        },
        '& .MuiInputBase-input': {
          color: '#fff', 
        },
      }} 
    />
        </Stack>
      </Box>
    </>
  );
}

export default Location;
