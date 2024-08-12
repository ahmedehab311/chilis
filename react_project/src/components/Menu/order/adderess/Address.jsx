import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import AddressData from "./addressData/AddressData";
import { api_token, API_AREAS, API_CITIES, API_ADD_ADDRESS } from "./apiAdderss";
import AddNewAddressButton from "../buttons/AddNewAddressButton";

import {
  fetchAddresses,
  addAddress,
  deleteAddress
} from "../../../../rtk/slices/adderssSlice";

import DialogAdderss from "./addressDaiolg/DialogAdderss";

function Address({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addressData = useSelector((state) => state.addresses.items || []);

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [open, setOpen] = useState(false);
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

  const handleDeleteAddress = async (id) => {
    try {
      await dispatch(deleteAddress(id));
      dispatch(fetchAddresses());
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
          Your Delivery Address List
        </Typography>
      </Stack>
      <AddressData
        handleDeleteAddress={handleDeleteAddress}
        addressData={addressData}
      />
      <AddNewAddressButton handleClickOpen={handleClickOpen} />

      <DialogAdderss
        open={open}
        handleClose={handleClose}
        currentAddress={currentAddress}
        cities={cities}
        areas={areas}
        loadingCities={loadingCities}
        loadingAreas={loadingAreas}
        handleCityChange={handleCityChange}
        handleAreaChange={handleAreaChange}
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        errors={errors}
        handleSelectLabel={handleSelectLabel}
        handleAddAddress={handleAddAddress}
      />
    </Stack>
  );
}

export default Address;
