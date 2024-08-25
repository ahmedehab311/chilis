import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import "./OrderOnline.css";
import CheckOut from "./checkOut/CheckOut";
import Address from "../adderess/Address";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../../../../rtk/slices/orderSlice";
import {
  Box,
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
import "./OrderOnline.css";
import imgLogo from "../../../Hero/images/logo.png";
import Counter from "../../ButtonsMenu/CounterDiaolgButton";
import { API_TAX } from "../../apis&fetchData/ApiLinks";
import PaymentPage from "../OrderOnline/checkOut/PaymentPage";
import axios from "axios";
import Coupun from "./checkOut/Coupon/Coupun";
import { setSelectedAddress } from "../../../../rtk/slices/adderssSlice";
import Pickup from "./Pickup/Pickup";
// import img from "../"
function OrderOnline() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrices, setTotalPrices] = useState({});
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const API_CITIES = "https://myres.me/chilis/api/cities";
  const API_ARIA = (cityId) =>
    `https://myres.me/chilis/api/areas/?city=${cityId}`;

  const [bageCount, setBadgeCount] = useState(0);
  const api_token = localStorage.getItem("token"); // استرجاع التوكن من localStorage

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setBadgeCount(cart.length);
    setCartItems(cart);
  }, []);

  useEffect(() => {
    const updatedPrices = {};
    cartItems.forEach((item, index) => {
      updatedPrices[index] = totalPrices[index] || item.price;
    });
    setTotalPrices(updatedPrices);
  }, [cartItems]);

  const handleCounterChange = (index, newTotalPrice) => {
    setTotalPrices((prevPrices) => ({
      ...prevPrices,
      [index]: newTotalPrice,
    }));
  };

  const handleRemoveItem = (index) => {
    // حذف العنصر من Redux store
    dispatch(removeItemFromCart(index));

    // تحديث localStorage إذا كان لديك منطق إضافي هناك
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    // تحديث الحالة في الواجهة الأمامية إذا لزم الأمر
    setCartItems(cart);

    // عرض عدد العناصر في البادج بعد التحديث
    console.log("Updated badge count:", cart.length);

    setTotalPrices((prevPrices) => {
      const newPrices = { ...prevPrices };
      delete newPrices[index];
      return newPrices;
    });
  };

  const subtotal = Object.values(totalPrices).reduce(
    (acc, price) => acc + price,
    0
  );
  const deliveryFee = 50;
  const totalToPay = subtotal + deliveryFee;

  // diolg
  const [selectedCity, setSelectedCity] = useState("");
  const [currentAddress, setCurrentAddress] = useState({
    deliveryCity: "",
    deliveryArea: "",
  });
  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch(API_CITIES);
        const data = await response.json();
        setCities(data.data.cities);
        // console.log(data.data.cities)
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const fetchAreas = async () => {
        setLoadingAreas(true);
        try {
          const response = await fetch(API_ARIA(selectedCity));
          const data = await response.json();
          setAreas(data.data.areas);
        } catch (error) {
          console.error("Error fetching areas:", error);
        } finally {
          setLoadingAreas(false);
        }
      };

      fetchAreas();
    }
  }, [selectedCity]);

  const [addressData, setAddressData] = useState([]);

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const savedAddresses = localStorage.getItem("addresses");
    if (savedAddresses) {
      setAddressData(JSON.parse(savedAddresses));
    }

    const savedActiveIndex = localStorage.getItem("activeIndex");
    if (savedActiveIndex) {
      setActiveIndex(Number(savedActiveIndex));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addressData));
  }, [addressData]);

  useEffect(() => {
    localStorage.setItem("activeIndex", activeIndex);
  }, [activeIndex]);

  const handleSelectLabel = (label) => {
    setCurrentAddress((prev) => ({ ...prev, label }));
  };
  // const [selectedAddress, setSelectedAddress] = useState(null);

  // existing useEffects and functions...

  const handleCardClick = (index) => {
    setActiveIndex(index);
    setSelectedAddress(addressData[index]); // Set selected address when card is clicked
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // في OrderOnline
  const handlePlaceOrder = () => {
    const orderData = {
      items: cartItems,
      total: totalToPay,
      user: user, // تضمين معلومات المستخدم هنا
      address: addressData[activeIndex], // استخدام العنوان النشط
    };
  };
  // checkout

  const handleCashPayment = async () => {
    try {
      const response = await axios.post(API_CHECKOUT, {
        // هنا ترسل البيانات الخاصة بطلب الدفع النقدي
      });

      if (response.data.success) {
        alert("تم الطلب بنجاح!");
      } else {
        alert("فشل الطلب، يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("حدث خطأ أثناء معالجة الدفع.");
    }
  };

  const selectedAddress = useSelector(
    (state) => state.addresses.selectedAddress
  );
  useEffect(() => {
    // Log the selected address to the console whenever it changes
    if (selectedAddress) {
      console.log("Selected Address:", selectedAddress);
    }
  }, [selectedAddress]);
  const [orders, setOrders] = useState([]);

  // const handleCheckout = () => {
  //   // تحقق من العنوان الحالي
  //   if (addressData.length === 1 && !selectedAddress) {
  //     dispatch(setSelectedAddress(addressData[0]));
  //   }

  //   const currentSelectedAddress = selectedAddress || addressData[0];

  //   if (
  //     (addressData.length > 1 && !selectedAddress) ||
  //     !currentSelectedAddress
  //   ) {
  //     alert("Please select an address before placing the order.");
  //     return;
  //   }

  //   // تحقق من طريقة الدفع إذا كانت "credit card"
  //   if (payment === 2) {
  //     // فتح الديالوج الخاص بالـ credit card
  //     openCreditCardDialog();
  //     return; // إيقاف تنفيذ باقي الكود
  //   }

  //   // بناء الطلب بناءً على العناصر الموجودة في سلة المشتريات
  //   const orders = cartItems.map((item) => ({
  //     id: item.id,
  //     special: item.specialNote || "",
  //     extras: item.extras || [],
  //     count: item.count || 1,
  //     choices: item.choices || [],
  //   }));

  //   const dataToSend = {
  //     delivery_type: 1,
  //     payment: paymentMethod === "cash" ? 1 : 2,
  //     lat: currentSelectedAddress.lat,
  //     lng: currentSelectedAddress.lng,
  //     address: currentSelectedAddress.id,
  //     area: 1,
  //     branch: 1,
  //     api_token: api_token,
  //     items: { items: orders },
  //     device_id: "",
  //     notes: "",
  //     time: "2024-08-20 14:07:07",
  //     car_model: "",
  //     car_color: "",
  //     gift_cards: "",
  //     coins: "00.00",
  //   };

  //   console.log("Checkout data:", dataToSend);

  //   axios
  //     .post("http://myres.me/chilis-dev/orders/create", dataToSend)
  //     .then((response) => {
  //       console.log("Order placed successfully:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error placing order:", error);
  //     });
  // };

  // const handleCheckout = () => {
  //   if (addressData.length === 1 && !selectedAddress) {
  //     dispatch(setSelectedAddress(addressData[0]));
  //   }

  //   const currentSelectedAddress = selectedAddress || addressData[0];

  //   if (
  //     (addressData.length > 1 && !selectedAddress) ||
  //     !currentSelectedAddress
  //   ) {
  //     alert("Please select an address before placing the order.");
  //     return;
  //   }

  //   if (paymentMethod === "credit card") {
  //     setOpenCreditCardDialog(true);
  //     return;
  //   }

  //   // بناء الطلب بناءً على العناصر الموجودة في سلة المشتريات
  //   const orders = cartItems.map((item) => ({
  //     id: item.id,
  //     special: item.specialNote || "",
  //     extras: item.extras || [],
  //     count: item.count || 1,
  //     choices: item.name || [],
  //   }));

  //   const dataToSend = {
  //     delivery_type: 1,
  //     payment: paymentMethod === "cash" ? 1 : 2,
  //     lat: currentSelectedAddress.lat,
  //     lng: currentSelectedAddress.lng,
  //     address: currentSelectedAddress.id,
  //     area: 1,
  //     branch: 1,
  //     api_token: api_token,
  //     items: { items: orders },
  //     device_id: "",
  //     notes: "",
  //     time: "2024-08-20 14:07:07",
  //     car_model: "",
  //     car_color: "",
  //     gift_cards: "",
  //     coins: "00.00",
  //   };

  //   console.log("Checkout data:", dataToSend);

  //   axios
  //     .post("http://myres.me/chilis-dev/orders/create", dataToSend)
  //     .then((response) => {
  //       console.log("Order placed successfully:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error placing order:", error);
  //     });
  // };
  const handleCheckout = () => {
    // تحقق من العنوان الحالي في حالة "دليفري"
    if (deliveryType === 1) { // 1 يعني "دليفري"
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

        // بناء الطلب بناءً على العناصر الموجودة في سلة المشتريات
        const orders = cartItems.map((item) => ({
            id: item.id,
            special: item.specialNote || "",
            extras: item.extras || [],
            count: item.count || 1,
            choices: item.name || [],
        }));

        const dataToSend = {
            delivery_type: 1, // دليفري
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

        
        axios
        .post("http://myres.me/chilis-dev/orders/create", dataToSend)
        .then((response) => {
          console.log("Order placed successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
        
        console.log("Checkout data:", dataToSend);
    } else if (deliveryType === 2) { // 2 يعني "باك أب"
        // بناء الطلب بناءً على العناصر الموجودة في سلة المشتريات
        const orders = cartItems.map((item) => ({
            id: item.id,
            special: item.specialNote || "",
            extras: item.extras || [],
            count: item.count || 1,
            choices: item.choices || [],
        }));

        const dataToSend = {
            delivery_type: 2, // باك أب
            payment: paymentMethod === "cash" ? 1 : 2,
            lat: null, // لا حاجة لإرسال موقع
            lng: null, // لا حاجة لإرسال موقع
            address: 0, // قيمة العنوان 0 في حالة الباك أب
            area: null, // لا حاجة لإرسال منطقة
            branch: selectedBranchId, // تحديد البرانش المختار
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
            .post("http://myres.me/chilis-dev/orders/create", dataToSend)
            .then((response) => {
                console.log("Order placed successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error placing order:", error);
            });
    }
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

        const calculatedTax = (subtotalWithDelivery * (taxValue / 100)).toFixed(
          2
        );

        const newTotalWithTax =
          parseFloat(subtotalWithDelivery) + parseFloat(calculatedTax);

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
  const [deliveryType, setDeliveryType] = useState("delivery");



  return (
    <Stack
      className={"orderOnline"}
      sx={{
        display: "flex",
        mx: "6rem",
        "@media (max-width: 1000px)": {
          flexDirection: "column !important",
        },
        "@media (max-width: 480px)": {
          mx: "0.5rem",
        },
      }}
      direction={"row"}
      alignItems={"center"}
    >
      {/* <Pickup/> */}
      {/* <CheckOut
        totalToPay={totalToPay}
        handleRemoveItem={handleRemoveItem}
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        totalPrices={totalPrices}
        handleCounterChange={handleCounterChange}
        selectedAddress={selectedAddress} // Pass selected address to CheckOut
        deliveryType={deliveryType}
      /> */}

      <div>
        {deliveryType === "pickup" ? (
          <Pickup />
        ) : (
          <Address
            handlePlaceOrder={handlePlaceOrder}
            handleCardClick={handleCardClick}
            handleSelectLabel={handleSelectLabel}
          />
        )}
      </div>

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
              sx={{
                fontSize: "1.6rem",
                fontWeight: "600",
                textAlign: "center",
              }}
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
              sx={{
                fontSize: "1.4rem",
                fontWeight: "600",
                textAlign: "center",
              }}
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
              sx={{
                fontSize: "1.8rem",
                fontWeight: "600",
                textAlign: "center",
              }}
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
    </Stack>
  );
}

export default OrderOnline;
