import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { toast } from "react-toastify";
import "./OrderOnline.css";
// import CheckOut from "./checkOut/CheckOut";
import Address from "../adderess/Address";
import { useDispatch, useSelector } from "react-redux";
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
import imgLogo from "../../../Hero/images/logo.png";
import Counter from "../../ButtonsMenu/CounterDiaolgButton";
import { API_TAX } from "../../apis&fetchData/ApiLinks";
import PaymentPage from "../OrderOnline/checkOut/PaymentPage";
import axios from "axios";
import Coupun from "./checkOut/Coupon/Coupun";
import { setSelectedAddress } from "../../../../rtk/slices/adderssSlice";
import { removeItemFromCart } from "../../../../rtk/slices/orderSlice";
import { clearCart,updateItemQuantity } from "../../../../rtk/slices/cartSlice";
import Pickup from "./Pickup/Pickup";
import { BASE_URL } from "../../apis&fetchData/ApiLinks";
function OrderOnline() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [totalPrices, setTotalPrices] = useState({});
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const API_CITIES = `${BASE_URL}/cities`;
  const API_ARIA = (cityId) => `${BASE_URL}/areas/?city=${cityId}`;
  const [bageCount, setBadgeCount] = useState(0);
  const api_token = localStorage.getItem("token");
  // const handleRemoveItem = (index) => {
  //   dispatch(removeItemFromCart(index));
  // };
  useEffect(() => {
    const updatedPrices = {};
    cartItems.forEach((item, index) => {
      updatedPrices[index] = item.price; // Assuming price is already correct
    });
    setTotalPrices(updatedPrices);
  }, [cartItems]);




  const handleCounterChange = (index, newTotalPrice) => {
    setTotalPrices((prevPrices) => ({
      ...prevPrices,
      [index]: newTotalPrice,
    }));
  };

  // const handleRemoveItem = (index) => {
  //   // حذف العنصر من Redux store
  //   dispatch(removeItemFromCart(index));

  //   // تحديث localStorage إذا كان لديك منطق إضافي هناك
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   cart.splice(index, 1);
  //   localStorage.setItem("cart", JSON.stringify(cart));

  //   // تحديث الحالة في الواجهة الأمامية إذا لزم الأمر
  //   setCartItems(cart);

  //   // عرض عدد العناصر في البادج بعد التحديث
  //   console.log("Updated badge count:", cart.length);

  //   setTotalPrices((prevPrices) => {
  //     const newPrices = { ...prevPrices };
  //     delete newPrices[index];
  //     return newPrices;
  //   });
  // };
  // const handleRemoveItem = (index) => {
  //   // حذف العنصر من Redux store
  //   dispatch(removeItemFromCart(index));

  //   // تحديث localStorage إذا كان لديك منطق إضافي هناك
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   if (index >= 0 && index < cart.length) {
  //     cart.splice(index, 1); // حذف العنصر المحدد فقط
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   }

  //   // تحديث الحالة في الواجهة الأمامية إذا لزم الأمر
  //   setCartItems(cart);

  //   // عرض عدد العناصر في البادج بعد التحديث
  //   console.log("Updated badge count:", cart.length);

  //   setTotalPrices((prevPrices) => {
  //     const newPrices = { ...prevPrices };
  //     delete newPrices[index];
  //     return newPrices;
  //   });
  // };
  // const handleRemoveItem = (index) => {
  //   console.log('Removing item at index:', index);
    
  //   // قراءة السلة من localStorage
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   console.log('Cart before removal:', cart);
  
  //   if (index >= 0 && index < cart.length) {
  //     // حذف العنصر من Redux store
  //     dispatch(removeItemFromCart(index));
  
  //     // حذف العنصر من localStorage
  //     cart.splice(index, 1);
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     console.log('Cart after removal:', cart);
  //   }
  
  //   // تحديث الحالة في الواجهة الأمامية
  //   setCartItems(cart);
  
  //   // عرض عدد العناصر في البادج بعد التحديث
  //   console.log("Updated badge count:", cart.length);
  
  //   // تحديث الأسعار بعد حذف العنصر
  //   setTotalPrices(prevPrices => {
  //     const newPrices = { ...prevPrices };
  //     delete newPrices[index];
  //     console.log('Prices after removal:', newPrices);
  //     return newPrices;
  //   });
  // };
  const handleRemoveItem = (index) => {
    console.log('Removing item at index:', index);
    
    // قراءة السلة من localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log('Cart before removal:', cart);
  
    if (index >= 0 && index < cart.length) {
      // حذف العنصر من Redux store
      dispatch(removeItemFromCart(cart[index].id)); // Assuming item has id
      
      // حذف العنصر من localStorage
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log('Cart after removal:', cart);
      
      // تحديث الحالة في الواجهة الأمامية
      setCartItems(cart);
    }
    
    // عرض عدد العناصر في البادج بعد التحديث
    console.log("Updated badge count:", cart.length);
    
    // تحديث الأسعار بعد حذف العنصر
    const updatedPrices = {};
    cart.forEach((item, idx) => {
      updatedPrices[idx] = item.price * item.quantity;
    });
  
    setTotalPrices(updatedPrices);
    console.log('Prices after removal:', updatedPrices);
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
    if (addressData.length > 0) {
      localStorage.setItem("addresses", JSON.stringify(addressData));
    }
  }, [addressData]);

  // تخزين activeIndex
  const handleCardClick = (index) => {
    if (Number.isInteger(index)) {
      setActiveIndex(index);
      setSelectedAddress(addressData[index]);
    } else {
      console.error("Invalid index:", index);
    }
  };

  useEffect(() => {
    if (activeIndex !== null && !isNaN(activeIndex)) {
      localStorage.setItem("activeIndex", activeIndex.toString());
    }
  }, [activeIndex]);

  const handleSelectLabel = (label) => {
    setCurrentAddress((prev) => ({ ...prev, label }));
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
      user: user,
      address: addressData[activeIndex],
    };
  };
  const [quantity, setQuantity] = useState(1);
