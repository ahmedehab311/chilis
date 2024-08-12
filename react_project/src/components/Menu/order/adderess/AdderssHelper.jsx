import { useState, useEffect } from "react";
import axios from "axios";
import { API_CITIES, API_AREAS } from "./apiAdderss";
// دالة لجلب المدن
export const useCities = () => {
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

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

  return { cities, loadingCities };
};

// دالة لجلب المناطق بناءً على المدينة المحددة
export const useAreas = (selectedCity) => {
  const [areas, setAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(false);

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

  return { areas, loadingAreas };
};

// دوال التحديث
export const useAddressHandlers = () => {
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

  const handleCityChange = (event) => {
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      deliveryCity: event.target.value,
      deliveryArea: "",
    }));
  };

  const handleAreaChange = (event) => {
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      deliveryArea: event.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };




  return {
    // handleBlur,
    currentAddress,
    handleCityChange,
    handleAreaChange,
    handleInputChange,
    setCurrentAddress,
  };
};
