import { Button } from "@mui/material";
// import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PaymentFailPending = () => {
  const { orderCode } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
  
  // const [isInIframe, setIsInIframe] = useState(false);
  // useEffect(() => {
  //   localStorage.setItem("orderSuccessPayment", "false");

  //   if (window.top !== window.self) {
  //     setIsInIframe(true);
  //     window.top.location.href = `/order-online/payment/fail/${orderCode}`;
  //   }
  // }, [orderCode]);
  // if (isInIframe) return null;
  return (
    <div className="p-4 text-center">
      {/* <h2 className="text-yellow-600 text-2xl font-bold">الدفع قيد الانتظار</h2> */}
      <p>كود الطلب: {orderCode}</p>
      <p>سنقوم بمراجعة الدفع وتأكيده قريبًا.</p>
       <Button
        variant="contained"
        color="success"
        onClick={() => navigate("/")}
        // onClick={() => {
        //   window.location.href = "/";
        // }}
        sx={{ mt: 4, fontSize: "15px" }}
      >
        {t("goHome")}
      </Button>
    </div>
  );
};

export default PaymentFailPending;
