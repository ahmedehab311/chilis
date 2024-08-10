/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../rtk/slices/userSlice"; // Import setUser action

const BASE_URL = "https://myres.me/chilis/api";

const LoginPage = ({ setToken }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const APIURL = `/login?phone=${phone}&password=${password}&email=${phone}`;
    try {
      const response = await axios.post(`${BASE_URL}${APIURL}`);
      console.log("Response Data:", response.data); // تحقق من استجابة API

      if (response.data && response.data.data) {
        const token = response.data.data.token;
        const userData = response.data.data.user;

        if (token && userData) {
          setToken(token);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData)); // تخزين بيانات المستخدم

          dispatch(setUser(userData)); // تخزين بيانات المستخدم في Redux

          toast.success("Login successful!");
          navigate("/");
        } else {
          throw new Error("Token or user data not found");
        }
      } else {
        throw new Error(response.data.messages || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages || "Invalid User Name or Password";
      toast.error(errorMessage);
      console.error("Error logging in: ", errorMessage);
    }
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
  );
};

export default LoginPage;
