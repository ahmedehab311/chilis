/* eslint-disable react/prop-types */
import { Typography,Stack } from "@mui/material";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
function AddAdderssFromProfile({ handleClickOpen1 }) {
  return (
    <Stack
      sx={{
        cursor: "pointer",
        padding: 2,
        borderTop: "1px solid #dee2e6",
        borderBottom: "1px solid #dee2e6",
      }}
      onClick={handleClickOpen1}
    >
      <Typography
        sx={{
          fontSize: "1.8rem",
          textTransform: "capitalize",
          fontWeight: "600",
          color: "#343a40 !important",
          textAlign: "left",
        }}
      >
        address
      </Typography>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "1.6rem",
            textTransform: "",
            fontWeight: "600",
            color: "#6c757d!important",
            textAlign: "left",
          }}
        >
          Add a delivery address
        </Typography>
        <ArrowForwardIosOutlinedIcon
          sx={{
            fontSize: "2rem",
            animation: "moveRight 0.9s infinite",
            "@keyframes moveRight": {
              "0%": {
                transform: "translateX(0)",
              },
              "50%": {
                transform: "translateX(10px)",
              },
              "100%": {
                transform: "translateX(0)",
              },
            },
          }}
        />
      </Stack>
    </Stack>
  );
}

export default AddAdderssFromProfile;
