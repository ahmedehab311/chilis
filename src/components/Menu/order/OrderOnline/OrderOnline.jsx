/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { Stack } from "@mui/material";
import { toast } from "react-toastify";
import "./OrderOnline.css";
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
import { setSelectedBranch } from "../../../../rtk/slices/BranchesSlice.js";
import axios from "axios";
import {
  setSelectedAddress,
  fetchAddresses,
  clearSelectedAddress,
} from "../../../../rtk/slices/adderssSlice";
import {
  clearCart,
  removeItemFromCart,
} from "../../../../rtk/slices/orderSlice";
import {
  updateItemQuantity,
  updateCartItems,
} from "../../../../rtk/slices/cartSlice";
import Pickup from "./Pickup/Pickup";
import { BASE_URL } from "../../apis&fetchData/ApiLinks";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CircularProgress from "@mui/material/CircularProgress";

function OrderOnline() {
  // console.log("BASE_URL",BASE_URL);

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const api_token = localStorage.getItem("token");
  const API_CITIES = `${BASE_URL}/cities`;
  const API_ARIA = (cityId) => `${BASE_URL}/areas/?city=${cityId}`;
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [tax, setTax] = useState(0);
  const [specialNotes, setSpecialNotes] = useState({});
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [openCreditCardDialog, setOpenCreditCardDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [subtotalWithExtras, setSubtotalWithExtras] = useState(0);
  const [totalPrices, setTotalPrices] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [currentAddress, setCurrentAddress] = useState({
    deliveryCity: "",
    deliveryArea: "",
  });
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [originalDeliveryFee, setOriginalDeliveryFee] = useState(deliveryFee);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [user, setUser] = useState(null);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [itemToRemoveIndex, setItemToRemoveIndex] = useState(null);
  const deliveryAmount = deliveryType === "delivery" ? deliveryFee : 0;
  const rawTotalBeforeDiscount = subtotalWithExtras + deliveryAmount;
  const totalBeforeTaxBeforeDiscount =
    rawTotalBeforeDiscount + rawTotalBeforeDiscount * (tax / 100);
  const finalTotalBeforeDiscount = parseFloat(
    totalBeforeTaxBeforeDiscount.toFixed(2)
  );
  const rawTotal = subtotalWithExtras - discount + deliveryAmount;
  const totalWithTaxFinal = rawTotal + rawTotal * (tax / 100);
  const finalTotal = parseFloat(totalWithTaxFinal.toFixed(2));

  const idInfo = useSelector((state) => state.info.idInfo);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const selectedAddress = useSelector(
    (state) => state.addresses.selectedAddress
  );

  useEffect(() => {
    if (!currentAddress) {
      setDeliveryFee(0);
      return;
    }
    if (isCouponApplied && couponData?.free_delivery === "1") {
      setDeliveryFee(0);
      return;
    }
    const feeStr = currentAddress?.area?.area_branches?.[0]?.delivery_fees;
    const fee = parseFloat(feeStr);

    setDeliveryFee(Number.isFinite(fee) ? fee : 0);
  }, [currentAddress, isCouponApplied, couponData]);

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

  const handleCounterChange = (index, newTotalPrice) => {
    // تأكد من أن totalPrices هو كائن وليس مصفوفة
    if (typeof totalPrices !== "object") {
      setTotalPrices({});
      return;
    }

    // تحديث الأسعار بناءً على الفهرس
    setTotalPrices((prevPrices) => ({
      ...prevPrices,
      [index]: newTotalPrice,
    }));
  };

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


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // في OrderOnline
  const openRemoveConfirm = (index) => {
    setItemToRemoveIndex(index);
    setOpenRemoveDialog(true);
  };

  useEffect(() => {
    const initialPrices = cartItems.map((item) => item.price * item.quantity);
    setTotalPrices(initialPrices);
  }, [cartItems]);


  const goToMenu = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "menu" } });
    } else {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleQuantityChange = (itemId, newQuantity, index) => {
    if (newQuantity <= 0) {
      openRemoveConfirm(index); // ✅ افتح نفس Dialog بتاع X
      return;
    }

    dispatch(updateItemQuantity({ uniqueId: itemId, quantity: newQuantity }));

    setTotalPrices((prevPrices) => {
      const updatedPrices = { ...prevPrices };

      const item = cartItems[index];
      if (!item) return updatedPrices;

      const extrasTotal = item.extras
        ? item.extras.reduce((sum, extra) => sum + parseFloat(extra.price), 0)
        : 0;

      updatedPrices[index] = (item.price + extrasTotal) * newQuantity;

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

      // return accumulator + itemTotal + extrasTotal;
      return (
        accumulator +
        (parseFloat(item.price) + extrasTotal) * (item.quantity || 1)
      );

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


  useEffect(() => {
    if (idInfo) {
      // تخزين idInfo في localStorage
      localStorage.setItem("idInfo", idInfo);
    }
  }, [idInfo]);


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

  const addressData = useSelector((state) => state.addresses.items || []);
  // console.log("addressData", addressData);

  useEffect(() => {
    if (addressData.length === 0) {
      dispatch(fetchAddresses());
    }
  }, [addressData.length, dispatch]);

  const isAddressAvailable = (address) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const currentTimeMinutes = hours * 60 + minutes;

    let isAvailable = false;
    if (
      address &&
      Array.isArray(address?.area?.area_branches) &&
      address?.area?.area_branches?.length > 0
    ) {
      address?.area?.area_branches.forEach((branch) => {
        if (branch?.branch?.open && branch?.last_delivery) {
          const [openHour, openMinute] = branch.branch.open
            .split(":")
            .map(Number);
          const [deliveryHour, deliveryMinute] = branch.last_delivery
            .split(":")
            .map(Number);

          const branchOpenMinutes = openHour * 60 + openMinute;
          const branchLastDeliveryMinutes = deliveryHour * 60 + deliveryMinute;

          if (branchLastDeliveryMinutes < branchOpenMinutes) {
            if (
              currentTimeMinutes >= branchOpenMinutes ||
              currentTimeMinutes <= branchLastDeliveryMinutes
            ) {
              isAvailable = true;
            }
          } else {
            if (
              currentTimeMinutes >= branchOpenMinutes &&
              currentTimeMinutes <= branchLastDeliveryMinutes
            ) {
              isAvailable = true;
            }
          }
        } else {
          console.warn("Branche data is missing", branch);
        }
      });
    } else {
      console.error("Branches data is missing or invalid.");
    }

    return isAvailable;
  };


  useEffect(() => {
    dispatch(setSelectedBranch(""));
  }, []);
  const [orderCode, setOrderCode] = useState(null);
  const [hasedKey, setHasedKey] = useState(null);

  // console.log("cartItems", cartItems);

  const handleCheckout = () => {
    const orders = cartItems
      .map((item) => {
        if (item.quantity <= 0) {
          console.error(
            `Item ${item.id} quantity is invalid: ${item.quantity}`
          );
          toast.error(t("errors.order_quantity_invalid"));
          return null;
        }
        return {
          id: item.id,
          special: specialNotes[item.id] || "",
          extras: Array.isArray(item.extras)
            ? item.extras.map((extra) => extra.id)
            : [],
          count: item.quantity,
          choices: [],
          options: item.option ? [item.option.id] : [],
        };
      })
      .filter((order) => order !== null);

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (deliveryType === "delivery") {
      const selectedAddress = addressData.find(
        (addr) => addr.id === address?.id
      );

      if (!selectedAddress) {
        toast.error(t("selectValidAddress"));
        return;
      }

    }
    if (deliveryType === "pickup") {
      if (!selectedBranchId) {
        toast.error(t("selectBranch"));
        return;
      }
    }


    let areaId, branchId;
    const delivery_type = deliveryType === "pickup" ? 2 : 1;

    if (delivery_type === 1) {
      areaId = address.area?.id;
      branchId = address.branches?.[0]?.id;

      if (!areaId) {
        toast.error(t("invalidAreaBranch"));
        return;
      }
    } else if (delivery_type === 2) {
      // بيك آب
      branchId = selectedBranchId;
      areaId = null;
    }

    if (orders.length === 0) {
      return;
    }

    const dataToSend = {
      delivery_type: delivery_type,
      payment: paymentMethod === "cash" ? 1 : 2,
      lat: delivery_type === 1 ? address.lat : 0,
      lng: delivery_type === 1 ? address.lng : 0,
      address: delivery_type === 1 ? currentAddress.id : null,
      area: delivery_type === 1 ? address.area?.id : "",
      branch: delivery_type === 1 ? "" : branchId,
      api_token: api_token,
      items: JSON.stringify({ items: orders }),
      device_id: "",
      notes: "",
      // time: formattedTime,
      car_model: "",
      car_color: "",
      gift_cards: "",
      coins: "00.00",
    };

    // console.log("Checkout data:", dataToSend);

    const params = new URLSearchParams(dataToSend);
    axios
      .post(`${BASE_URL}/orders/create?${params.toString()}`)
      .then((response) => {
        if (response.data.response) {
          setOrderCode(response.data.data.order_code);
          setHasedKey(response.data.data?.SDK_TOKEN);
          sessionStorage.setItem("fromCheckout", "true");
          sessionStorage.setItem("fromPayment", "true");
          localStorage.setItem("fromPayment", "true");
          localStorage.setItem("orderCode", orderCode);
          if (paymentMethod === "credit") {
            navigate("/order-online/payment", {
              state: {
                orderCode: response.data.data.order_code,
                hasedKey: response.data.data.SDK_TOKEN,
                openFawaterkDialog: true,
                cartItems: cartItems,
                finalTotal: finalTotal,
              },
              replace: true,
            });

            return;
          } else {
            localStorage.setItem("orderSuccess", "true");
            navigate(`/order-online/success/${response.data.data.order_code}`, {
              replace: true,
            });
          }

          localStorage.setItem("orderSuccess", "true");
          // navigate(`/order-online/${response.data.data.order_code}/success`);
          localStorage.removeItem("idInfo");

          // toast.success(t("orderCreated"));
          dispatch(setSelectedBranch(""));
          dispatch(clearCart());
        } else {
          console.error("Response error data:", response.data);
          toast.error(t("orderCreationError"));
        }
      })
      .catch((error) => {
        console.error("Error details:", error);
        let errorMessage = t("orderCreationError");
        localStorage.setItem("orderFail", "true");
        navigate("/order-online/fail");
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
          // errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
          console.error("Error request:", error.request);
          // errorMessage = t("errors.no_response");
        } else {
          console.error("Error message:", error.message);
        }

        toast.error(errorMessage);
      });
  };

  const addressCleared = useRef(false);

  const address = useSelector((state) => state.addresses.selectedAddress);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  //  address

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
  }, [API_CITIES]);

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

  useEffect(() => {
    if (addressData.length > 0) {
      localStorage.setItem("addresses", JSON.stringify(addressData));
    }
  }, [addressData]);

  useEffect(() => {
    if (address && !isAddressAvailable(address)) {
      if (!addressCleared.current) {
        dispatch(clearSelectedAddress());
        addressCleared.current = true;
      }
    } else if (address && isAddressAvailable(address)) {
      addressCleared.current = false;
    }
  }, [address, dispatch]);


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

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("selectedAddress");
      dispatch(setSelectedAddress(null));
      setCurrentAddress(null);
    }
  }, [user, dispatch]);

  const [branchClosed, setBranchClosed] = useState(false);
  const handleBranchStatusChange = (isClosed) => {
    setBranchClosed(isClosed);
  };

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
      setCurrentAddress(selectedAddress);
    }
  }, [selectedAddress]);

  useEffect(() => {
    const storedAddress = localStorage.getItem("selectedAddress");

    if (address) {
      setCurrentAddress(address);
    } else if (storedAddress) {
      const parsedAddress = JSON.parse(storedAddress);
      setCurrentAddress(parsedAddress);
      dispatch(setSelectedAddress(parsedAddress));
    }
  }, [address, dispatch]);

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const handleOpenDialog = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setOpenDialog(true);
    }
  };


  const handleApplyCoupon = async () => {
    if (couponLoading) return;
    if (isCouponApplied) {
      setDeliveryFee(originalDeliveryFee);
      setDiscount(0);
      setIsCouponApplied(false);
      setCouponCode("");
      setCouponData(null);
      setError("");
      return;
    }

    if (couponCode.trim() === "") {
      setError(t("coupon.enterCoupon"));
      return;
    }

    setError("");
    setCouponLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/coupon/validation?coupon=${couponCode}&api_token=${api_token}`
      );

      if (!response.data.response) {
        setError(t("coupon.invalidCoupon"));
        return;
      }

      const coupon = response.data.coupon;
      setCouponData(coupon);

      setOriginalDeliveryFee(deliveryFee);

      const baseBeforeTax =
        subtotalWithExtras + (deliveryType === "delivery" ? deliveryFee : 0);

      let discountValue = 0;

      if (coupon.fixed !== null) {
        discountValue = Number(coupon.fixed) || 0;
      } else if (coupon.percentage !== null) {
        discountValue = (baseBeforeTax * Number(coupon.percentage || 0)) / 100;
      }

      // حماية: متخليش الخصم أكبر من الإجمالي قبل الضريبة
      discountValue = Math.min(discountValue, baseBeforeTax);

      setDiscount(discountValue);

      if (coupon.free_delivery === "1" && deliveryType === "delivery") {
        setDeliveryFee(0);
      }

      setIsCouponApplied(true);
    } catch (error) {
      setError(t("coupon.failedApplyCoupon"));
    } finally {
      setCouponLoading(false);
    }
  };
  // console.log("cartItems",cartItems)
  const convertNumberToArabic = (number) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(number).replace(/[0-9]/g, (digit) => arabicNumbers[digit]);
  };
  return (
    <>
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
                    fontFamily: "tahoma",
                  }}
                >
                  {t("address.deliveryAddress")}
                </Typography>
              </Stack>
              {currentAddress &&
                currentAddress.address_name &&
                currentAddress.isAvailable ? (
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
                        fontFamily: "tahoma",
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
                          fontSize: "1.4rem",
                          fontWeight: "500",
                          lineHeight: "1.2",
                          textTransform: "capitalize",
                          fontFamily: "tahoma",
                        }}
                      >
                        {/* {currentAddress.building
                        ? `${currentAddress.building}, `
                        : ""} */}
                        {currentAddress.street
                          ? `${t("address.street")}: ${currentAddress.street}, `
                          : ""}
                        {isArabic
                          ? currentAddress.area?.area_name_ar
                          : currentAddress.area?.area_name_en}
                        ,
                        {isArabic
                          ? currentAddress.city?.name_ar
                          : currentAddress.city?.name_en}
                        ,
                        {currentAddress.building
                          ? `${t("address.building")}: ${currentAddress.building
                          }, `
                          : ""}
                        {currentAddress.floor
                          ? `${t("address.floor")}: ${currentAddress.floor}`
                          : ""}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              ) : (
                <Typography sx={{ fontFamily: "tahoma" }}>
                  {t("address.noAddressSelected")}
                </Typography>
              )}

              <Button
                variant="contained"
                color="error"

                sx={{
                  fontSize: "1.5rem",
                  fontFamily: "tahoma",
                  textTransform: "capitalize",
                  "&:hover": { backgroundColor: "#d32f2f" },
                }}
                onClick={handleOpenDialog}
              >
                {t("address.changeDeliveryAddress")}
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
                fontFamily: "tahoma",
              }}
            >
              {t("chilis")}
            </Typography>
          </Box>
          <Container
            sx={{ margin: "0 auto", borderBottom: "2px solid #ececec" }}
          >
            <Box className="orderNow" sx={{ borderRadius: "8px" }}>
              {cartItems.length === 0 ? (
                <Stack alignItems="center" spacing={1.5} sx={{ my: 4 }}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "1.8rem",
                      color: "#666",
                      fontFamily: "cairo",
                      fontWeight: "bold",
                    }}
                  >
                    {t("cart.empty")}
                  </Typography>

                  <Button
                    onClick={goToMenu}
                    variant="contained"
                    startIcon={<RestaurantMenuIcon />}
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      fontFamily: "cairo",
                      fontSize: "1.4rem",
                      borderRadius: "24px",
                      px: 2,
                      backgroundColor: "#d32f2f",
                      "&:hover": {
                        backgroundColor: "#b71c1c",
                      },
                    }}
                  >
                    {t("cart.orderNow")}
                  </Button>
                </Stack>



              ) : (
                cartItems.map((item, index) => (
                  <Card key={item.uniqueId} sx={{ p: 2, my: 3 }}>
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
                          {isArabic ? item.name_ar : item.name_en}
                        </Typography>
                        <Typography
                          onClick={() => openRemoveConfirm(index)}
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
                          {isArabic ? item.name_ar : item.name_en}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#17a2b8!important",
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                            fontFamily: "cairo",
                          }}
                        >
                          {isArabic
                            ? convertNumberToArabic(item.price)
                            : item.price}{" "}
                          {t("egp")}
                        </Typography>
                        <Counter
                          basePrice={item.price}
                          onChange={(newTotalPrice) =>
                            handleCounterChange(index, newTotalPrice)
                          }
                          onQuantityChange={(newQuantity) =>
                            handleQuantityChange(item.uniqueId, newQuantity, index)
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
                          {t("Regular")}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "1.5rem", fontWeight: 500 }}
                        >
                          {isArabic
                            ? convertNumberToArabic(
                              (
                                totalPrices[index] ||
                                item.price * item.quantity
                              ).toFixed(2)
                            )
                            : (
                              totalPrices[index] || item.price * item.quantity
                            ).toFixed(2)}
                          {t("egp")}
                        </Typography>
                      </Stack>
                      {item.option && (
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          sx={{ justifyContent: "space-between" }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#000!important",
                              fontSize: "1.5rem",
                              fontFamily: "cairo",
                              fontWeight: 500,
                            }}
                          >
                            {t("options")}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#000!important",
                              fontSize: "1.5rem",
                              fontFamily: "cairo",
                              fontWeight: 500,
                            }}
                          >
                            {isArabic
                              ? item.option.name_ar
                              : item.option.name_en}
                          </Typography>
                        </Stack>
                      )}
                      {item.extras && item.extras.length > 0 && (
                        <Stack sx={{}}>
                          {item.extras.map((extra, i) => (
                            <Stack
                              key={i}
                              direction={"row"}
                              alignItems={"center"}
                              sx={{
                                justifyContent: "space-between",
                                mb: i === item.extras.length - 1 ? ".6rem" : 0,
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#000!important",
                                  fontSize: "1.5rem",
                                  fontFamily: "cairo",
                                  fontWeight: 500,
                                }}
                              >
                                {isArabic ? extra.name_ar : extra.name_en}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#000!important",
                                  fontSize: "1.5rem",
                                  fontFamily: "cairo",
                                  fontWeight: 500,
                                }}
                              >
                                {/* {extra.price} {t("egp")} */}
                                {isArabic
                                  ? convertNumberToArabic((extra.price * item.quantity).toFixed(2))
                                  : (extra.price * item.quantity).toFixed(2)}{" "}
                                {t("egp")}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      )}

                      <TextField
                        placeholder={t("Enter any special request note")}
                        value={specialNotes[item.id] || ""}
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
                ))
              )}
            </Box>
          </Container>

          {/* coupon */}

          <Stack
            className="middleOrder"
            sx={{ p: 2, borderBottom: "2px solid #ececec" }}
          >
            <Stack className="middleOrder" sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" sx={{ mb: "1rem" }}>
                <TextField
                  id="coupon-code-input"
                  placeholder={t("Enter coupon code")}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponLoading || isCouponApplied}
                  sx={{
                    flex: 1,
                    "& .MuiInputBase-input": {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      padding: ".9rem 1rem !important",
                      fontSize: "1.3rem",
                      color: "#000",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#000",
                      fontSize: "1.3rem",
                    },
                  }}
                />
                <Stack>
                  <Button
                    variant="contained"
                    color={isCouponApplied ? "primary" : "error"}
                    disabled={couponLoading}
                    sx={{
                      p: "10px 16px !important",
                      height: "100%",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      backgroundColor: isCouponApplied ? "#1976d2" : "#d32f2f",
                      "&:hover": {
                        backgroundColor: isCouponApplied ? "#1976d2" : "#d32f2f",
                      },
                    }}
                    onClick={handleApplyCoupon}
                  >
                    {couponLoading ? (
                      <CircularProgress size={18} sx={{ color: "#fff" }} />
                    ) : (
                      isCouponApplied ? t("Cancel") : t("Apply")
                    )}
                  </Button>

                </Stack>
              </Stack>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {couponData && (
                <div>
                  {couponData && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <p style={{ margin: 0 }}>
                        {t("coupon.code")}: {couponData.code}
                      </p>
                      {isCouponApplied && (
                        <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />
                      )}
                    </div>
                  )}

                  {couponData && (
                    <p>
                      {t("coupon.discount")}:{" "}
                      <span dir="ltr">
                        {couponData.fixed !== null
                          ? couponData.fixed
                          : `${couponData.percentage}%`}
                      </span>
                    </p>

                  )}

                  {couponData?.free_delivery === "1" && (
                    <p>{t("coupon.freeDelivery")}</p>
                  )}

                  {couponData?.free_on_pay_card === "1" && paymentMethod === "credit" && (
                    <p>{t("coupon.freeDeliveryOnCard")}</p>
                  )}
                </div>

              )}
              <TextField
                className="formControl"
                id="outlined-basic"
                placeholder={t("Any notes? please enter it here")}
                fullWidth
                multiline
                minRows={3}
                sx={{
                  width: "100%",
                  transition: ".5s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: ".5rem",
                  "& .MuiInputBase-input": {
                    fontSize: "1.5rem",
                    color: "gray",
                    m: ".7rem",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#000",
                    fontSize: "1.4rem",

                  },
                }}
                InputProps={{
                  style: {
                    textAlign: "center",
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack sx={{ borderBottom: "2px solid #ececec", mb: 1 }}>
            <FormControl
              component="fieldset"
              sx={{ mt: "2rem", textAlign: "center" }}
            >
              <FormLabel
                component="legend"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  textAlign: "center",
                  fontFamily: "tahoma",
                }}
              >
                {t("Select delivery type")}
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
                  label={
                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        color: "#000",
                        fontWeight: "600",
                      }}
                    >
                      {t("Pickup")}
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="delivery"
                  control={<Radio />}
                  label={
                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        color: "#000",
                        fontWeight: "600",
                      }}
                    >
                      {t("Delivery")}
                    </Typography>
                  }
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
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    fontFamily: "tahoma",
                    letterSpacing: "1px",
                  }}
                >
                  {t("Subtotal")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    fontFamily: "tahoma",
                    letterSpacing: "1px",
                  }}
                >
                  {isArabic
                    ? convertNumberToArabic(subtotalWithExtras.toFixed(2))
                    : subtotalWithExtras.toFixed(2)}{" "}
                  {t("egp")}
                  {/* {subtotalWithExtras.toFixed(2)} {t("egp")} */}
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
                      fontFamily: "tahoma",
                      letterSpacing: "1px",
                    }}
                  >
                    {t("Delivery Fee")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "tahoma",
                    }}
                  >
                    {isArabic
                      ? convertNumberToArabic(deliveryFee.toFixed(2))
                      : deliveryFee.toFixed(2)}{" "}
                    {t("egp")}
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
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    fontFamily: "tahoma",
                    letterSpacing: "1px",
                  }}
                >
                  {t("Tax")} % {isArabic ? convertNumberToArabic(tax) : tax}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    fontFamily: "tahoma",
                    letterSpacing: "1px",
                  }}
                >
                  {isArabic
                    ? convertNumberToArabic(
                      (
                        (subtotalWithExtras -
                          discount +
                          (deliveryType === "delivery" ? deliveryFee : 0)) *
                        (tax / 100)
                      ).toFixed(2)
                    )
                    : (
                      (subtotalWithExtras -
                        discount +
                        (deliveryType === "delivery" ? deliveryFee : 0)) *
                      (tax / 100)
                    ).toFixed(2)}
                  {t("egp")}
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
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  fontFamily: "tahoma",
                  letterSpacing: "1px",
                }}
              >
                {t("Total")}
              </Typography>

              {/* <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  fontFamily: "tahoma",
                  letterSpacing: "1px",
                }}
              >
                {isArabic
                  ? convertNumberToArabic(
                    (
                      subtotalWithExtras -
                      discount +
                      (deliveryType === "delivery" ? deliveryFee : 0) +
                      (subtotalWithExtras -
                        discount +
                        (deliveryType === "delivery" ? deliveryFee : 0)) *
                      (tax / 100)
                    ).toFixed(2)
                  )
                  : (
                    subtotalWithExtras -
                    discount + // إضافة الخصم هنا
                    (deliveryType === "delivery" ? deliveryFee : 0) +
                    (subtotalWithExtras -
                      discount + // إضافة الخصم هنا
                      (deliveryType === "delivery" ? deliveryFee : 0)) *
                    (tax / 100)
                  ).toFixed(2)}{" "}
                {t("egp")}
              </Typography> */}
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  fontFamily: "tahoma",
                  letterSpacing: "1px",
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {isCouponApplied && discount > 0 && (
                  <span style={{ textDecoration: "line-through", color: "#888" }}>
                    {isArabic
                      ? convertNumberToArabic(finalTotalBeforeDiscount.toFixed(2))
                      : finalTotalBeforeDiscount.toFixed(2)}{" "}
                    {t("egp")}
                  </span>
                )}

                <span style={{ color: isCouponApplied ? "green" : "#000" }}>
                  {isArabic
                    ? convertNumberToArabic(finalTotal.toFixed(2))
                    : finalTotal.toFixed(2)}{" "}
                  {t("egp")}
                </span>
              </Typography>

            </Stack>

            <FormControl
              component="fieldset"
              sx={{ mt: "2rem", textAlign: "center" }}
            >
              <FormLabel
                component="legend"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  textAlign: "center",
                  fontFamily: "tahoma",
                  letterSpacing: "1px",
                }}
              >
                {t("SelectPaymentMethod")}
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
                  fontFamily: "tahoma",
                  letterSpacing: "1px",
                }}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label=<Typography
                    sx={{
                      fontSize: "1.4rem",
                      color: "#000",
                      fontWeight: "600",
                      fontFamily: "tahoma",
                      letterSpacing: "1px",
                    }}
                  >
                    {t("CashonDelivery")}
                  </Typography>
                />
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label=<Typography
                    sx={{
                      fontSize: "1.4rem",
                      color: "#000",
                      fontWeight: "600",
                      fontFamily: "tahoma",
                      letterSpacing: "1px",
                    }}
                  >
                    {t("CreditCard")}
                  </Typography>
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
                fontFamily: "tahoma",
                fontWeight: "bold",
                backgroundColor:
                  cartItems.length === 0 || branchClosed ? "#ccc" : "#d32f2f",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor:
                    cartItems.length === 0 || branchClosed ? "#ccc" : "#d32f2f",
                },
              }}
            >
              {t("PlaceOrder")}
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
        <Dialog
          open={openRemoveDialog}
          onClose={() => setOpenRemoveDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ fontSize: "1.6rem", fontWeight: "bold", textAlign: "center" }}>
            {t("cart.removeTitle")}
          </DialogTitle>

          <DialogContent sx={{ textAlign: "center", fontSize: "1.4rem" }}>
            {t("cart.removeMessage")}
            {itemToRemoveIndex !== null && cartItems[itemToRemoveIndex] && (
              <>
                {" "}
                <strong>
                  {isArabic
                    ? cartItems[itemToRemoveIndex].name_ar
                    : cartItems[itemToRemoveIndex].name_en}
                </strong>
              </>
            )}
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenRemoveDialog(false);
                setItemToRemoveIndex(null);
              }}
            >
              {t("Cancel")}
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                if (itemToRemoveIndex !== null) {
                  handleRemoveItem(itemToRemoveIndex);
                }
                setOpenRemoveDialog(false);
                setItemToRemoveIndex(null);
              }}
            >
              {t("Confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
}

export default OrderOnline;
