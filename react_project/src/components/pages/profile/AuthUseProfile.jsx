/* eslint-disable react/prop-types */
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import img from "../profile/user-profile-icon.svg";
function CardProfile({ user }) {
  return (
    <Card
      sx={{
        flexGrow: 1,
        border: "1px solid #ddd",
        boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
        ml: "170px",
        "@media (max-width: 1000px)": {
          alignItems: "center",
          maxWidth: "100%",
          ml: "0",
          width: "100%",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
          justifyContent: "space-between",
          borderBottom: "1px solid #dee2e6",
          padding: "2rem",
          flexWrap: "wrap",
          "@media (max-width:600px)": {
            justifyContent: "center",
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
              {user.user_name}
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
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Button variant="contained" color="error" className="addNameProfile">
        Add Address
      </Button>
    </Card>
  );
}
export default CardProfile;
