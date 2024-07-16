import { Box, Typography } from "@mui/material";

function backToMenuClick({ handleBackClick }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Typography
        onClick={handleBackClick}
        sx={{
          cursor: "pointer",
          color: "#fff",
          textDecoration: "underline",
          fontSize: "22px",
        }}
      >
        Back Menu
      </Typography>
    </Box>
  );
}

export default backToMenuClick;
