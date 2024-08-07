/* eslint-disable react/prop-types */
import {
  Box,
  Stack,
  TextField,
  Typography,
  Card,
  Container,
  Button,
} from "@mui/material";
import "../OrderOnline.css";
import imgLogo from "../../../../Hero/images/logo.png";
import Counter from "../../../ButtonsMenu/CounterDiaolgButton";
import { API_TAX } from "../../../apis&fetchData/ApiLinks";
import { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import axios from "axios";

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
  // 
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCardForm, setShowCardForm] = useState(false);
  
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
  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);

 
  // في قسم useEffect الخاص بالحساب
// useEffect(() => {
//   // Fetch tax data when the component mounts
//   const fetchTax = async () => {
//     try {
//       const response = await axios.get(API_TAX);
//       const taxValue = response.data.data.settings.tax;
//       setTax(taxValue);
      
//       // حساب الإجمالي مع الضريبة
//       const subtotalWithDelivery = subtotal + deliveryFee;
//       const calculatedTax = subtotalWithDelivery * (taxValue / 100);
//       setTotalWithTax(subtotalWithDelivery + calculatedTax);
      
//       // console.log(response.data.data.settings.tax);
//     } catch (error) {
//       console.error("Error fetching tax data:", error);
//     }
//   };

//   fetchTax();
// }, [subtotal, deliveryFee]); // التأكد من تحديث totalWithTax عند تغيير subtotal أو deliveryFee

useEffect(() => {
  // Fetch tax data when the component mounts or when subtotal or deliveryFee change
  const fetchTax = async () => {
    try {
      const response = await axios.get(API_TAX);
      const taxValue = response.data.data.settings.tax;
      setTax(taxValue);
      
      // حساب الإجمالي مع الضريبة
      const subtotalWithDelivery = subtotal + deliveryFee;
      const calculatedTax = subtotalWithDelivery * (taxValue / 100);
      setTotalWithTax(subtotalWithDelivery + calculatedTax);
    } catch (error) {
      console.error("Error fetching tax data:", error);
    }
  };

  fetchTax();
}, [subtotal, deliveryFee]); // تأكد من أن subtotal و deliveryFee يتغيران فقط عند الضرورة


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
        sx={{ p: 1, borderBottom:"2px solid #ececec" }}
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

      <Container sx={{ margin: "0 auto",borderBottom:"2px solid #ececec" }}>
        <Box
          className="orderNow"
          sx={{
            borderRadius: "8px",
          }}
        >
          {cartItems.length === 0
            ? null
            : cartItems.map((item, index) => (
                <Card key={index} sx={{ p: 2, my:3 }}>
                  <Stack sx={{ position: "relative" }}>
                    <Stack
                      sx={{ display: "flex" }}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Typography
                        sx={{
                          color: "#000",
                          fontSize: "2.5rem",
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
                          fontSize: "1.8rem",
                          fontWeight: "bold",
                          fontFamily: "cairo",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#17a2b8!important",
                       fontSize: "1.8rem",
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
                          fontSize: "1.4rem",
                          fontWeight: 500,
                        }}
                      >
                        Regular
                      </Typography>
                      <Typography
                        sx={{
                          color: "#6c757d!important",
                          fontSize: "1.4rem",
                          fontWeight: 500,
                        }}
                      >
                        {totalPrices[index] || item.price} EGP
                      </Typography>
                    </Stack>
                    <TextField
                      placeholder="Enter any special request note"
                      sx={{
                        transition: "1s",
                        "& input::placeholder": {
                          color: "gray",
                          fontSize: "13px",
                          textAlign: "center",
                        },
                      }}
                    />
                  </Stack>
                </Card>
              ))}
        </Box>
      </Container>

      {/* <Stack className="middleOrder" sx={{ p: 2 }}>
        <TextField
          className="formControl"
          id="outlined-basic"
          placeholder="Any notes? please enter it here."
          fullWidth
          multiline
          minRows={5}
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            transition: ".5s",
            "& input::placeholder": {
              color: "red",
              fontSize: "22px",
              textAlign: "center",
            },
          }}
        />
      </Stack> */}
      <Stack className="middleOrder" sx={{ p: 2,borderBottom:"2px solid #ececec" }}>
      <Stack className="middleOrder" sx={{ p: 2 }}>
  <Stack direction="row" spacing={0} alignItems="center">
    <TextField
      id="coupon-code-input"
      placeholder="Enter coupon code"
      sx={{
     
        flex: 1,
        "& .MuiInputBase-input": {
          padding: "13px 10px !important",
        },
        "& input::placeholder": {
          fontSize: "16px",
        },
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
    />
    <Button
      variant="contained"
      color="primary"
      sx={{
        p:"10px 16px !important",
        height: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: "#1976d2",
        "&:hover": { backgroundColor: "#115293" },
      }}
    >
      Apply
    </Button>
  </Stack>
  <TextField
    className="formControl"
    id="outlined-basic"
    placeholder="Any notes? please enter it here."
    fullWidth
    multiline
    minRows={5}
    sx={{
    
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      transition: ".5s",
      "& input::placeholder": {
        color: "red",
        fontSize: "22px",
        textAlign: "center",
      },
    }}
  />
</Stack>


</Stack>

      <Stack className="Delivery" sx={{ m: 2, p: 2 }}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          direction={"row"}
          alignItems={"center"}
        >
          <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
            Subtotal:
          </Typography>{" "}
          <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
            {subtotal} EGP
          </Typography>
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
              fontSize: "15px",
              fontWeight: "bold",
              my: 2,
            }}
          >
            Delivery Fee:{" "}
          </Typography>{" "}
          <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
            {deliveryFee} EGP
          </Typography>
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
            Tax ({tax} %):
          </Typography>
          <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
            {(subtotal * tax / 100).toFixed(2)} EGP
          </Typography>
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
        <Stack className="stackBtn" sx={{ p: 2 }}>
        <Button
      color="error"
      variant="contained"
      className="placeOrderBtn"
      disabled={cartItems.length === 0}
      onClick={handleClickOpen}
    >
      PLACE ORDER
    </Button>

        </Stack>
        <Dialog open={openPaymentDialog} onClose={handleClose}>
      <DialogTitle>Select Payment Method</DialogTitle>
      <DialogContent>
        <RadioGroup
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <FormControlLabel value="cash" control={<Radio />} label="Cash" />
          <FormControlLabel value="card" control={<Radio />} label="Credit Card" />
        </RadioGroup>
        {showCardForm && (
          <Box mt={2}>
            <TextField
              label="Card Number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Expiry Date"
              fullWidth
              margin="normal"
            />
            <TextField
              label="CVV"
              fullWidth
              margin="normal"
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePlaceOrder} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>

      </Stack>
    </Container>
  );
}

export default CheckOut;
