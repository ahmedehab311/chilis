/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Card,
  Container,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "../OrderOnline.css";
import imgLogo from "../../../../Hero/images/logo.png";
import Counter from "../../../ButtonsMenu/CounterDiaolgButton";
import { API_TAX } from "../../../apis&fetchData/ApiLinks";
import PaymentPage from "./PaymentPage";
import axios from "axios";
import Coupun from "./Coupon/Coupun";
function CheckOut({
  handleRemoveItem,
  cartItems,
  subtotal,
  deliveryFee,
  totalPrices,
  handleCounterChange,
}) {
  const BASE_URL = "http://myres.me/chilis-dev";
  const api_token = localStorage.getItem("token"); // استرجاع التوكن من localStorage
  const API_CHECKOUT = `items={"items":[{"id":26,"choices":[],"extras":[],"options":[],"count":1,"special":""}]`;
  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // New state for payment method
  const [openDialog, setOpenDialog] = useState(false);
  // في قسم useEffect الخاص بالحساب
  useEffect(() => {
    const fetchTax = async () => {
      try {
        const response = await axios.get(API_TAX);
        const taxValue = response.data.data.settings.tax;
        setTax(taxValue);

        const subtotalWithDelivery = subtotal + deliveryFee;
        const calculatedTax = subtotalWithDelivery * (taxValue / 100);
        setTotalWithTax(subtotalWithDelivery + calculatedTax);
      } catch (error) {
        console.error("Error fetching tax data:", error);
      }
    };

    fetchTax();
  }, [subtotal, deliveryFee]);

  const calculateSubtotalWithExtras = () => {
    return cartItems.reduce((acc, item, index) => {
      const itemTotal = totalPrices[index] || item.price;
      const extrasTotal = item.extras
        ? item.extras.reduce((sum, extra) => sum + parseFloat(extra.price), 0)
        : 0;
      return acc + itemTotal + extrasTotal;
    }, 0);
  };

  const subtotalWithExtras = calculateSubtotalWithExtras();
  const handleCloseDialog = () => {
    setOpenDialog(false); // غلق الـ Dialog
  };
  const API_PLACE_ORDER = `${BASE_URL}/place-order`; // عنوان الـ API لوضع الطلب

  const handlePlaceOrder = async () => {
    const orderDetails = {
      items: cartItems.map((item, index) => ({
        id: item.id,
        count: item.count,
        extras: item.extras || [],
        options: item.options || [],
        special: item.special || "",
      })),
      subtotal: subtotalWithExtras,
      deliveryFee: deliveryFee,
      totalPrice: totalWithTax,
      paymentMethod: paymentMethod,
      // أضف تفاصيل إضافية إذا لزم الأمر
    };

    if (paymentMethod === "credit") {
      setOpenDialog(true); // فتح الـ Dialog إذا تم اختيار Credit Card
    } else {
      try {
        const result = await placeOrder(orderDetails);
        alert("Order placed successfully!");
        // توجيه المستخدم إلى صفحة تأكيد الطلب أو أي صفحة أخرى إذا لزم الأمر
      } catch (error) {
        alert("Failed to place order. Please try again.");
      }
    }
  };

  const placeOrder = async (orderDetails) => {
    try {
      const response = await axios.post(API_PLACE_ORDER, orderDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`, // إضافة التوكن إلى الرؤوس
        },
      });
      return response.data; // راجع استجابة الـ API هنا
    } catch (error) {
      console.error("Error placing order:", error);
      throw error; // أعد طرح الخطأ للتعامل معه لاحقًا
    }
  };

  return (
    <Container
      sx={{
        maxWidth: "514px !important",
        background: "#fff !important",
        position: "sticky",
        margin: "0 auto",
        mr: "50px",
        mt: "15px",
        p: "0px !important",
        border: "1px solid #dee2e6!important",
        borderRadius: ".8rem !important",
        boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
        // maxHeight: "500px",
        maxHeight: "580px",
        overflowY: "auto",
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
        sx={{
          p: 1,
          borderBottom: "2px solid #ececec",
        }}
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
          {cartItems.length === 0
            ? null
            : cartItems.map((item, index) => (
                <Card key={index} sx={{ p: 2, my: 3 }}>
                  <Stack sx={{ position: "relative" }}>
                    <Stack
                      sx={{ display: "flex" }}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Typography
                        sx={{
                          color: "#000",
                          fontSize: "1.8rem",
                          fontWeight: "bold",
                          fontFamily: "cairo",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        onClick={() => handleRemoveItem(index)}
                        sx={{
                          color: "red",
                          position: "absolute",
                          right: "-11px",
                          top: "-13px",
                          cursor: "pointer",
                          fontSize: "1.8rem",
                          fontWeight: "bold",
                          fontFamily: "cairo",
                          "&:hover": {
                            color: "#e31616!important",
                          },
                        }}
                      >
                        X
                      </Typography>
                    </Stack>

                    <Stack
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        m: "10px 0 10px 0",
                      }}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Typography
                        sx={{
                          color: "#17a2b8!important",
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          fontFamily: "cairo",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#17a2b8!important",
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          fontFamily: "cairo",
                        }}
                      >
                        {item.price} EGP
                      </Typography>
                      <Counter
                        basePrice={item.price}
                        onChange={(newTotalPrice) =>
                          handleCounterChange(index, newTotalPrice)
                        }
                      />
                    </Stack>

                    <Stack
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Typography
                        sx={{
                          color: "#424242 !important",
                          fontSize: "1.5rem",
                          fontWeight: 500,
                        }}
                      >
                        Regular
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 500,
                        }}
                      >
                        {(totalPrices[index] || item.price).toFixed(2)} EGP
                      </Typography>
                    </Stack>
                    <Stack>
                      {item.extras && item.extras.length > 0 && (
                        <Stack>
                          {item.extras.map((extra, i) => (
                            <Stack
                              key={i}
                              direction={"row"}
                              alignItems={"center"}
                              sx={{ justifyContent: "space-between" }}
                            >
                              <Typography
                                sx={{
                                  color: "#000!important",
                                  fontSize: "1.5rem",

                                  fontFamily: "cairo",
                                  fontWeight: 500,
                                }}
                              >
                                {extra.name}
                              </Typography>{" "}
                              <Typography
                                sx={{
                                  color: "#000!important",
                                  fontSize: "1.5rem",
                                  fontFamily: "cairo",
                                  fontWeight: 500,
                                }}
                              >
                                {" "}
                                {extra.price} EGP
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      )}
                    </Stack>
                    <TextField
                      placeholder="Enter any special request note"
                      sx={{
                        transition: "1s",
                        "& .MuiInputBase-input": {
                          fontSize: "1.3rem",
                          color: "gray",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "gray",
                          fontSize: "1.3rem",
                        },
                      }}
                    />
                  </Stack>
                </Card>
              ))}
        </Box>
      </Container>
      {/* coupon */}
      <Coupun api_token={api_token}/>
      <Stack className="Delivery" sx={{ m: 2, p: 2 }}>
        <Stack sx={{ borderBottom: "2px solid #ececec", mb: 1 }}>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "5px",
            }}
            direction={"row"}
            alignItems={"center"}
          >
            <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
              Subtotal:
            </Typography>{" "}
            <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
              {subtotalWithExtras.toFixed(2)} EGP
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "5px",
            }}
            direction={"row"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                // my: 2,
              }}
            >
              Delivery Fee:{" "}
            </Typography>{" "}
            <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
              {deliveryFee.toFixed(2)} EGP
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
            direction={"row"}
            alignItems={"center"}
          >
            <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
              Tax {tax} %
            </Typography>
            <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
              {(((subtotal + deliveryFee) * tax) / 100).toFixed(2)} EGP
            </Typography>
          </Stack>
        </Stack>

        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          direction={"row"}
          alignItems={"center"}
        >
          <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
            Total:
          </Typography>
          <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
            {" "}
            {totalWithTax.toFixed(2)} EGP
          </Typography>
        </Stack>
        <FormControl
          component="fieldset"
          sx={{ mt: "2rem", textAlign: "center" }}
        >
          <FormLabel
            component="legend"
            sx={{ fontSize: "1.4rem", fontWeight: "600", textAlign: "center" }}
          >
            Select Payment Method
          </FormLabel>
          <RadioGroup
            aria-label="payment-method"
            name="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Cash on Delivery"
            />
            <FormControlLabel
              value="credit"
              control={<Radio />}
              label="Credit Card"
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePlaceOrder}
          sx={{
            mt: "1.5rem",
            p: "1rem",
            fontSize: "1.5rem",
            backgroundColor: "#d32f2f",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Place Order
        </Button>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle
            sx={{ fontSize: "1.8rem", fontWeight: "600", textAlign: "center" }}
          >
            Payment Information
          </DialogTitle>
          <DialogContent>
            <PaymentPage />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              color="error"
              sx={{ fontSize: "1.1rem", fontWeight: "500" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}

export default CheckOut;

// https://myres.me/chilis/api/coupon/validation?coupon=chi2022&api_token={{api_token}}
// items={"items":[{"id":26,"choices":[],"extras":[],"options":[],"count":1,"special":""}]
// http://myres.me/chilis-dev
