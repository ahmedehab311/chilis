import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";

const PaymentFailPending = () => {
  const { orderCode } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const [isValid, setIsValid] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const fromPayment = sessionStorage.getItem("fromPayment");

    if (fromPayment !== "true") {

      navigate("/", { replace: true });
    } else {
    
      setAllowed(true);
 
      sessionStorage.removeItem("fromPayment");
    }
  }, [navigate]);

  useEffect(() => {
    if (allowed) {
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
    }
  }, [allowed, navigate]);

  if (!allowed) {
    // ممكن ترجع null أو شاشة تحميل بسيطة
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
      {/* <ErrorIcon style={{ fontSize: 100, color: "#f44336" }} /> */}
      <Typography
        variant="h4"
        fontWeight="bold"
        mt={2}
        style={{ fontSize: "19px", color: "#000" }}
      >
        {t("paymentPending")}
      </Typography>
      <Typography variant="h6" color="textSecondary" mt={1}>
        {t("orderCode")} <strong>{orderCode}</strong>
      </Typography>
      <Typography variant="h6" color="textSecondary" mt={1}>
        {t("tryAgain")}
      </Typography>
      {/* <Typography variant="h6" mt={3}>
        {t("redirectHomeIn")} {countdown} {t("seconds")}
      </Typography> */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/", { replace: true });
        }}
        sx={{ mt: 4, fontSize: "15px" }}
      >
        {t("goHome")}
      </Button>
    </Box>
  );
};
export default PaymentFailPending;
