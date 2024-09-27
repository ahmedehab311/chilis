/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
function LoginContent({ login, phone, password, setPassword, setPhone }) {
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
          <Typography
            variant="h6"
            sx={{ fontSize: "1.8rem", fontWeight: "bold" }}
          >
            {t("loginPage.welcomeBack")}
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontSize: "1.4rem", fontWeight: "600" }}
          >
            {t("loginPage.signInToContinue")}
            {/* Sign in to continue */}
          </Typography>
          <Stack>
            <Typography variant="h6" gutterBottom>
              {t("loginPage.email")}
            </Typography>
            <TextField
              placeholder={t("loginPage.enterEmail")}
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
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
            <Typography variant="h6" gutterBottom>
              {/* Password */}
              {t("loginPage.password")}
            </Typography>
            <TextField
              placeholder={t("loginPage.enterPassword")}
              type="password"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
            variant="contained"
            color="error"
            sx={{ fontSize: "1.2rem", fontWeight: "600" }}
          >
            {/* Login */}
            {t("loginPage.loginButton")}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <RouterLink to="/forgot-password">
              <Typography
                variant="h6"
                sx={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                {/* Forgot Your Password? */}
                {t("loginPage.forgotPassword")}
              </Typography>
            </RouterLink>
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <RouterLink to="/register">
              <Typography
                variant="h6"
                sx={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                {" "}
                {t("loginPage.noAccount")}
                {/* Don't have an account? Sign up */}
              </Typography>
            </RouterLink>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default LoginContent;
