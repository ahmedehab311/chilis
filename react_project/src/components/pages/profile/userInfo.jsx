/* eslint-disable react/prop-types */
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
function UserInfo({
  handleInputChange,
  user,
  handleSave,
  handleChangePassword,
}) {
  const { t } = useTranslation();
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        flexGrow: 2,
        width: "100%",
        padding: 2,
        "@media (max-width: 1000px)": {
          width: "80%",
        },
      }}
    >
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: 1,
          width: "100%",
          maxWidth: "800px",
          margin: " 34px 0 0 37px",
          justifyContent: "center",
          alignItems: "center",
          "@media (max-width: 1000px)": {
            margin: " 0 0 0 0",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "2rem", fontWeight: "600", mb: "1.5rem" }}
        >
          {t("regsterPage.MyAccount")}
        </Typography>
        <Stack sx={{ textTransform: "capitalize", fontSize: "1.5rem" }}>
          <Typography sx={{ fontSize: "1.6rem" }} gutterBottom>
            {t("regsterPage.name")}
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            name="user_name"
            value={user.user_name}
            onChange={handleInputChange}
            sx={{
              mt: 0,
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
          <Typography sx={{ fontSize: "1.6rem" }} gutterBottom>
            {t("regsterPage.phone")}
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={user.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              handleInputChange({ target: { name: "phone", value } });
            }}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            sx={{
              m: 0,
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
          <Typography sx={{ m: ".5rem 0 .5rem 0", fontSize: "1.6rem" }}>
            {t("regsterPage.email")}
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            sx={{
              m: 0,
              "& .MuiInputBase-input": {
                fontSize: "1.5rem",
                color: "gray",
              },
              "& .MuiInputLabel-root": {
                fontSize: "1.2rem",
              },
            }}
          />
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{ display: "flex", flexWrap: "wrap", mt: "3rem" }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleSave}
            sx={{ fontSize: "1.1rem", fontWeight: "600" }}
          >
            {t("profile.saveChanges")}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleChangePassword}
            sx={{ marginLeft: "10px", fontSize: "1.1rem", fontWeight: "600" }}
          >
            {t("profile.changePassword")}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}

export default UserInfo;
