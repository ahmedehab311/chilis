import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, Link as RouterLink } from "react-router-dom";
import { BASE_URL } from "../../setting";
function ForgetPass() {
  const [form, setForm] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleForgetPass = async (event) => {
    event.preventDefault();
    try {
      const api_token = localStorage.getItem("token");

      const APIURL = `/forgot-password?phone=${form.email}&api_token=${api_token}`;

      const response = await axios.get(`${BASE_URL}${APIURL}`);
      console.log(response.data);

      if (response.data && response.data.response) {
        toast.success(
          "Password reset instructions have been sent to your email!"
        );
      } else {
        throw new Error("Password reset failed");
      }
    } catch (error) {
      toast.error("Failed to reset password.");
      console.error("Error resetting password: ", error);
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
          <Typography
            variant="h6"
            sx={{ fontSize: "1.8rem", fontWeight: "bold", textAlign: "center" }}
          >
            Forgot password
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Forgot password Enter your email address below and we'll send you an
            email with instructions on how to change your password
          </Typography>
          <Stack>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.3rem", fontWeight: "600"}}
            >
              Email
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={form.email}
              required
              sx={{
                mt:0,
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                  color: "gray",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.2rem",
                },
              }}
            />
          </Stack>
          <Button
            variant="contained"
            color="error"
            onClick={handleForgetPass}
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Send
          </Button>
          <Link component={RouterLink} to="/login" color={"#000"}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Already have an account? Sign in
            </Typography>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
}

export default ForgetPass;
