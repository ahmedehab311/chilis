/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
function BackButton({ handleBackClick }) {
  const { t } = useTranslation();
  return (
    <Box sx={{ mt: 4 }}>
      <Button
        variant="contained"
        color="error"
        onClick={handleBackClick}
        sx={{
          textTransform: "uppercase",
          fontSize: "1.2rem",
          fontWeight: "500",
        }}
      >
        {t("back")}
      </Button>
    </Box>
  );
}

export default BackButton;
