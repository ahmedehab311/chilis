import { useParams } from "react-router-dom";
import { Typography, Button, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../../setting";
import { getApiToken } from "../../adderess/apiAdderss";
import ErrorIcon from "@mui/icons-material/Error";
const PaymentFail = () => {
  const { orderCode } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(5);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successConfirmed, setSuccessConfirmed] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fromPayment = sessionStorage.getItem("fromPayment");

    if (fromPayment !== "true") {
      window.location.replace("/");
    } else {
      setAllowed(true);

      sessionStorage.removeItem("fromPayment");
    }
  }, []);
  useEffect(() => {
    if (allowed && orderCode) {
      const confirmPayment = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/payment/cancel/${orderCode}?api_token=${getApiToken()}`
          );

          if (response.data?.data?.order_id) {
            setSuccessConfirmed(true);
          } else {
            setError("Order not found.");
          }
        } catch (err) {
          console.error("Error confirming payment:", err);
          setError("Something went wrong.");
        } finally {
          setLoading(false);
        }
      };

      confirmPayment();
    }
  }, [allowed, orderCode, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/", { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);
  const handleGoHome = () => {
    sessionStorage.removeItem("fromPayment");
    localStorage.removeItem("orderCode");
    window.location.replace("/");
  };
  if (!allowed) {
    return null;
  }
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
      <ErrorIcon style={{ fontSize: 100, color: "#f44336" }} />
      <Typography
        variant="h4"
        fontWeight="bold"
        mt={2}
        style={{ fontSize: "19px", color: "#000" }}
      >
        {t("paymentFailed")}
      </Typography>

      <Typography variant="h6" mt={3}>
        {t("redirectHomeIn")} {countdown} {t("seconds")}
      </Typography>
      <Stack
        sx={{
          display: "flex",
          gap: "4px",
          flexDirection: "row",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/order-online")}
          sx={{
            fontSize: "13px",
          }}
        >
          {t("BackToCart")}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleGoHome}
          sx={{
            fontSize: "13px",
          }}
        >
          {t("goHome")}
        </Button>
      </Stack>
    </Box>
  );
};

export default PaymentFail;
