import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
// const PaymentFailPending = () => {
//   const { orderCode } = useParams();
//     const { t } = useTranslation();
//     const navigate = useNavigate();

//   // const [isInIframe, setIsInIframe] = useState(false);
//   // useEffect(() => {
//   //   localStorage.setItem("orderSuccessPayment", "false");

//   //   if (window.top !== window.self) {
//   //     setIsInIframe(true);
//   //     window.top.location.href = `/order-online/payment/fail/${orderCode}`;
//   //   }
//   // }, [orderCode]);
//   // if (isInIframe) return null;
//    const [authorized, setAuthorized] = useState(null);
//   useEffect(() => {
//     const isPending = localStorage.getItem("orderPendind");

//     if (!isPending) {
//       navigate("/");
//     } else {
//       localStorage.removeItem("orderPendind");
//       setAuthorized(true);
//     }
//   }, []);
//   if (authorized === null) {
//     return null;
//   }
//   return (
//     <div className="p-4 text-center">
//       {/* <h2 className="text-yellow-600 text-2xl font-bold">الدفع قيد الانتظار</h2> */}
//       <p>كود الطلب: {orderCode}</p>
//       <p>سنقوم بمراجعة الدفع وتأكيده قريبًا.</p>
//        <Button
//         variant="contained"
//         color="success"
//         onClick={() => navigate("/")}
//         // onClick={() => {
//         //   window.location.href = "/";
//         // }}
//         sx={{ mt: 4, fontSize: "15px" }}
//       >
//         {t("goHome")}
//       </Button>
//     </div>
//   );
// };

const PaymentFailPending = () => {
  const { orderCode } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();


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
        {t("paymentPendingFailed")}
      </Typography>
      <Typography variant="h6" color="textSecondary" mt={1}>
        {t("orderCode")} <strong>{orderCode}</strong>
      </Typography>
      <Typography variant="h6" color="textSecondary" mt={1}>
        {t("tryAgain")}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ mt: 4, fontSize: "15px" }}
      >
        {t("goHome")}
      </Button>
    </Box>
  );
};
export default PaymentFailPending;
