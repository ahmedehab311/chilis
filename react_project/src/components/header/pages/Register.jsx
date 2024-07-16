/* eslint-disable react/prop-types */
// src/components/SignUpForm.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import signUpSchema from "../../vaildations/signUpSchema";
import useCheckEmailAvailability from "../../hooks/useCheckEmailAvailability";

const Register = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmail,
  } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      checkEmailAvailability(value);
    } else if (isDirty && invalid && enteredEmail) {
      resetCheckEmail();
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
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
          label="First Name"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Email Address"
          {...register("email")}
          onBlur={emailOnBlurHandler}
          error={!!errors.email || emailAvailabilityStatus === "notAvailable"}
          helperText={
            errors.email?.message ||
            (emailAvailabilityStatus === "checking"
              ? "We're currently checking the availability of this email address. Please wait a moment."
              : emailAvailabilityStatus === "failed"
              ? "Error from the server"
              : emailAvailabilityStatus === "notAvailable"
              ? "Email is already in use."
              : emailAvailabilityStatus === "available"
              ? "This email is available for use"
              : "")
          }
          variant="outlined"
          fullWidth
          required
          disabled={emailAvailabilityStatus === "checking"}
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
        />
        <TextField
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          variant="outlined"
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={emailAvailabilityStatus === "checking"}
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
  );
};

export default Register;
