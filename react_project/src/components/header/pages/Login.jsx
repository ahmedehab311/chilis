/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";


// eslint-disable-next-line react/prop-types
const LoginPage = ({setToken}) => {
  const APIURL = "/login?phone=01000596888&password=123456";
  const BASE_URL = "https://myres.me/chilis/";
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");



  const LoginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}${APIURL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const response = await LoginUser({
      email,
      password,
   
    });
    console.log(response.token);
    setToken(response.token);
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
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        sx={{ width: "100%", maxWidth: "800px" }}
      >
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 1,
            flex: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="h6" gutterBottom>
            Sign in to continue
          </Typography>
          <TextField
            label="Enter Your Email"
            variant="outlined"
            fullWidth
            required
            onChange={e => setEmail(e.target.value) }
            value={email}
            InputProps={{ style: { fontSize: "1.6rem", fontWeight: "bold" } }}
            InputLabelProps={{ fontSize: "1.6rem", fontWeight: "bold" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={e => setPassword(e.target.value) }
            value={password}
            InputProps={{ style: { fontSize: "1.6rem", fontWeight: "bold" } }}
            InputLabelProps={{ fontSize: "1.6rem", fontWeight: "bold" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ fontSize: "15px" }}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1, fontSize: "18px" }}
          >
            <Link component={RouterLink} to="/forgot-password">
              Forgot Your Password?
            </Link>
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, fontSize: "18px" }}
          >
            <Link component={RouterLink} to="/Register">
              Don't have an account? Sign up
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default LoginPage;
