import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../setting";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    old_password: "",
    new_password: "",
  });
  const [displayedUser, setDisplayedUser] = useState({
    email: "",
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setForm({
        user_name: storedUser.user_name,
        email: storedUser.email,
        phone: storedUser.phone,
      });
      setDisplayedUser({
        user_name: storedUser.user_name,
        email: storedUser.email,
        phone: storedUser.phone,
      });
    }
  }, []);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setForm(storedUser);
      setDisplayedUser(storedUser);
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault(); // Prevents default form submission
    try {
      const api_token = localStorage.getItem("token");
      if (!api_token) {
        toast.error("API token is missing. Please log in again.");
        return;
      }

      const APIURL = `/profile/update/password?email=${form.email}&password=${form.old_password}&new_password=${form.new_password}&api_token=${api_token}`;

      const response = await axios.post(`${BASE_URL}${APIURL}`);
      console.log(response.data);

      if (response.data && response.data.response) {
        setForm((prevForm) => ({
          ...prevForm,
          old_password: "",
          new_password: ""
        }));
        localStorage.setItem("token", response?.data?.data?.token);
        toast.success(t("profile.updatePassword"));
      } else {
        throw new Error("Password change failed");
      }
    } catch (error) {
      toast.error("Failed to change password.");
      console.error("Error changing password: ", error);
    }
  };

  return (
    <Stack>
      <Box
        component="form"
        onSubmit={handleChangePassword}
        sx={{
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: 1,
          maxWidth: "800px",
          margin: "20px auto",
          width: "100%",
          "@media (max-width: 1000px)": {
            width: "80%",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "2rem", fontWeight: "600", mb: "1.5rem" }}
        >
          {t("profile.changePassword")}
        </Typography>

        {/* <Stack sx={{ textTransform: "capitalize", fontSize: "1.6rem"}}>
          <Typography sx={{ fontSize: "1.6rem" }} gutterBottom>
            {t("regsterPage.email")}
          </Typography>
          <TextField
            required
            placeholder={t("loginPage.enterEmail")}
            variant="outlined"
            fullWidth
            name="email"
            value={form.email}
            onChange={handleInputChange}
          />
        </Stack> */}
        <Stack>
          <Typography sx={{ m: ".5rem 0 .5rem 0", fontSize: "1.6rem" }}>
            {t("regsterPage.email")}
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={form.email}
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
            required
            placeholder={t("loginPage.enterEmail")}
          />
        </Stack>
        <Stack >
          <Typography sx={{ fontSize: "1.6rem", mt: ".9rem" }} gutterBottom>
            {t("regsterPage.oldPassword")}
          </Typography>
          <TextField
            required
            variant="outlined"
            placeholder={t("regsterPage.enterOldPassword")}
            fullWidth
            name="old_password"
            type="password"
            value={form.old_password}
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
        <Stack sx={{ textTransform: "capitalize", fontSize: "1.6rem" }}>
          <Typography sx={{ fontSize: "1.6rem", mt: ".9rem" }} gutterBottom>
            {t("regsterPage.newPassword")}
          </Typography>
          <TextField
            required
            placeholder={t("regsterPage.enterNewPassword")}
            variant="outlined"
            fullWidth
            name="new_password"
            type="password"
            value={form.new_password}
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

        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mt: "1rem", fontSize: "1.1rem", fontWeight: "600" }}
        >
          {t("profile.saveChanges")}
        </Button>
      </Box>
    </Stack>
  );
};

export default ChangePassword;
