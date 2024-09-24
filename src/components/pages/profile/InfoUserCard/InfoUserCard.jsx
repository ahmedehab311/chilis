/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import img from "../../profile/user-profile-icon.svg";
function InfoUserCard({ displayedUser }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: 2,
        justifyContent: "space-between",
        padding: "2rem",

        "@media (max-width:600px)": {
          justifyContent: "center",
          flexWrap: "wrap",
        },
      }}
    >
      <img
        src={img}
        alt="User"
        style={{ borderRadius: "50%", width: "105px", height: "125px" }}
      />
      <Box sx={{ marginLeft: 2 }}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              fontWeight: "600",
            }}
          >
            {displayedUser.user_name}
            <CheckCircleOutlinedIcon
              sx={{ color: "#28a745!important", ml: ".3rem" }}
            />
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ fontSize: "1.5rem", fontWeight: "500" }}
        >
          {displayedUser.email}
        </Typography>
      </Box>
    </Box>
  );
}

export default InfoUserCard;
