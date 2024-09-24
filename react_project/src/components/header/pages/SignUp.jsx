import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
function SignUp() {
  const handleSignUp = (event) => {
    event.preventDefault();
  };
  return (
    <>
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
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSignUp}
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
            label="Name"
            variant="outlined"
            fullWidth
            required
            InputProps={{ style: { fontSize: "1.6rem", fontWeight: "bold" } }}
            InputLabelProps={{ fontSize: "1.6rem", fontWeight: "bold" }}
          />
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            required
            sx={{ fontSize: "22px" }}
            InputProps={{ style: { fontSize: "1.6rem", fontWeight: "bold" } }}
            InputLabelProps={{ fontSize: "1.6rem", fontWeight: "bold" }}
          />
          <TextField
            label="Mobile Number"
            type="tel"
            variant="outlined"
            fullWidth
            required
            InputProps={{ style: { fontSize: "1.6rem", fontWeight: "bold" } }}
            InputLabelProps={{ fontSize: "1.6rem", fontWeight: "bold" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            sx={{ fontSize: "18px" }}
            InputProps={{ style: { fontSize: "1.6rem", fontWeight: "bold" } }}
            InputLabelProps={{ fontSize: "1.6rem", fontWeight: "bold" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ fontSize: "15px" }}
          >
            Sign Up
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, fontSize: "18px" }}
          >
            <Link component={RouterLink} to="/login" color={"#000"}>
              Already have an account? Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
export default SignUp;
