// /* eslint-disable react/prop-types */
// // /* eslint-disable react/prop-types */
import { Box, Button, TextField, Typography, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  handleEmailBlur,
  onChangeEmail,
}) {
  const { t } = useTranslation();
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
          <Typography
            variant="h6"
            sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}
          >
            {t("regsterPage.title")}
          </Typography>
          <Stack>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.3rem", fontWeight: "600" }}
              gutterBottom
            >
              {/* First Name */}
              {t("regsterPage.firstName")}
            </Typography>
            <TextField
              placeholder={t("regsterPage.enterName")}
              {...register("firstName")}
              variant="outlined"
              onBlur={emailOnBlurHandler}
              fullWidth
              requiredx
              onChange={(e) => setFirst_name(e.target.value)}
              sx={{
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
          <Stack>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.3rem", fontWeight: "600" }}
              gutterBottom
            >
              {/* Email Address */}
              {t("regsterPage.email")}
            </Typography>
            <TextField
              placeholder={t("regsterPage.enterEmail")}
              {...register("email")}
              onBlur={emailOnBlurHandler}
              // error={!!errors.email}
              // helperText={errors.email?.message}
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                  color: "gray",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.2rem",
                },
              }}
              // placeholder="Enter Your Email Address"
              // {...register("email")}
              // onBlur={handleEmailBlur}
              // onChange={onChangeEmail}
              // variant="outlined"
              // fullWidth
              // required

              // sx={{
              //   "& .MuiInputBase-input": {
              //     fontSize: "1.3rem",
              //     color: "gray",
              //   },
              //   "& .MuiInputLabel-root": {
              //     fontSize: "1.2rem",
              //   },
              //   "& .MuiFormHelperText-root": {
              //     fontSize: "1.1rem",
              //     color: "red",
              //   },
              // }}
            />
          </Stack>
          <Stack>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.3rem", fontWeight: "600" }}
              gutterBottom
            >
              {/* Password */}
              {t("regsterPage.password")}
            </Typography>
            <TextField
              placeholder={t("regsterPage.enterPassword")}
              type="password"
              {...register("password")}
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
              sx={{
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
          <Stack>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.3rem", fontWeight: "600" }}
              gutterBottom
            >
              {/* Phone */}
              {t("regsterPage.phone")}
            </Typography>
            <TextField
              placeholder={t("regsterPage.enterPhone")}
              type="text"
              {...register("phone")}
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setPhone(e.target.value)}
              sx={{
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
            type="submit"
            disabled={emailAvailabilityStatus === "checking"}
            variant="contained"
            color="error"
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {/* Sign Up */}
            {t("regsterPage.signUp")}
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, fontSize: "18px" }}
          >
            <Link component={RouterLink} to="/login" color={"#000"}>
              <Typography
                variant="h6"
                sx={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                {t("regsterPage.alreadyHaveAccount")}
                {/* Already hav/.e an account? Sign in */}
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default RegisterContent;
