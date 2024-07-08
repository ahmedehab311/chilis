import {  Typography } from "@mui/material";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Box from "./Card";
// import Category from "./Category";

function Menu() {
  return (
      <div id="menu">
    <Box sx={{ ".css-1oqqzyl-MuiContainer-root": { p: "100px" } }}>
      <h1 style>ahmed</h1>
    <Typography
          sx={{
            textAlign: "center",
            fontSize: "33px",
            fontWeight: "bold",
            color: "#fff",
            my: 2,
          }}
        >
          MENU
        </Typography>
        {/* <Router>
      <Routes>
        <Route path="/" element={<Box />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </Router> */}
        {/* <Stack>
          <img src="" alt="logo" />
        </Stack> */}
    </Box>
      </div>
  );
}

export default Menu;
