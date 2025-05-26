import { Typography, Button } from "@mui/material";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const OrderFailPage = () => {
      const { t } = useTranslation();
  const navigate = useNavigate();
   const [authorized, setAuthorized] = useState(null);
  
useEffect(() => {
    const fail = localStorage.getItem("orderFail");
    if (!fail) {
      navigate("/");
    } else {
      localStorage.removeItem("orderFail");
      setAuthorized(true);
    }
  }, []);

  if (authorized === null) {
    return null;
  }
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h4" color="red">❌ فشل في إنشاء الطلب</Typography>
       <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={() => navigate("/order-online")}>
       Back to cart 
      </Button>
      <Button variant="contained" color="error" style={{ marginTop: 20 }} onClick={() => navigate("/")}>
        {t("goHome")}
      </Button>
    </div>
  );
};

export default OrderFailPage;
