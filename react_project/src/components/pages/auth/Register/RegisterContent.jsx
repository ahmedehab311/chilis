/* eslint-disable react/prop-types */
import { Box, Button, TextField, Typography, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
function RegisterContent({
  registerUser,
  register,
  errors,
  setEmail,
  emailOnBlurHandler,
  emailAvailabilityStatus,
  setFirst_name,
  setPassword,
  setPhone,
}) {
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
          onSubmit={registerUser}
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
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Sign Up
          </Typography>
          <TextField
            label="First Name"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            variant="outlined"
            fullWidth
            requiredx
            onChange={(e) => setFirst_name(e.target.value)}
          />
          <TextField
            label="Email Address"
            {...register("email")}
            onBlur={emailOnBlurHandler}
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Phone"
            type="text"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            type="submit"
            disabled={emailAvailabilityStatus === "checking"}
            variant="contained"
            color="error"
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Sign Up
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, fontSize: "18px" }}
          >
            <Link component={RouterLink} to="/login" color={"#000"}>
              <Typography
                variant="h6"
                sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Already have an account? Sign in
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default RegisterContent;
