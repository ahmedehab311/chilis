import { useParams } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
const OrderSuccessPage = () => {
  const { orderCode } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
 

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f5f5f5"
      px={2}
    >
      <CheckCircleIcon style={{ fontSize: 100, color: "#4caf50" }} />

      <Typography
        variant="h4"
        fontWeight="bold"
        mt={2}
        style={{ fontSize: "19px", color: "#000" }}
      >
        {t("orderCreated")}
      </Typography>

      <Typography variant="h6" color="textSecondary" mt={1}>
        {t("orderCode")} <strong>{orderCode}</strong>
      </Typography>
      <Typography variant="h6" color="textSecondary" mt={1}>
        {t("trackCheck")}
      </Typography>

      <Button
        variant="contained"
        color="success"
        onClick={() => navigate("/")}
        sx={{ mt: 4, fontSize: "15px" }}
      >
        {t("goHome")}
      </Button>
    </Box>
  );
};

export default OrderSuccessPage;
