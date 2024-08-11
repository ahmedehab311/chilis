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
  // import { API_TAX } from "../../../apis&fetchData/ApiLinks";
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
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [showCardForm, setShowCardForm] = useState(false);
  
    const [tax, setTax] = useState(0);
    const [totalWithTax, setTotalWithTax] = useState(0);
  
    const API_TAX = "http://myres.me/chilis/api/settings";
  
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
        const itemTotal = (totalPrices[index] || item.price);
        const extrasTotal = item.extras ? item.extras.reduce((sum, extra) => sum + parseFloat(extra.price), 0) : 0;
        return acc + itemTotal + extrasTotal;
      }, 0);
    };
  
    const subtotalWithExtras = calculateSubtotalWithExtras();
  
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
          maxHeight: "550px",
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
  
        <Container sx={{ margin: "0 auto", borderBottom: "2px solid #ececec" }}>
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
                            fontSize: "2rem",
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
                                    color: "#17a2b8!important",
                                    fontSize: "1.8rem",
                                    fontWeight: "bold",
                                    fontFamily: "cairo",
                                  }}
                                >
                                  {extra.name}
                                </Typography>{" "}
                                <Typography
                                  sx={{
                                    color: "#17a2b8!important",
                                    fontSize: "1.8rem",
                                    fontWeight: "bold",
                                    fontFamily: "cairo",
                                  }}
                                >
                                  {" "}
                                  {extra.price} EGP
                                </Typography>
                              </Stack>
                            ))}
                          </Stack>
                        )}
                        <Typography
                          sx={{
                            color: "#17a2b8!important",
                            fontSize: "1.8rem",
                            fontWeight: "bold",
                            fontFamily: "cairo",
                          }}
                        >
                          {item.extras.name}
                        </Typography>
                      </Stack>
                      <TextField
                        placeholder="Enter any special request note"
                        sx={{
                          transition: "1s",
                          "& input::placeholder": {
                            color: "gray",
                            fontSize: "1.3rem",
                            textAlign: "center",
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
              spacing={0}
              alignItems="center"
              sx={{ mb: "1rem" }}
            >
              <TextField
                id="coupon-code-input"
                placeholder="Enter coupon code"
                sx={{
                  flex: 1,
                  "& .MuiInputBase-input": {
                    padding: "1.1rem 1rem !important",
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                  "& input::placeholder": {
                    fontSize: "1.6rem",
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
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    backgroundColor: "#017C8A",
                    "&:hover": {
                      backgroundColor: "#017C8A",
                    },
                  }}
                >
                  Apply
                </Button>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography
                sx={{ color: "#333", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Subtotal
              </Typography>
              <Typography
                sx={{ color: "#333", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                {subtotalWithExtras.toFixed(2)} EGP
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography
                sx={{ color: "#333", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Delivery Fee
              </Typography>
              <Typography
                sx={{ color: "#333", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                {deliveryFee.toFixed(2)} EGP
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography
                sx={{ color: "#333", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Tax ({tax}%)
              </Typography>
              <Typography
                sx={{ color: "#333", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                {(subtotalWithExtras * (tax / 100)).toFixed(2)} EGP
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              sx={{ justifyContent: "space-between", borderTop: "2px solid #ececec", pt: 2 }}
            >
              <Typography
                sx={{ color: "#333", fontSize: "1.8rem", fontWeight: "bold" }}
              >
                Total
              </Typography>
              <Typography
                sx={{ color: "#333", fontSize: "1.8rem", fontWeight: "bold" }}
              >
                {totalWithTax.toFixed(2)} EGP
              </Typography>
            </Stack>
          </Stack>
          <Button
            onClick={() => setOpenPaymentDialog(true)}
            sx={{ mt: 2 }}
            variant="contained"
          >
            Proceed to Payment
          </Button>
        </Stack>
      </Container>
    );
  }

export default CheckOut
