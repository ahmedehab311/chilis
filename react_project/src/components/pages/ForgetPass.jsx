/* eslint-disable react/no-unescaped-entities */
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, Link as RouterLink } from "react-router-dom";
function forgetPass() {
  const handleForgotPassword = (event) => {
    event.preventDefault();
    // Handle forgot password logic here
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="h5" gutterBottom >
        Enter your email address below and we'll send you an email with
        instructions on how to change your password
      </Typography>
      <Box
        component="form"
        onSubmit={handleForgotPassword}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: 1,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          InputProps={{ style: { fontSize: "1.6rem", fontWeight: "bold" } }}
          InputLabelProps={{ fontSize: "1.6rem", fontWeight: "bold" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ fontSize: "15px" }}
        >
          Send
        </Button>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, fontSize: "20px" }}
        >
          <Link component={RouterLink} to="/login">
            Already an account? Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default forgetPass;
