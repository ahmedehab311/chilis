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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

function CheckOut({
  handleRemoveItem,
  cartItems,
  subtotal,
  deliveryFee,
  totalPrices,
  handleCounterChange,
}) {
  //
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showCardForm, setShowCardForm] = useState(false);

  const handleClickOpen = () => {
    setOpenPaymentDialog(true);
  };

  const handleClose = () => {
    setOpenPaymentDialog(false);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === "card") {
      setShowCardForm(true);
    } else {
      setShowCardForm(false);
    }
  };

  const handlePlaceOrder = () => {
    handleClose();
    if (paymentMethod === "cash") {
      alert("Order placed successfully with cash payment!");
    } else if (paymentMethod === "card") {
      alert("Redirecting to credit card payment page...");
    }
  };
  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);

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
                          // color: "#6c757d!important",
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
                                  // fontWeight: "bold",
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
                                  // fontWeight: "bold",
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
                      {/* <Typography
                        sx={{
                          color: "#17a2b8!important",
                          fontSize: "1.8rem",
                          fontWeight: "bold",
                          fontFamily: "cairo",
                        }}
                      >
                        {item.extras.name}
                      </Typography> */}
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

      <Stack
        className="middleOrder"
        sx={{ p: 2, borderBottom: "2px solid #ececec" }}
      >
        <Stack className="middleOrder" sx={{ p: 2 }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: "1rem" }}
          >
            <TextField
              id="coupon-code-input"
              placeholder="Enter coupon code"
              sx={{
                flex: 1,

                "& .MuiInputBase-input": {
                  // borderTopRightRadius: 0,
                  // borderBottomRightRadius: 0,
                  padding: ".9rem 1rem !important",
                  fontSize: "1.3rem", // لتغيير حجم النص
                  color: "gray",
                  // margin: ".4rem",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "gray",
                  fontSize: "1.3rem",
                },
              }}
            />
            <Stack>
              <Button
                variant="contained"
                color="error"
                sx={{
                  p: "10px 16px !important",
                  height: "100%",
                  // borderTopLeftRadius: 0,
                  // borderBottomLeftRadius: 0,
                  backgroundColor: "#d32f2f",
                  "&:hover": { backgroundColor: "#d32f2f" },
                }}
              >
                Apply
              </Button>
            </Stack>
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
              transition: ".5s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& .MuiInputBase-input": {
                fontSize: "1.5rem", // لتغيير حجم النص
                color: "gray",
                // margin: ".4rem",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "gray",
                fontSize: "1.3rem",
              },
            }}
            InputProps={{
              style: {
                textAlign: "center", // Ensure placeholder text alignment
              },
            }}
          />
        </Stack>
      </Stack>

      <Stack className="Delivery" sx={{ m: 2, p: 2 }}>
        <Stack
        //  sx={{borderBottom:"1px solid rgba(0,0,0,.1)" }}
        >
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
              {subtotalWithExtras.toFixed(2)} EGP
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
              {deliveryFee.toFixed(2)} EGP
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
            // borderBottom:"1px solid rgba(0,0,0,.1)"
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
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit Card"
              />
            </RadioGroup>
            {showCardForm && (
              <Box mt={2}>
                <TextField
                  label="Card Number"
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "1.5rem", // لتغيير حجم النص
                      color: "gray",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontSize: "1.3rem",
                    },
                  }}
                />
                <TextField
                  label="Expiry Date"
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "1.5rem", // لتغيير حجم النص
                      color: "gray",
                      // margin: ".4rem",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontSize: "1.3rem",
                    },
                  }}
                />
                <TextField
                  label="CVV"
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "1.5rem", // لتغيير حجم النص
                      color: "gray",
                      // margin: ".4rem",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontSize: "1.3rem",
                    },
                  }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button onClick={handlePlaceOrder} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}

export default CheckOut;
