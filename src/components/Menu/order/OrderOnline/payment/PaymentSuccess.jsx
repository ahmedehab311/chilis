import { useParams } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
// const PaymentSuccess = () => {
//   const { orderCode } = useParams();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fromPayment = sessionStorage.getItem("fromPayment");

//     if (fromPayment !== "true") {
//       // لو مش جاي من الدفع، رجعه للـ Home
//       navigate("/");
//     } else {
//       // مسح العلامة
//       sessionStorage.removeItem("fromPayment");
//     }
//   }, [navigate]);
//   useEffect(() => {
//   const alreadyVisited = localStorage.getItem("successVisited");

//   if (alreadyVisited === "true") {
//     navigate("/");
//   } else {
//     localStorage.setItem("successVisited", "true");
//   }
// }, [navigate]);
//  useEffect(() => {
//     // امسح كل ما يتعلق بصفحة الدفع هنا
//     sessionStorage.removeItem("fromCheckout");
//     sessionStorage.removeItem("fromPayment");
//     // لو عندك أي بيانات أخرى في localStorage أو state تابعة للدفع، احذفها برضه
    
//     // بعد 5 ثواني اذهب للصفحة الرئيسية
//     const timer = setTimeout(() => {
//       navigate("/", { replace: true });
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       height="100vh"
//       textAlign="center"
//       bgcolor="#f5f5f5"
//       px={2}
//     >
//       <CheckCircleIcon style={{ fontSize: 100, color: "#4caf50" }} />

//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         mt={2}
//         style={{ fontSize: "19px", color: "#000" }}
//       >
//         {t("orderCreated")}
//       </Typography>

//       <Typography variant="h6" color="textSecondary" mt={1}>
//         {t("orderCode")} <strong>{orderCode}</strong>{" "}
//         <strong>with payment *** </strong>
//       </Typography>
//       <Typography variant="h6" color="textSecondary" mt={1}>
//         {t("trackCheck")}
//       </Typography>

//       <Button
//         variant="contained"
//         color="success"
//         // onClick={() => navigate("/")}
//         onClick={() => {
//           navigate("/", { replace: true });
//         }}
//         sx={{ mt: 4, fontSize: "15px" }}
//       >
//         {t("goHome")}
//       </Button>
//     </Box>
//   );
// };

  const PaymentSuccess = () => {
    const { orderCode } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
  const [countdown, setCountdown] = useState(5);
    // حالة لتتبع هل الشرط اتحقق ولا لا
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
      const fromPayment = sessionStorage.getItem("fromPayment");

      if (fromPayment !== "true") {
        // لو مش جاي من الدفع، رجعه للـ Home فوراً
        navigate("/", { replace: true });
      } else {
        // الشرط اتحقق، نسمح بعرض الصفحة
        setAllowed(true);
        // مسح العلامة عشان لو عمل ري-فريش ما يرجعش هنا تاني
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
    <Typography variant="h6" mt={3}>
          {t("redirectHomeIn")} {countdown} {t("seconds")}
        </Typography>
        <Button
          variant="contained"
          color="success"
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
export default PaymentSuccess;
