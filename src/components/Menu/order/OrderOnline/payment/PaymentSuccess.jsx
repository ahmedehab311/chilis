import { useParams } from "react-router-dom";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../../../rtk/slices/orderSlice";
import { BASE_URL } from "../../../../setting";
import { getApiToken } from "../../adderess/apiAdderss";
import axios from "axios";
const PaymentSuccess = () => {
  const { orderCode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(5);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successConfirmed, setSuccessConfirmed] = useState(false);
  const [error, setError] = useState(null);
    useEffect(() => {
    const cameFromPayment = sessionStorage.getItem("fromPayment");
    if (!cameFromPayment) {
      navigate("/", { replace: true });
    } else {
      setAllowed(true);
    }
  }, [navigate]);
  console.log("allowed",allowed);
  console.log("orderCode",orderCode);
  
  useEffect(() => {
    if (allowed && orderCode) {
      const confirmPayment = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/payment/success/${orderCode}?api_token=${getApiToken()}`
          );
// console.log("FULL RESPONSE", response);
          if (response.data?.data?.order_id) {
            // console.log("FULL RESPONSE", response);
            // console.log(
            //   "response.data?.data?.order_id",
            //   response.data?.data?.order_id
            // );

            setSuccessConfirmed(true);
            dispatch(clearCart());
            // console.log(
            //   "response.data?.data?.order_id aferr clearCart",
            //   response.data?.data?.order_id
            // );
          } else {
            setError("Order not found.");
            navigate("/order-online/payment/fail", { replace: true });
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
  if (successConfirmed && allowed && !loading) {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Clear the timer
          handleGoHome(); // Redirect to homepage
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Decrease every 1 second

    // Cleanup the timer when the component unmounts or dependencies change
    return () => clearInterval(timer);
  }
}, [successConfirmed, allowed, loading, navigate]);

  const handleGoHome = () => {
    sessionStorage.removeItem("fromPayment");
    navigate("/", { replace: true });
    localStorage.removeItem("fromPayment");
  };
//   useEffect(() => {
//   if (error && !loading) {
//     console.error(error);
//     navigate("/order-online/payment/fail", { replace: true });
//   }
// }, [error, loading, navigate]);
  if (!allowed || loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  // if (error &&  !loading) {
  //   console.error(error);
  //   navigate("/order-online/payment/fail", { replace: true });
  // }

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
      </Typography>

      <Typography variant="h6" color="textSecondary" mt={1}>
        {t("trackCheck")}
      </Typography>

      <Typography variant="h6" mt={3}>
        {t("redirectHomeIn")}   {countdown}  {t("seconds")}
      </Typography>

      <Button
        variant="contained"
        color="success"
        onClick={handleGoHome}
        sx={{ mt: 4, fontSize: "13px" }}
      >
        {t("goHome")}
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
