/* eslint-disable no-unused-vars */
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
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddress } from "../../../../../rtk/slices/adderssSlice";
import { BASE_URL } from "../../../apis&fetchData/ApiLinks";
function CheckOut({
  handleRemoveItem,
  cartItems,
  subtotal,
  deliveryFee,
  totalPrices,
  handleCounterChange,
}) {
  const api_token = localStorage.getItem("token");

  // const handleCashPayment = async () => {
  //   try {
  //     const response = await axios.post(API_CHECKOUT, {
  //       // هنا ترسل البيانات الخاصة بطلب الدفع النقدي
  //     });

  //     if (response.data.success) {
  //       alert("تم الطلب بنجاح!");
  //     } else {
  //       alert("فشل الطلب، يرجى المحاولة مرة أخرى.");
  //     }
  //   } catch (error) {
  //     console.error("Error processing payment:", error);
  //     alert("حدث خطأ أثناء معالجة الدفع.");
  //   }
  // };

  const dispatch = useDispatch();
  const addressData = useSelector((state) => state.addresses.items || []);
  const selectedAddress = useSelector(
    (state) => state.addresses.selectedAddress
  );
  useEffect(() => {
    // Log the selected address to the console whenever it changes
    if (selectedAddress) {
      // console.log("Selected Address:", selectedAddress);
    }
  }, [selectedAddress]);

  const handleCheckout = () => {
    if (addressData.length === 1 && !selectedAddress) {
      dispatch(setSelectedAddress(addressData[0]));
    }

    const currentSelectedAddress = selectedAddress || addressData[0];

    if (
      (addressData.length > 1 && !selectedAddress) ||
      !currentSelectedAddress
    ) {
      alert("Please select an address before placing the order.");
      return;
    }

    if (paymentMethod === "credit card") {
      setOpenCreditCardDialog(true); 
      return; 
    }

    // بناء الطلب بناءً على العناصر الموجودة في سلة المشتريات
    const orders = cartItems.map((item) => ({
      id: item.id,
      special: item.specialNote || "",
      extras: item.extras || [],
      count: item.count || 1,
      choices: item.choices || [],
    }));

    const dataToSend = {
      delivery_type: 1,
      payment: paymentMethod === "cash" ? 1 : 2,
      lat: currentSelectedAddress.lat,
      lng: currentSelectedAddress.lng,
      address: currentSelectedAddress.id,
      area: 1,
      branch: 1,
      api_token: api_token,
      items: { items: orders },
      device_id: "",
      notes: "",
      time: "2024-08-20 14:07:07",
      car_model: "",
      car_color: "",
      gift_cards: "",
      coins: "00.00",
    };

    console.log("Checkout data:", dataToSend);

    axios
      .post(`${BASE_URL}/orders/create`, dataToSend)
      .then((response) => {
        console.log("Order placed successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  const [openCreditCardDialog, setOpenCreditCardDialog] = useState(false);

  const handleCloseCreditCardDialog = () => {
    setOpenCreditCardDialog(false);
  };

  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // New state for payment method
  const [openDialog, setOpenDialog] = useState(false);

   const calculateSubtotalWithExtras = () => {
    return cartItems.reduce((accumulator, item, index) => {
      const itemTotal =
        parseFloat(totalPrices[index]) || parseFloat(item.price);

      const extrasTotal = item.extras
        ? item.extras.reduce((sum, extra) => sum + parseFloat(extra.price), 0)
        : 0;


      // إعادة تجميع المجموع الكلي
      return accumulator + itemTotal + extrasTotal;
    }, 0);
  };

  // حساب المجموع الفرعي مع الإضافات
  const subtotalWithExtras = calculateSubtotalWithExtras();
  useEffect(() => {
    const fetchTax = async () => {
      try {
        const response = await axios.get(API_TAX);
        const taxValue = response.data.data.settings.tax;
        setTax(taxValue);
  
        const subtotalWithDelivery = subtotalWithExtras + deliveryFee;
  
        const calculatedTax = (subtotalWithDelivery * (taxValue / 100)).toFixed(2);
  
        const newTotalWithTax = parseFloat(subtotalWithDelivery) + parseFloat(calculatedTax);
  
        setTotalWithTax(newTotalWithTax);
  
        // console.log("Subtotal with Extras and Delivery:", subtotalWithDelivery);
        // console.log("Calculated Tax:", calculatedTax);
        // console.log("New Total with Tax:", newTotalWithTax);
      } catch (error) {
        console.error("Error fetching tax data:", error);
      }
    };
  
    fetchTax();
  }, [subtotalWithExtras, deliveryFee]);
  
  const handleCloseDialog = () => {
    setOpenDialog(false); 
  };

  // 
  const [deliveryType, setDeliveryType] = useState('Delivery'); 


  return (
<>

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
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#000!important",
                                  fontSize: "1.5rem",
                                  fontFamily: "cairo",
                                  fontWeight: 500,
                                }}
                              >
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
                          color: "#000",
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
      <Coupun api_token={api_token} />
      <Stack sx={{ borderBottom: "2px solid #ececec", mb: 1 }}>
        <FormControl
          component="fieldset"
          sx={{ mt: "2rem", textAlign: "center" }}
        >
          <FormLabel
            component="legend"
            sx={{ fontSize: "1.6rem", fontWeight: "600", textAlign: "center" }}
          >
            Select delivery type
          </FormLabel>
          <RadioGroup
            aria-label="delivery-type"
            name="delivery-type"
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
            sx={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              value="pickup"
              control={<Radio />}
              label="Pickup"
              sx={{ fontSize: "1.5rem" }}
            />
            <FormControlLabel
              value="delivery"
              control={<Radio />}
              label="Delivery"
              sx={{ fontSize: "1.5rem" }}
            />
          </RadioGroup>
        </FormControl>
      </Stack>

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
            </Typography>
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
              }}
            >
              Delivery Fee:
            </Typography>
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
              {((subtotalWithExtras + deliveryFee) * (tax / 100)).toFixed(2)}{" "}
              EGP
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
          onClick={handleCheckout}
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
          open={openCreditCardDialog}
          onClose={handleCloseCreditCardDialog}
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
</>
  );
}

export default CheckOut;


