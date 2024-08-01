import { useEffect, useState } from "react";
import { Stack, TextField, Typography, Card, Button } from "@mui/material";
import "./OrderOnline.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { API_ARIA, API_CITIES } from "../../apis&fetchData/ApiLinks";
import CheckOut from "./checkOut/checkOut";
function OrderOnline() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrices, setTotalPrices] = useState({});
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);

  useEffect(() => {
    // الحصول على العناصر المخزنة في السلة من localStorage عند تحميل المكون
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);

    // تهيئة الأسعار الإجمالية
    const initialPrices = {};
    storedCartItems.forEach((item, index) => {
      initialPrices[index] = item.price;
    });
    setTotalPrices(initialPrices);
  }, []);

  useEffect(() => {
    // تحديث الأسعار الإجمالية عند تغيير العناصر في السلة
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
    // الحصول على السلة الحالية من localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // إزالة العنصر من السلة
    cart.splice(index, 1);

    // حفظ السلة المحدثة في localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // تحديث الحالة
    setCartItems(cart);
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

  useEffect(() => {
    // Fetch cities from API_CITIES
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch(API_CITIES);
        const data = await response.json();
        setCities(data); // Update this based on the structure of your API response
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    // Fetch areas from API_ARIA
    const fetchAreas = async () => {
      setLoadingAreas(true);
      try {
        const response = await fetch(API_ARIA);
        const data = await response.json();
        setAreas(data); // Update this based on the structure of your API response
      } catch (error) {
        console.error("Error fetching areas:", error);
      } finally {
        setLoadingAreas(false);
      }
    };

    fetchAreas();
  }, []);
  const [open, setOpen] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({
    deliveryCity: "",
    deliveryArea: "",
    street: "",
    building: "",
    floor: "",
    apt: "",
    deliveryInstructions: "",
    label: "",
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const [errors, setErrors] = useState({});

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

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddAddress = () => {
    const requiredFields = [
      "deliveryCity",
      "deliveryArea",
      "street",
      "building",
      "floor",
      "apt",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!currentAddress[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setAddressData((prev) => [...prev, currentAddress]);
    setOpen(false);
    setCurrentAddress({
      deliveryCity: "",
      deliveryArea: "",
      street: "",
      building: "",
      floor: "",
      apt: "",
      deliveryInstructions: "",
      label: "",
    });
    setErrors({});
  };

  const handleDeleteAddress = (index) => {
    setAddressData((prev) => prev.filter((_, i) => i !== index));
    if (activeIndex === index) {
      setActiveIndex(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required",
      }));
    }
  };

  const handleSelectLabel = (label) => {
    setCurrentAddress((prev) => ({ ...prev, label }));
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Stack
      // className={"address"}
      sx={{ display: "flex" }}
      direction={"row"}
      alignItems={"center"}
    >
      <Stack>
        <Stack>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              textAlign: "left",
              fontFamily: "cairo",
            }}
          >
            Your Delivery Address List
          </Typography>
        </Stack>
        <Stack spacing={2}>
          {addressData.map((address, index) => (
            <Card
              key={index}
              sx={{
                mb: 3,
                border: activeIndex === index ? "2px solid #d32f2f" : "none",
              }}
              onClick={() => handleCardClick(index)}
            >
              <Stack sx={{ background: "#f8f9fa!important", p: 2 }}>
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    lineHeight: "1.2",
                  }}
                >
                  {address.label}
                </Typography>
              </Stack>
              <Stack
                sx={{ display: "flex", p: ".5rem" }}
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
                    {address.deliveryCity}, {address.deliveryArea},{" "}
                    {address.street}, Building: {address.building}, Floor:{" "}
                    {address.floor}, Apt: {address.apt}
                    <br />
                    Instructions: {address.deliveryInstructions}
                  </Typography>
                </Stack>
                <Stack
                  fontSize="22px"
                  direction={"row"}
                  alignItems={"center"}
                  sx={{
                    border: "1px solid #dc3545",
                    fontSize: "1.2rem",
                    p: ".8rem 1.5rem",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                      borderColor: "#d32f2f",
                      transition: ".6s",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(index);
                  }}
                >
                  <DeleteOutlineOutlinedIcon
                    color="action"
                    fontSize="1rem !important"
                  />
                  <Typography sx={{ color: "#000" }}>Delete</Typography>
                </Stack>
              </Stack>
            </Card>
          ))}

          <Button
            onClick={handleClickOpen}
            sx={{
              alignItems: "center",
              display: "flex",
              background: "#d32f2f",
              borderColor: "#d32f2f",
              borderRadius: "28px !important",
              color: "#fff !important",
              fontSize: "1rem",
              fontWeight: "500",
              lineHeight: "1.2",
              textTransform: "uppercase",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#e31616 !important",
                borderColor: "#d32f2f",
                transition: ".6s",
              },
            }}
          >
            ADD NEW ADDRESS
          </Button>

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Add Delivery Address</Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                <Stack>
                  <Typography>Delivery City:</Typography>
                  <TextField
                    name="deliveryCity"
                    value={currentAddress.deliveryCity}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    fullWidth
                    variant="outlined"
                    required
                    error={!!errors.deliveryCity}
                    helperText={errors.deliveryCity}
                  />
                </Stack>
                <Stack>
                  <Typography>Delivery Area:</Typography>
                  <TextField
                    name="deliveryArea"
                    value={currentAddress.deliveryArea}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    fullWidth
                    variant="outlined"
                    required
                    error={!!errors.deliveryArea}
                    helperText={errors.deliveryArea}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography>Street:</Typography>
                    <TextField
                      name="street"
                      value={currentAddress.street}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      fullWidth
                      variant="outlined"
                      required
                      error={!!errors.street}
                      helperText={errors.street}
                    />
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography>Building:</Typography>
                    <TextField
                      name="building"
                      value={currentAddress.building}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      fullWidth
                      variant="outlined"
                      required
                      error={!!errors.building}
                      helperText={errors.building}
                    />
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography>Floor:</Typography>
                    <TextField
                      name="floor"
                      value={currentAddress.floor}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      fullWidth
                      variant="outlined"
                      required
                      error={!!errors.floor}
                      helperText={errors.floor}
                    />
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography>Apt:</Typography>
                    <TextField
                      name="apt"
                      value={currentAddress.apt}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      fullWidth
                      variant="outlined"
                      required
                      error={!!errors.apt}
                      helperText={errors.apt}
                    />
                  </Stack>
                </Stack>
                <Stack>
                  <Typography>Delivery Instructions:</Typography>
                  <TextField
                    name="deliveryInstructions"
                    value={currentAddress.deliveryInstructions}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Stack>
                <Stack direction="row" spacing={1} mt={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleSelectLabel("Home")}
                    sx={{
                      border:
                        currentAddress.label === "Home"
                          ? "2px solid #d32f2f"
                          : "",
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleSelectLabel("Work")}
                    sx={{
                      border:
                        currentAddress.label === "Work"
                          ? "2px solid #d32f2f"
                          : "",
                    }}
                  >
                    Work
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleSelectLabel("Other")}
                    sx={{
                      border:
                        currentAddress.label === "Other"
                          ? "2px solid #d32f2f"
                          : "",
                    }}
                  >
                    Other
                  </Button>
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Close
              </Button>
              <Button onClick={handleAddAddress} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Stack>

      <CheckOut
        totalToPay={totalToPay}
        handleRemoveItem={handleRemoveItem}
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        totalPrices={totalPrices}
        handleCounterChange={handleCounterChange}
      />
    </Stack>
  );
}

export default OrderOnline;
