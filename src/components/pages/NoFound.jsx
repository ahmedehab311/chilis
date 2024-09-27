import { Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      spacing={2}
      sx={{ textAlign: "center", backgroundColor: "#f5f5f5", padding: "20px" }}
    >
      <Typography variant="h1" sx={{ fontSize: "5rem", color: "#333" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ color: "#666" }}>
        {t("messageError")}
      </Typography>
      <Button variant="contained" color="error" onClick={handleGoHome}>
        {t("goHomeButton")}
      </Button>
    </Stack>
  );
};

export default NotFound;