console.log('Cart items in checkout:', cartItems);
  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(updateItemQuantity({ itemId, newQuantity }));
  };
  
  // const cartItems = useSelector((state) => state.cart.items);

  // checkout

  const selectedAddress = useSelector(
    (state) => state.addresses.selectedAddress
  );
  useEffect(() => {
    // Log the selected address to the console whenever it changes
    if (selectedAddress) {
      console.log("Selected Address:", selectedAddress);
    }
  }, [selectedAddress]);

  const selectedOption = useSelector((state) => state.info.selectedOption);
  const idInfo = useSelector((state) => state.info.idInfo);
  useEffect(() => {
    if (idInfo) {
      // تخزين idInfo في localStorage
      localStorage.setItem("idInfo", idInfo);
    }
  }, [idInfo]);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  const [specialNotes, setSpecialNotes] = useState({});

  const handleSpecialNoteChange = (itemId, note) => {
    setSpecialNotes((prevNotes) => ({
      ...prevNotes,
      [itemId]: note,
    }));
  };

  useEffect(() => {
    const orderSuccess = localStorage.getItem("orderSuccess");

    if (orderSuccess === "true") {
      localStorage.removeItem("orderSuccess");
    }
  }, []);
  const handleCheckout = () => {
    console.log("addressData", addressData);

    if (addressData.length === 1 && !selectedAddress) {
      dispatch(setSelectedAddress(addressData[activeIndex]));
    }

    console.log("selectedAddress", selectedAddress);

    if (paymentMethod === "credit card") {
      setOpenCreditCardDialog(true);
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const ids = cart.map((item) => item.id);

    // const getIdInfo = localStorage.getItem("idInfo");
    const orders = cartItems.map((item) => ({
      id: item.id,
      special: specialNotes[item.id] || "",
      extras: Array.isArray(item.extras)
        ? item.extras.map((extra) => extra.id)
        : [],
      count: quantity,
      choices: [],
      options: [item.option.id] || [],
    }));
    const dataToSend = {
      delivery_type: 1,
      payment: paymentMethod === "cash" ? 1 : 2,
      lat: deliveryType === 1 ? selectedAddress.lat : 0,
      lng: deliveryType === 1 ? selectedAddress.lng : 0,
      address: selectedAddress,
      area: deliveryType === 1 ? selectedAddress.area : 10,
      branch: selectedBranchId || null,
      api_token: api_token,
      items: JSON.stringify({ items: orders }),
      device_id: "",
      notes: "",
      time: "2024-08-20 14:07:07",
      car_model: "",
      car_color: "",
      gift_cards: "",
      coins: "00.00",
    };

    // console.log("selectedBranchId", selectedBranchId);
    console.log("Checkout data:", dataToSend);
    const params = new URLSearchParams(dataToSend);

    axios
      .post(`${BASE_URL}/orders/create?${params.toString()}`)
      .then((response) => {
        if (response.data.response) {
          console.log(response.data);
          localStorage.setItem("orderSuccess", "true");
          localStorage.removeItem("idInfo");

          // إعادة تحميل الصفحة
          // window.location.reload();

          toast.success(
            "Your order has been placed successfully. It will be delivered as soon as possible."
          );

          dispatch(clearCart());
        } else {
          toast.error(
            "An error occurred while processing your order. Please try again."
          );
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response);
          console.error("Error response data:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        console.error("Error config:", error.config);

        toast.error("Error placing order. Please try again.");
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

      return accumulator + itemTotal + extrasTotal;
    }, 0);
  };

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

  const [dataOptions, setDataOptions] = useState([]);

  // console.log("dataOptions",dataOptions)

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
          // maxHeight: "580px",
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
          <Box className="orderNow" sx={{ borderRadius: "8px" }}>
            {cartItems.length === 0
              ? null
              : cartItems.map((item, index) => (
                  <Card key={index} sx={{ p: 2, my: 3 }}>
                    <Stack sx={{ position: "relative" }}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        sx={{ display: "flex" }}
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
                            "&:hover": { color: "#e31616!important" },
                          }}
                        >
                          X
                        </Typography>
                      </Stack>

                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          m: "10px 0",
                        }}
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
                        {/* <Counter
                          basePrice={item.price}
                          onChange={(newTotalPrice) =>
                            handleCounterChange(index, newTotalPrice)
                          }
                          onQuantityChange={handleQuantityChange}
                        /> */}
                        <Counter
                        basePrice={item.price}
                        onChange={(newTotalPrice) =>
                          handleCounterChange(index, newTotalPrice)
                        }
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(index, newQuantity)
                        }
                      />
                      </Stack>

                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
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
                          sx={{ fontSize: "1.5rem", fontWeight: 500 }}
                        >
                          {(totalPrices[index] || item.price).toFixed(2)} EGP
                        </Typography>
                      </Stack>

                      {item.extras && item.extras.length > 0 && (
                        <Stack sx={{ mt: 2 }}>
                          {item.extras.map((extra, i) => (
                            <Stack
                              key={i}
                              direction={"row"}
                              alignItems={"center"}
                              sx={{ justifyContent: "space-between", mb: 1 }}
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

                          {selectedOption && (
                            <Stack sx={{ mb: 2 }}>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold", color: "red" }}
                              >
                                option
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ marginLeft: 2 }}
                              >
                                {selectedOption.name_en}
                              </Typography>
                            </Stack>
                          )}
                        </Stack>
                      )}

                      <TextField
                        placeholder="Enter any special request note"
                        value={specialNotes[item.id] || ""} // ربط الحقل النصي مع الحالة
                        onChange={(e) =>
                          handleSpecialNoteChange(item.id, e.target.value)
                        }
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
            {/* <Stack
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
            </Stack> */}
            {deliveryType === "delivery" && (
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
            )}
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
              {/* <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                {((subtotalWithExtras + deliveryFee) * (tax / 100)).toFixed(2)}{" "}
                EGP
              </Typography> */}
              <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                {(
                  (subtotalWithExtras +
                    (deliveryType === "delivery" ? deliveryFee : 0)) *
                  (tax / 100)
                ).toFixed(2)}{" "}
                EGP
              </Typography>
            </Stack>
          </Stack>

          {/* <Stack
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
          </Stack> */}
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
              {(
                subtotalWithExtras +
                (deliveryType === "delivery" ? deliveryFee : 0) +
                (subtotalWithExtras +
                  (deliveryType === "delivery" ? deliveryFee : 0)) *
                  (tax / 100)
              ).toFixed(2)}{" "}
              EGP
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
            disabled={cartItems.length === 0}
            sx={{
              mt: "1.5rem",
              p: "1rem",
              fontSize: "1.5rem",
              backgroundColor: cartItems.length === 0 ? "#ccc" : "#d32f2f",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: cartItems.length === 0 ? "#ccc" : "#d32f2f",
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
