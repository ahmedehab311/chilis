import { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
// import Dialog from "./addressDaiolg/Dialog";
import AddressData from "./addressData/AddressData";
import {
  api_token,
  API_AREAS,
  API_CITIES,
  API_ADDRESS,
  API_ADD_ADDRESS,
  API_DELETE_ADDRESS,
} from "./api";
import AddNewAddressButton from "../buttons/AddNewAddressButton";
import DiaolgButtonsAddress from "../buttons/AddressDiaolgButtons";
import DiaolgLabels from "../buttons/DiaolgLabels";
function Address() {
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [open, setOpen] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [user, setUser] = useState(null);
  // const [activeIndex, setActiveIndex] = useState(null);
  const [errors, setErrors] = useState({});
  // const [addressName, setAddressName] = useState({});
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
      const response = await fetch(`${API_ADDRESS}`);
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

    try {
      const response = await axios.post(
        `${API_ADD_ADDRESS}${queryParams.toString()}`
      );

      // تحقق من الشكل الفعلي للبيانات المستلمة
      const dataResponse = response.data;
      console.log("response", dataResponse);

      // تحقق من الاستجابة بشكل صحيح
      if (dataResponse.response) {
        handleClose(); // أغلق الحوار أولاً

        // انتظر حتى يتم إغلاق الحوار
        await new Promise((resolve) => setTimeout(resolve, 500));

        // ثم قم بتفريغ الحقول
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

        // جلب العناوين المحدثة
        fetchAddresses();
      } else {
        console.error(
          "Error adding address:",
          dataResponse.message || "Unknown error"
        );
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
    setCurrentAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
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

  return (
    <Stack spacing={3} sx={{margin:"1rem"}}>
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
      <AddressData
        handleDeleteAddress={handleDeleteAddress}
        addressData={addressData}
      />
      <AddNewAddressButton handleClickOpen={handleClickOpen} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "500",
              textAlign: "left",
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
            <DiaolgLabels
              handleSelectLabel={handleSelectLabel}
              currentAddress={currentAddress}
            />
          </Stack>
        </DialogContent>

        <DiaolgButtonsAddress
          handleClose={handleClose}
          handleAddAddress={handleAddAddress}
        />
      </Dialog>
      {/* <Dialog 
          handleClose={handleClose}
  handleBlur={handleBlur}
  handleInputChange={handleInputChange}
  handleAreaChange={handleAreaChange}
  open={open}
  loadingCities={loadingCities}
  cities={cities}
  loadingAreas={loadingAreas}
  selectedCity={selectedCity}
  areas={areas}
  errors={errors}
      /> */}
    </Stack>
  );
}

export default Address;
