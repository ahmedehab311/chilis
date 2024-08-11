import { Box, Button, Card, Stack, Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Address from "../../Menu/order/adderess/Address";
import { useState } from "react";
function CardProfile({ user }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <Card
      sx={{
        padding: 2,
        maxWidth: 300,
        width: "50%",
        mr: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: 2,
          justifyContent: "space-between",
        }}
      >
        <img
          src="user-profile-icon.png"
          alt="User"
          style={{ borderRadius: "50%", width: "80px", height: "80px" }}
        />
        <Box sx={{ marginLeft: 2 }}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              {user.user_name}
              <CheckCircleOutlinedIcon sx={{ color: "#28a745!important" }} />
            </Typography>
          </Stack>

          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ fontSize: "1.1rem", fontWeight: "500" }}
          >
            {user.email}
          </Typography>
        </Box>
      </Box>
      {/* <Button variant="contained" color="error" onClick={handleOpenDialog}>
        Add Address
      </Button> */}
      {/* <Address open={openDialog} onClose={handleCloseDialog} /> */}
    </Card>
  );
}

export default CardProfile;
