/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
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
import DiaolgButtonsAddress from "../../buttons/AddressDiaolgButtons";
import DiaolgLabels from "../../buttons/DiaolgLabels";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_AREAS, API_CITIES, API_ADD_ADDRESS } from "../apiAdderss";
import { fetchAddresses } from "../../../../../rtk/slices/adderssSlice";
import { toast } from "react-toastify";

function AddressDialog({ open, onClose }) {
  const api_token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const addressData = useSelector((state) => state.addresses.items || []);

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  // const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
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

  useEffect(() => {
    console.log("Address Data:", addressData);
  }, [addressData]);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

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
        if (window.location.pathname === "/profile") {
          toast.success("Address added successfully!");
        }
        onClose();
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
        dispatch(fetchAddresses());
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

    // إذا كان هناك خطأ في الحقل وتم إدخال قيمة جديدة، قم بإزالة الخطأ
    if (value.trim()) {
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
    <>
      {/* <AddNewAddressButton handleClickOpen={handleClickOpen} /> */}

      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "1.5rem",
                  mb: ".8",
                }}
              >
                Delivery city
              </Typography>
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
            </Stack>
            <Stack>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "1.5rem",
                  mb: ".8",
                }}
              >
                Delivery Area
              </Typography>
              <Select
                value={currentAddress.deliveryArea}
                onChange={handleAreaChange}
                displayEmpty
                inputProps={{ "aria-label": "Area" }}
                disabled={loadingAreas || !currentAddress.deliveryCity}
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
            </Stack>
            <Stack>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "1.5rem",
                  mb: ".8",
                }}
              >
                Street
              </Typography>
              <TextField
                name="street"
                value={currentAddress.street}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={!!errors.street}
                helperText={errors.street}
              />
            </Stack>
            <Stack>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "1.5rem",
                  mb: ".8",
                }}
              >
                building
              </Typography>
              <TextField
                name="building"
                value={currentAddress.building}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={!!errors.building}
                helperText={errors.building}
              />
            </Stack>
            <Stack>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "1.5rem",
                  mb: ".8",
                }}
              >
                floor
              </Typography>
              <TextField
                name="floor"
                value={currentAddress.floor}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={!!errors.floor}
                helperText={errors.floor}
              />
            </Stack>
            <Stack>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "1.5rem",
                  mb: ".8",
                }}
              >
                Apt
              </Typography>
              <TextField
                name="apt"
                value={currentAddress.apt}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </Stack>

            <Stack>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "1.5rem",
                  mb: ".8",
                }}
              >
                delivery Instructions
              </Typography>
              <TextField
                name="deliveryInstructions"
                value={currentAddress.deliveryInstructions}
                onChange={handleInputChange}
              />
            </Stack>

            <DiaolgLabels
              handleSelectLabel={handleSelectLabel}
              currentAddress={currentAddress}
            />
          </Stack>
        </DialogContent>

        <DiaolgButtonsAddress
          onClose={onClose}
          // handleClose={handleClose}
          handleAddAddress={handleAddAddress}
        />
      </Dialog>
    </>
  );
}

export default AddressDialog;
