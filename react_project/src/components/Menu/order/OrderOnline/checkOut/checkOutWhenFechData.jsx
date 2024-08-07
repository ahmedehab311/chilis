import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Card, Container, Button } from "@mui/material";
import axios from "axios";
import imgLogo from "../../../../Hero/images/logo.png";
import { API_TAX } from "../../../apis&fetchData/ApiLinks";

function CheckOut({
  totalToPay,
  handleRemoveItem,
  cartItems,
  subtotal,
  deliveryFee,
  totalPrices,
  handleCounterChange,
  user,
  setTotalItems
}) {
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCardForm, setShowCardForm] = useState(false);
  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [cards, setCards] = useState([]); // حالة جديدة لتخزين الكروت

  const handleClickOpen = () => {
    setOpenPaymentDialog(true);
  };

  const handleClose = () => {
    setOpenPaymentDialog(false);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === 'card') {
      setShowCardForm(true);
    } else {
      setShowCardForm(false);
    }
  };

  const handlePlaceOrder = () => {
    handleClose();
    if (paymentMethod === 'cash') {
      alert('Order placed successfully with cash payment!');
    } else if (paymentMethod === 'card') {
      alert('Redirecting to credit card payment page...');
    }
  };

  useEffect(() => {
    // Fetch tax data when the component mounts
    const fetchTax = async () => {
      try {
        const response = await axios.get(API_TAX);
        const taxValue = response.data.data.settings.tax;
        setTax(taxValue);
      } catch (error) {
        console.error("Error fetching tax data:", error);
      }
    };

    fetchTax();
  }, []);

  useEffect(() => {
    // Fetch cards data
    const fetchCards = async () => {
      try {
        const api_token = "YOUR_API_TOKEN"; // استخدم التوكن الخاص بك
        const response = await axios.get(`https://myres.me/chilis/api/user/history?api_token=${api_token}`);
        setCards(response.data.details); // تحديث حالة الكروت بناءً على البيانات المستلمة
      } catch (error) {
        console.error("Error fetching cards data:", error);
      }
    };

    fetchCards();
  }, []); // This effect runs once when the component mounts

  return (
    <Container
      sx={{
        maxWidth: "600px !important",
        background: "#fff !important",
        position: "sticky",
        margin: "0 auto",
        mr: "50px",
        mt: "15px",
        p: "0px !important",
        border: "1px solid #dee2e6!important",
        borderRadius: ".25rem !important",
        boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
        "@media (max-width: 1000px)": {
          margin: "0 auto",
          mt: "2rem",
        },
      }}
    >
      <Box
        className="headerOrderOnline"
        direction={"row"}
        alignItems={"center"}
        sx={{ p: 1, borderBottom: "1px solid #999" }}
      >
        <img
          className="imgOrder"
          alt="Image"
          width="150px"
          height="150px"
          src={imgLogo}
        />
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            ml: 2,
            fontFamily: "cairo",
          }}
        >
          chilis
        </Typography>
      </Box>

      <Container sx={{ margin: "0 auto" }}>
        <Box
          className="orderNow"
          sx={{
            borderRadius: "8px",
          }}
        >
          {cards.map((card, index) => (
            <Card key={index} sx={{ p: 2, mb: 3 }}>
              <Stack sx={{ position: "relative" }}>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: 500,
                    fontFamily: "cairo",
                  }}
                >
                  Card {index + 1} {/* أو أي معلومات تريد عرضها من الكارت */}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Box>
      </Container>

      {/* باقي مكونات CheckOut */}
    </Container>
  );
}

export default CheckOut;
