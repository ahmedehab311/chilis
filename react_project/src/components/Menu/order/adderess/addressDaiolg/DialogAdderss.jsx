/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Stack, Dialog, DialogContent } from "@mui/material";
import { API_AREAS, API_CITIES, API_ADD_ADDRESS } from "../apiAdderss";
import {
  DiaolgButtonsAddress,
  DiaolgLabels,
  SelectAdderss,
  InputsAdderss,
  DiolgTitle,
  fetchAddresses,
} from "./index";

function AddressDialog({ open, onClose }) {
  const api_token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
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
      // console.log("response", dataResponse);

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
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DiolgTitle onClose={onClose} />
        <DialogContent>
          <Stack spacing={2}>
            <SelectAdderss
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              currentAddress={currentAddress}
              setCurrentAddress={setCurrentAddress}
              loadingCities={loadingCities}
              cities={cities}
              areas={areas}
              setAreas={setAreas}
              loadingAreas={loadingAreas}
              setSelectedArea={setSelectedArea}
            />

            <InputsAdderss
              currentAddress={currentAddress}
              setCurrentAddress={setCurrentAddress}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
              errors={errors}
            />
            <DiaolgLabels
              handleSelectLabel={handleSelectLabel}
              currentAddress={currentAddress}
            />
          </Stack>
        </DialogContent>

        <DiaolgButtonsAddress
          onClose={onClose}
          handleAddAddress={handleAddAddress}
        />
      </Dialog>
    </>
  );
}

export default AddressDialog;
