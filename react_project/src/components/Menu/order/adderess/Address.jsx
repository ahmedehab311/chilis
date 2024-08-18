import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Typography } from "@mui/material";
import AddressData from "./addressData/DialogAdderss";
import { API_AREAS, API_CITIES } from "./apiAdderss";
import {
  fetchAddresses,
  deleteAddress,
} from "../../../../rtk/slices/adderssSlice";
import DialogAdderss from "./addressDaiolg/DialogAdderss";
import AddNewAddressButton from "../buttons/AddNewAddressButton";
function Address({ onClose }) {
  const dispatch = useDispatch();
  const addressData = useSelector((state) => state.addresses.items || []);

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [user, setUser] = useState(null);

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

  const handleDeleteAddress = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (isConfirmed) {
      try {
        await dispatch(deleteAddress(id));
        dispatch(fetchAddresses());
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  const [openDialog2, setOpenDialog2] = useState(false);

  const handleClickOpen2 = () => {
    setOpenDialog2(true);
  };

  const handleClose2 = () => {
    setOpenDialog2(false);
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
      <AddNewAddressButton
        handleClickOpen={handleClickOpen2}
        buttonText="Add Address adderss"
        buttonStyle={{
          backgroundColor: "#d32f2f",
          "&:hover": { backgroundColor: "#d32f2f" },
        }}
      />

      <DialogAdderss open={openDialog2} onClose={handleClose2} />
    </Stack>
  );
}

export default Address;
