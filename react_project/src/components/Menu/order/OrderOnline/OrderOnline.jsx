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
import {
  setSelectedAddress,
  fetchAddresses,
} from "../../../../rtk/slices/adderssSlice";
import { removeItemFromCart } from "../../../../rtk/slices/orderSlice";
import {
  clearCart,
  updateItemQuantity,
  updateCartItems,
} from "../../../../rtk/slices/cartSlice";
import Pickup from "./Pickup/Pickup";
import { BASE_URL } from "../../apis&fetchData/ApiLinks";
import { v4 as uuidv4 } from 'uuid';

function OrderOnline() {
  const api_token = localStorage.getItem("token");
  const API_CITIES = `${BASE_URL}/cities`;
  const API_ARIA = (cityId) => `${BASE_URL}/areas/?city=${cityId}`;

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [tax, setTax] = useState(0);
  const [specialNotes, setSpecialNotes] = useState({});
  const [addressData, setAddressData] = useState([]);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [openDialog, setOpenDialog] = useState(false);
  const [subtotalWithExtras, setSubtotalWithExtras] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [totalPrices, setTotalPrices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [currentAddress, setCurrentAddress] = useState({
    deliveryCity: "",
    deliveryArea: "",
  });
  const subtotal = Object.values(totalPrices).reduce(
    (acc, price) => acc + price,
    0
  );
  const deliveryFee = 50;
  const totalToPay = subtotal + deliveryFee;

  useEffect(() => {
    const updatedPrices = {};
    cartItems.forEach((item, index) => {
      updatedPrices[index] = item.price;
    });
    setTotalPrices(updatedPrices);
  }, [cartItems]);
  useEffect(() => {
    // استرجاع السلة من localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // تحديث Redux بالسلة المحفوظة إذا كانت موجودة
    if (savedCart.length > 0) {
      dispatch(updateCartItems(savedCart));
    }
  }, [dispatch]);
  // const handleCounterChange = (index, newTotalPrice) => {
  //   // تأكد من أن `totalPrices` هو array
  //   if (!Array.isArray(totalPrices)) {
  //     setTotalPrices([]);
  //     return;
  //   }

  //   const updatedPrices = [...totalPrices];
  //   updatedPrices[index] = newTotalPrice;
  //   setTotalPrices(updatedPrices);
  // };

  const handleCounterChange = (index, newTotalPrice) => {
    // تأكد من أن totalPrices هو كائن وليس مصفوفة
    if (typeof totalPrices !== 'object') {
      setTotalPrices({});
      return;
    }
  
    // تحديث الأسعار بناءً على الفهرس
    setTotalPrices((prevPrices) => ({
      ...prevPrices,
      [index]: newTotalPrice,
    }));
  };
  

 
  // const handleRemoveItem = (index) => {
  //   // حذف العنصر من Redux store
  //   dispatch(removeItemFromCart(index));
  
  //   // قراءة السلة من localStorage
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  //   if (index >= 0 && index < cart.length) {
  //     // حذف العنصر من localStorage
  //     cart.splice(index, 1);
  //     localStorage.setItem("cart", JSON.stringify(cart));
  
  //     // تحديث الكونترات بعد الحذف
  //     cart.forEach((item, idx) => {
  //       const updatedQuantity = item.quantity;
  //       // استخدم هذه الكمية لتحديث الكونترات في واجهة المستخدم
  //       // يمكنك تحديث الكونترات باستخدام setQuantity هنا أو من خلال Redux
  //     });
  //   }
  
  //   // إعادة حساب الأسعار بعد الحذف
  //   const updatedPrices = {};
  //   cart.forEach((item, idx) => {
  //     updatedPrices[idx] = item.price * item.quantity;
  //   });
  
  //   setTotalPrices(updatedPrices);
  // };
  


  // تخزين activeIndex

  
  const handleRemoveItem = (index) => {
    // حذف العنصر من Redux
    dispatch(removeItemFromCart(index));
  
    // تحديث localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    // تحديث الأسعار بعد الحذف
    const updatedPrices = {};
    cart.forEach((item, idx) => {
      updatedPrices[idx] = item.price * item.quantity;
    });
    setTotalPrices(updatedPrices);
  };
  
  useEffect(() => {
    if (activeIndex !== null && !isNaN(activeIndex)) {
      localStorage.setItem("activeIndex", activeIndex.toString());
    }
  }, [activeIndex]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // في OrderOnline

  useEffect(() => {
    const initialPrices = cartItems.map((item) => item.price * item.quantity);
    setTotalPrices(initialPrices);
  }, [cartItems]);
  // const handleQuantityChange = (itemId, newQuantity) => {
  //   // تحديث الكمية في Redux أو الحالة المناسبة
  //   dispatch(updateItemQuantity({ itemId, quantity: newQuantity }));

  //   // تحديث totalPrices بناءً على الكمية الجديدة
  //   setTotalPrices((prevPrices) => {
  //     if (!Array.isArray(prevPrices)) {
  //       // ضمان أن prevPrices هو مصفوفة
  //       return [];
  //     }
  //     const updatedPrices = [...prevPrices];
  //     const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  //     if (itemIndex > -1) {
  //       const item = cartItems[itemIndex];
  //       updatedPrices[itemIndex] = item.price * newQuantity;
  //     }
  //     return updatedPrices;
  //   });
  // };

  const handleQuantityChange = (itemId, newQuantity) => {
    // تحديث الكمية في Redux
    dispatch(updateItemQuantity({ uniqueId: itemId, quantity: newQuantity }));
  
    // تحديث الأسعار بناءً على الكمية الجديدة
    setTotalPrices((prevPrices) => {
      const updatedPrices = { ...prevPrices };
      const itemIndex = cartItems.findIndex((item) => item.id === itemId);
      if (itemIndex > -1) {
        const item = cartItems[itemIndex];
        updatedPrices[itemIndex] = item.price * newQuantity;
      }
      return updatedPrices;
    });
  };
  
  const handleCloseCreditCardDialog = () => {
    setOpenCreditCardDialog(false);
  };

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

  useEffect(() => {
    const newSubtotalWithExtras = calculateSubtotalWithExtras();
    setSubtotalWithExtras(newSubtotalWithExtras);
  }, [cartItems, totalPrices]);

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
  // checkout

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
    console.log("address.id", address?.id); // استخدم `?.` للتأكد من وجود `address`

    if (!address?.id) {
      toast.error("Please select a delivery address before proceeding.");
      return;
    }

    if (addressData.length === 1 && !address.id) {
      dispatch(setSelectedAddress(addressData[activeIndex]));
    }

    console.log("selectedAddress", address.id);

    if (paymentMethod === "credit card") {
      setOpenCreditCardDialog(true);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const ids = cart.map((item) => item.id);

    const orders = cartItems.map((item) => ({
      id: item.id,
      special: specialNotes[item.id] || "",
      extras: Array.isArray(item.extras)
        ? item.extras.map((extra) => extra.id)
        : [],
      count: item.quantity,
      choices: [],
      options: item.option ? [item.option.id] : [],
    }));

    // تحقق من وجود `area` و `branches` قبل الوصول إليها
    if (!address?.area?.id || !address?.branches?.[0]?.id) {
      toast.error("Please select a valid area and branch.");
      return;
    }

    const dataToSend = {
      delivery_type: 1,
      payment: paymentMethod === "cash" ? 1 : 2,
      lat: deliveryType === 1 ? address.lat : 0,
      lng: deliveryType === 1 ? address.lng : 0,
      address: currentAddress.id,
      area: address.area?.id, // تأكد من وجود `area.id`
      branch: address.branches?.[0]?.id, 
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

    console.log("Checkout data:", dataToSend);

    const params = new URLSearchParams(dataToSend);
    axios
      .post(`${BASE_URL}/orders/create?${params.toString()}`)
      .then((response) => {
        if (response.data.response) {
          console.log(response.data);
          localStorage.setItem("orderSuccess", "true");
          localStorage.removeItem("idInfo");

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
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
          toast.error(`Error placing order: ${error.response.data.message || 'Please try again.'}`);
        } else if (error.request) {
          console.error("Error request:", error.request);
          toast.error("Error placing order: No response from server.");
        } else {
          console.error("Error message:", error.message);
          toast.error(`Error placing order: ${error.message}`);
        }
        console.error("Error config:", error.config);
      });
  };

  const [openCreditCardDialog, setOpenCreditCardDialog] = useState(false);


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
//  address

  const selectedAddress = useSelector(
    (state) => state.addresses.selectedAddress
  );
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



  // useEffect(() => {
  //   const savedAddresses = localStorage.getItem("addresses");
  //   if (savedAddresses) {
  //     setAddressData(JSON.parse(savedAddresses));
  //   }

  //   const savedActiveIndex = localStorage.getItem("activeIndex");
  //   if (savedActiveIndex) {
  //     setActiveIndex(Number(savedActiveIndex));
  //   }
  // }, []);

  useEffect(() => {
    if (addressData.length > 0) {
      localStorage.setItem("addresses", JSON.stringify(addressData));
    }
  }, [addressData]);


  const addresses = useSelector((state) => state.addresses.items);

  // useEffect(() => {
  //   // استرجاع العنوان من localStorage عند تحميل الصفحة
  //   const savedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
  //   if (savedAddress) {
  //     dispatch(setSelectedAddress(savedAddress));
  //   }
  // }, [dispatch]);
//   useEffect(() => {
//   const savedAddress = localStorage.getItem("selectedAddress");
//   if (savedAddress) {
//     const parsedAddress = JSON.parse(savedAddress);
//     if (!selectedAddress || (selectedAddress && selectedAddress.id !== parsedAddress.id)) {
//       dispatch(setSelectedAddress(parsedAddress));
//       setCurrentAddress(parsedAddress);
//     }
//   }
// }, [dispatch, selectedAddress]);
useEffect(() => {
  const savedAddress = localStorage.getItem("selectedAddress");
  if (savedAddress) {
    const parsedAddress = JSON.parse(savedAddress);

    // تحقق من توفر العنوان
    if (parsedAddress.isAvailable) {
      dispatch(setSelectedAddress(parsedAddress));
      setCurrentAddress(parsedAddress);
    } else {
      // إذا لم يكن العنوان متاحًا، قم بإزالته أو إخفائه
      dispatch(setSelectedAddress(null));
      setCurrentAddress(null);
      console.warn("The saved address is no longer available.");
    }
  }
}, [dispatch]);




  const address = useSelector((state) => state.addresses.selectedAddress);


  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);
  // useEffect(() => {
  //   const savedAddress = localStorage.getItem("selectedAddress");
  //   if (savedAddress) {
  //     dispatch(setSelectedAddress(JSON.parse(savedAddress)));
  //   } else if (addresses.length > 0) {
  //     localStorage.setItem("selectedAddress", JSON.stringify(addresses[0]));
  //     dispatch(setSelectedAddress(addresses[0]));
  //   }
  // }, [addresses, dispatch]);

  useEffect(() => {
    const storedAddress = localStorage.getItem("selectedAddress");
  
    if (storedAddress) {
      const parsedAddress = JSON.parse(storedAddress);
  
      // طباعة العنوان الذي تم تحميله
      // console.log("Address loaded from localStorage:", parsedAddress);
  
      // تحديث الحالة في Redux
      dispatch(setSelectedAddress(parsedAddress));
    }
  }, [dispatch]);
  

  // useEffect(() => {
  //   if (user) {
  //     // إذا كان هناك مستخدم مخزن
  //     // console.log("Current logged in user:", user);

  //     // عند تسجيل دخول مستخدم جديد، إزالة العنوان المخزن
  //     localStorage.removeItem("selectedAddress");
  //     localStorage.removeItem("selectedAddressId");

  //     // تحديث Redux لإعادة تعيين العنوان
  //     dispatch(setSelectedAddress(null));
  //   }
  // }, [user, dispatch]);
  useEffect(() => {
  if (!user) {
    localStorage.removeItem("selectedAddress");
    dispatch(setSelectedAddress(null));
    setCurrentAddress(null);
  }
}, [user, dispatch]);


  const [deliveryType, setDeliveryType] = useState("delivery");
  const [branchClosed, setBranchClosed] = useState(false);
  const handleBranchStatusChange = (isClosed) => {
    setBranchClosed(isClosed);
  };



  // useEffect(() => {
  //   const storedAddress = localStorage.getItem("selectedAddress");
  //   if (storedAddress) {
  //     setCurrentAddress(JSON.parse(storedAddress));
  //   } else if (selectedAddress) {
  //     setCurrentAddress(setCurrentAddress);
  //   }
  // }, [selectedAddress]); // Listen for changes to selectedAddress
  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
      setCurrentAddress(selectedAddress); // التأكد من تحديث العنوان الحالي
    }
  }, [selectedAddress]);


  useEffect(() => {
    const storedAddress = localStorage.getItem("selectedAddress");
    
    if (address) {
      // إذا كان هناك عنوان في Redux، استخدمه
      setCurrentAddress(address);
    } else if (storedAddress) {
      // إذا لم يكن في Redux، تحقق من localStorage
      const parsedAddress = JSON.parse(storedAddress);
      setCurrentAddress(parsedAddress);
      dispatch(setSelectedAddress(parsedAddress)); // تحديث Redux
    }
  }, [address, dispatch]);
  


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

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

      <div>
        {deliveryType === "pickup" ? (
          <Pickup onBranchStatusChange={handleBranchStatusChange} />
        ) : (
          <Stack spacing={3} sx={{ margin: "1rem" }}>
            <Stack>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  textAlign: "left",
                  fontFamily: "cairo",
                }}
              >
                Delivery Address
              </Typography>
            </Stack>

            {/* تحقق من حالة العنوان */}
            {currentAddress && currentAddress.address_name 
            && currentAddress.isAvailable  ? (
              <Card
                sx={{
                  mb: 3,
                  backgroundColor: "#fff",
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{
                    justifyContent: "space-between",
                    background: "#f8f9fa!important",
                    p: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: "500",
                      lineHeight: "1.2",
                    }}
                  >
                    {currentAddress.address_name}
                  </Typography>
                </Stack>

                <Stack
                  sx={{
                    display: "flex",
                    p: ".5rem",
                    justifyContent: "space-between",
                  }}
                  direction={"row"}
                  alignItems={"center"}
                >
                  <Stack sx={{ p: "1.5rem" }}>
                    <Typography
                      sx={{
                        display: "flex",
                        color: "#6c757d!important",
                        fontSize: "1.3rem",
                        fontWeight: "500",
                        lineHeight: "1.2",
                        textTransform: "capitalize",
                      }}
                    >
                      {/* عرض بيانات العنوان بشكل ديناميكي */}
                      {currentAddress.building
                        ? `${currentAddress.building}, `
                        : ""}
                      {currentAddress.street
                        ? `${currentAddress.street}, `
                        : ""}
                      {currentAddress.area?.area_name_en
                        ? `${currentAddress.area.area_name_en}, `
                        : ""}
                      {currentAddress.city?.name_en
                        ? `${currentAddress.city.name_en}, `
                        : ""}
                      {currentAddress.building
                        ? `Building: ${currentAddress.building} - `
                        : ""}
                      {currentAddress.floor
                        ? `Floor: ${currentAddress.floor}`
                        : ""}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            ) : (
              <Typography>No address selected</Typography>
            )}

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#d32f2f",
                "&:hover": { backgroundColor: "#d32f2f" },
              }}
              onClick={handleOpenDialog}
            >
              change delivery address
            </Button>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              fullWidth
              maxWidth="sm"
            >
              <DialogContent>
                <Stack spacing={2}>
                  <Address />
                </Stack>
              </DialogContent>
            </Dialog>
          </Stack>
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
                  <Card key={uuidv4()} sx={{ p: 2, my: 3 }}>
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
                          onQuantityChange={(newQuantity) =>
                            handleQuantityChange(item.id, newQuantity)
                          }
                          initialQuantity={item.quantity}
                        /> */}
                        <Counter
  basePrice={item.price}
  onChange={(newTotalPrice) =>
    handleCounterChange(index, newTotalPrice)
  }
  onQuantityChange={(newQuantity) =>
    handleQuantityChange(item.uniqueId, newQuantity)  // استخدم uniqueId
  }
  initialQuantity={item.quantity}
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
                          {(
                            totalPrices[index] || item.price * item.quantity
                          ).toFixed(2)}{" "}
                          EGP
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
            disabled={cartItems.length === 0 || branchClosed}
            sx={{
              mt: "1.5rem",
              p: "1rem",
              fontSize: "1.5rem",
              backgroundColor:
                cartItems.length === 0 || branchClosed ? "#ccc" : "#d32f2f",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor:
                  cartItems.length === 0 || branchClosed ? "#ccc" : "#d32f2f",
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
