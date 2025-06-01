import { useParams } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
const PaymentSuccess = () => {
  const { orderCode } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null);
  
   const [isInIframe, setIsInIframe] = useState(false);
  // useEffect(() => {
  //   localStorage.setItem("orderSuccessPayment", "true");
  // }, []);
// useEffect(() => {
//   localStorage.setItem("orderSuccessPayment", "true");

//   if (window.top !== window.self) {
//     setIsInIframe(true)
//     window.top.location.href = `/order-online/payment/success/${orderCode}`;
//   }
// }, [orderCode]);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = document.getElementById("fawaterkDivId");
      console.log("paymentTabs", container);
      if (container) {
        const paymentTabs = container.querySelector(".payment-tabs__tabs-side");
        console.log("paymentTabs", paymentTabs);
        if (paymentTabs) {
          paymentTabs.style.display = "none";
          console.log("payment tabs hidden");
          clearInterval(interval);
        } else {
          console.warn(
            "payment-tabs__tabs-side not found yet inside container"
          );
        }
      } else {
        console.warn("container not found yet");
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);
    // if (isInIframe) return null; 

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
        {t("orderCode")} <strong>{orderCode}</strong>{" "}
        <strong>with payment *** </strong>
      </Typography>
      <Typography variant="h6" color="textSecondary" mt={1}>
        {t("trackCheck")}
      </Typography>

      <Button
        variant="contained"
        color="success"
        // onClick={() => navigate("/")}
        onClick={() => {
          window.location.href = "/";
        }}
        sx={{ mt: 4, fontSize: "15px" }}
      >
        {t("goHome")}
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
