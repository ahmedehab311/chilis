import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const PaymentFail = () => {
  const { orderCode } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isInIframe, setIsInIframe] = useState(false);
  useEffect(() => {
    localStorage.setItem("orderSuccessPayment", "false");

    if (window.top !== window.self) {
      setIsInIframe(true);
      window.top.location.href = `/order-online/payment/fail/${orderCode}`;
    }
  }, [orderCode]);
  if (isInIframe) return null;
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h4" color="red">
        ❌ فشل في إنشاء الطلب
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
        onClick={() => navigate("/order-online")}
      >
        Back to cart
      </Button>
      <Button
        variant="contained"
        color="error"
        style={{ marginTop: 20 }}
        onClick={() => navigate("/")}
      >
        {t("goHome")}
      </Button>
    </div>
  );
};

export default PaymentFail;
