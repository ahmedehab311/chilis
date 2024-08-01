import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Card,
  Container,
  Button,
  Autocomplete,
} from "@mui/material";
import "./OrderOnline.css";
import imgLogo from "../../../Hero/images/logo.png";
import Counter from "../../ButtonsMenu/CounterDiaolgButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
// import {API_ARIA,API_CITIES} from"../../apis&fetchData/ApiLinks"
function OrderOnline() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrices, setTotalPrices] = useState({});
  // const [cartItems, setCartItems] = useState([]);
  // const [totalPrices, setTotalPrices] = useState({});
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

  const API_CITIES = "https://myres.me/chilis/api/cities";
const API_ARIA = cityId => `https://myres.me/chilis/api/areas/?city=${cityId}`;
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
      label: ""
    });
    const [activeIndex, setActiveIndex] = useState(null);
    const [errors, setErrors] = useState({});
    // const [cities, setCities] = useState([]);
    // const [areas, setAreas] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
  
    useEffect(() => {
        const fetchCities = async () => {
          setLoadingCities(true);
          try {
            const response = await fetch(API_CITIES);
            const data = await response.json();
            // Map cities to get only name_en
            setCities(data.data.cities.map(city => ({
              id: city.id,
              name: city.name_en
            })));
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
        console.log("areas fetch here",data.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      } finally {
        setLoadingAreas(false);
      }
    };

    fetchAreas();
  }
}, [selectedCity]);



    
    // const [loadingCities, setLoadingCities] = useState(false);
    // const [loadingAreas, setLoadingAreas] = useState(false);
  
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
      const requiredFields = ["deliveryCity", "deliveryArea", "street", "building", "floor", "apt"];
      const newErrors = {};
  
      requiredFields.forEach(field => {
        if (!currentAddress[field]) {
          newErrors[field] = "This field is required";
        }
      });
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      setAddressData(prev => [...prev, currentAddress]);
      setOpen(false);
      setCurrentAddress({
        deliveryCity: "",
        deliveryArea: "",
        street: "",
        building: "",
        floor: "",
        apt: "",
        deliveryInstructions: "",
        label: ""
      });
      setErrors({});
    };
  
    const handleDeleteAddress = (index) => {
      setAddressData(prev => prev.filter((_, i) => i !== index));
      if (activeIndex === index) {
        setActiveIndex(null);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCurrentAddress(prev => ({ ...prev, [name]: value }));
  
      if (value.trim() !== "") {
        setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
      }
    };
  
    const handleBlur = (e) => {
      const { name, value } = e.target;
      if (!value.trim()) {
        setErrors(prevErrors => ({ ...prevErrors, [name]: "This field is required" }));
      }
    };
  
    const handleSelectLabel = (label) => {
      setCurrentAddress(prev => ({ ...prev, label }));
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
              <Stack sx={{ display: "flex", p: ".5rem" }} direction={"row"} alignItems={"center"}>
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
                    {address.deliveryCity}, {address.deliveryArea}, {address.street}, Building: {address.building}, Floor: {address.floor}, Apt: {address.apt}
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
                  <DeleteOutlineOutlinedIcon color="action" fontSize="1rem !important" />
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
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography>Add Delivery Address</Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>

            <Stack spacing={2}>
            <div>
        <label htmlFor="city">Select City:</label>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={loadingCities}
        >
          <option value="">--Select City--</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="area">Select Area:</label>
        <select
          id="area"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          disabled={loadingAreas || !selectedCity}
        >
          <option value="">--Select Area--</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>
                <TextField
                  name="street"
                  label="Street"
                  variant="outlined"
                  fullWidth
                  value={currentAddress.street}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={!!errors.street}
                  helperText={errors.street}
                />
                <TextField
                  name="building"
                  label="Building"
                  variant="outlined"
                  fullWidth
                  value={currentAddress.building}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={!!errors.building}
                  helperText={errors.building}
                />
                <TextField
                  name="floor"
                  label="Floor"
                  variant="outlined"
                  fullWidth
                  value={currentAddress.floor}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={!!errors.floor}
                  helperText={errors.floor}
                />
                <TextField
                  name="apt"
                  label="Apt"
                  variant="outlined"
                  fullWidth
                  value={currentAddress.apt}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={!!errors.apt}
                  helperText={errors.apt}
                />
                <TextField
                  name="deliveryInstructions"
                  label="Delivery Instructions"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={currentAddress.deliveryInstructions}
                  onChange={handleInputChange}
                />
                <TextField
                  name="label"
                  label="Label"
                  variant="outlined"
                  fullWidth
                  value={currentAddress.label}
                  onChange={handleInputChange}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={handleAddAddress}
                color="primary"
              >
                Add Address
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Stack>

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
        }}
      >
        <Box
          className="headerOrderOnline"
          direction={"row"}
          alignItems={"center"}
          sx={{ p: 1, borderBottom: "1px solid #999" }}
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
                  <Card key={index} sx={{ p: 2, mb: 3 }}>
                    <Stack sx={{ position: "relative" }}>
                      <Stack
                        sx={{ display: "flex" }}
                        direction={"row"}
                        alignItems={"center"}
                      >
                        <Typography
                          sx={{
                            color: "#000",
                            fontSize: "15px",
                            fontWeight: 500,
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
                            fontSize: "15px",
                            fontWeight: 500,
                            fontFamily: "cairo",
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
                            fontSize: "13px",
                            fontWeight: 400,
                            fontFamily: "cairo",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#17a2b8!important",
                            fontSize: "15px",
                            fontWeight: 500,
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
                            fontSize: "15px",
                            fontWeight: 500,
                          }}
                        >
                          Regular
                        </Typography>
                        <Typography
                          sx={{
                            color: "#6c757d!important",
                            fontSize: "15px",
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

        <Stack className="middleOrder" sx={{ p: 2 }}>
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
              Total:
            </Typography>
            <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
              {" "}
              {totalToPay} EGP
            </Typography>
          </Stack>
          <Stack className="stackBtn" sx={{ p: 2 }}>
            <Button
              color="error"
              variant="contained"
              className="placeOrderBtn"
              disabled={cartItems.length === 0}
            >
              PLACE ORDER
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}

export default OrderOnline;
