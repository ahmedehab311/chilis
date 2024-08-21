/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
function LoginContent({login,phone,password,handleLogout,setPassword,setPhone }) {
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
          onSubmit={login}
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
            label="Enter Your email"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button type="submit" variant="contained" color="error" sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <RouterLink to="/forgot-password">
              <Typography
                variant="h6"
                sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Forgot Your Password?
              </Typography>
            </RouterLink>
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <RouterLink to="/register">
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "cairo important",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Don't have an account? Sign up
              </Typography>
            </RouterLink>
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default LoginContent
