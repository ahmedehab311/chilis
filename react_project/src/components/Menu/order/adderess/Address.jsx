import { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  Typography,
  Card,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function Address() {
  const API_CITIES = "https://myres.me/chilis/api/cities";
  const API_AREAS = "https://myres.me/chilis/api/areas?city=";
  const api_token = localStorage.getItem("token");
  // const API_ADDRESS = https://myres.me/chilis/api//profile/address/?api_token=${api_token};
  const API_ADDRESS = `https://myres.me/chilis/api/profile/address?api_token=${api_token}`;
  const API_ADD_ADDRESS = `https://myres.me/chilis/api/profile/address/add`;
  const API_DELETE_ADDRESS = (id) =>
    `https://myres.me/chilis/api/profile/address/delete/${id}?api_token=${api_token}`;

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [open, setOpen] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [user, setUser] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [addressName, setAddressName] = useState({});
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

  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch(API_CITIES);
        const data = await response.json();
        setCities(data.data.cities);
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
          const response = await fetch(`${API_AREAS}${selectedCity}`);
          const responseData = await response.json();
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const areaNames = responseData.data.areas.map((area) => ({
            id: area.id,
            name: area.area_name_en,
          }));

          setAreas(areaNames);
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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        // https://myres.me/chilis/api/profile/address?api_token=${api_token}
      `  ${API_ADDRESS}`
      );
      const responseData = await response.json();
      console.log("fetch address", responseData.data.address);
      setAddressData(responseData.data.address);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  const handleSelectLabel = (label) => {
    setCurrentAddress((prev) => ({ ...prev, label }));
  };
  const handleAddAddress = async () => {
    const requiredFields = [
      "deliveryCity",
      "deliveryArea",
      "street",
      "building",
      // "floor",
      // "apt",
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

    const queryParams = new URLSearchParams({
      area: currentAddress.deliveryArea,
      street: currentAddress.street,
      building: currentAddress.building,
      floor: currentAddress.floor,
      apt: currentAddress.apt,
      name: currentAddress.label,
      lat: "0",
      lng: "0",
      api_token: api_token,
    });
    handleClose();
    try {
      const response = await axios.post(
        `https://myres.me/chilis/api/profile/address/add?${queryParams.toString()}`
      );
      fetchAddresses();
      console.log("Response Data:", response.data);

      const dataResponse = await response.json();
      console.log("response", dataResponse);
      console.log(dataResponse);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (dataResponse.success) {
        handleClose();
        fetchAddresses();
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
      } else {
        console.error("Error adding address:", dataResponse.message);
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
    handleDeleteAddress();
  }, []);
  const handleDeleteAddress = async (id) => {
    try {
      const response = await axios.post(API_DELETE_ADDRESS(id));
      console.log("Response Data:", response.data);

      fetchAddresses();
      if (response.data.success) {
        // Update addressData state by filtering out the deleted address
        setAddressData((prevData) =>
          prevData.filter((address) => address.id !== id)
        );
      } else {
        console.error("Error deleting address:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      deliveryCity: event.target.value,
      deliveryArea: "",
    }));
    setAreas([]);
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      deliveryArea: event.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
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

  return (
    <Stack spacing={3}>
      {/* <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          textAlign: "left",
          fontFamily: "cairo",
        }}
      >
        add address
      </Typography>
      */}
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
      {addressData.length > 0 ? (
       
        addressData.map((address, index) => (

          <Card
            key={index}
            sx={{
              mb: 3,
              border: activeIndex === index ? "2px solid #d32f2f" : "none",
            }}
            onClick={() => setActiveIndex(index)}
          >
       
            <Stack sx={{ background: "#f8f9fa!important", p: 2 }}>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "500",
                  lineHeight: "1.2",
                }}
              >
                {address.address_name}
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
                  {address.building}, {address.street},{address.area.area_name_en},
                  {address.city.name_en},Building: {address.building} - Floor:{" "}
                  {address.floor} Apt: {address.apt}
                  <br />
                  {/* Instructions: {address.deliveryInstructions} */}
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
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    "& .MuiSvgIcon-root": {
                      color: "#fff",
                    },
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling to Card
                  handleDeleteAddress(address.id);
                }}
              >
                <Typography
                  sx={{
                    pr: 2,
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    lineHeight: "1.2",
                    p: ".6rem .8rem",
                  }}
                >
                  Delete
                </Typography>
                <DeleteOutlineOutlinedIcon />
              </Stack>
            </Stack>
          </Card>
        ))
      ) : (
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            lineHeight: "1.2",
          }}
        >
          No address found ...
        </Typography>
      )}
      <Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "#d32f2f",
            "&:hover": {
              backgroundColor: "#9a0007",
            },
          }}
        >
          Add New Address
        </Button>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "500",
            }}
          >
            Add Address
          </Typography>
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Select
              value={currentAddress.deliveryCity}
              onChange={handleCityChange}
              displayEmpty
              inputProps={{ "aria-label": "City" }}
            >
              {loadingCities ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name_en}
                  </MenuItem>
                ))
              )}
            </Select>
            <Select
              value={currentAddress.deliveryArea}
              onChange={handleAreaChange}
              displayEmpty
              inputProps={{ "aria-label": "Area" }}
              disabled={loadingAreas || !selectedCity}
            >
              {loadingAreas ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                areas.map((area) => (
                  <MenuItem key={area.id} value={area.id}>
                    {area.name}
                  </MenuItem>
                ))
              )}
            </Select>
            <TextField
              name="street"
              label="Street"
              value={currentAddress.street}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.street}
              helperText={errors.street}
            />
            <TextField
              name="building"
              label="Building"
              value={currentAddress.building}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.building}
              helperText={errors.building}
            />
            <TextField
              name="floor"
              label="Floor"
              value={currentAddress.floor}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.floor}
              helperText={errors.floor}
            />
            <TextField
              name="apt"
              label="Apt"
              value={currentAddress.apt}
              onChange={handleInputChange}
              onBlur={handleBlur}
              // error={!!errors.apt}
              // helperText={errors.apt}
            />
            <TextField
              name="deliveryInstructions"
              label="Delivery Instructions"
              value={currentAddress.deliveryInstructions}
              onChange={handleInputChange}
            />
            <Stack
              direction="row"
              spacing={1}
              mt={2}
              sx={{
                "@media (max-width: 700px)": {
                  flexWrap: "wrap !important",
                },
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleSelectLabel("Home")}
                sx={{
                  border:
                    currentAddress.label === "Home" ? "2px solid #d32f2f" : "",
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
                    currentAddress.label === "Work" ? "2px solid #d32f2f" : "",
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
                    currentAddress.label === "Other" ? "2px solid #d32f2f" : "",
                }}
              >
                Other
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAddress} color="primary">
            Add Address
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default Address;