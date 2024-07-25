import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Box, Typography, TextField } from "@mui/material";

const Profile = ({ userData }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (userData) {
      setUserName(userData.user_name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
    }
  }, [userData]);

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: 1,
        width: "100%",
        maxWidth: "800px",
        margin: "auto"
      }}
    >
      <Typography variant="h6" gutterBottom>
        My Account
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userName}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        value={phone}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );
};

Profile.propTypes = {
  userData: PropTypes.shape({
    user_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string
  })
};

export default Profile;
