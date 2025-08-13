/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Typography } from "@mui/material";
import AddressData from "./addressData/AddressData";
import { API_AREAS, API_CITIES } from "./apiAdderss";
import {
  fetchAddresses,
  deleteAddress,
  setSelectedAddress,
} from "../../../../rtk/slices/adderssSlice.js";
import DialogAdderss from "./addressDaiolg/DialogAdderss";
import AddNewAddressButton from "../buttons/AddNewAddressButton";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
function Address() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addressData = useSelector((state) => state.addresses.items || []);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [user, setUser] = useState(null);
  const unavailableAddresses = useSelector(
    (state) => state.addresses.unavailableAddresses
  );
  // console.log("unavailableAddresses",unavailableAddresses)
  const addresses = useSelector((state) => state.addresses.items);
  // console.log("addresses",addresses)

  // useEffect(() => {
  //   // console.log("Unavailable Addresses from Redux:", unavailableAddresses); 
  // }, [unavailableAddresses]);
  const selectedAddressId = useSelector(
    (state) => state.addresses.selectedAddress?.id
  );

  const selectedAddress = useSelector(
    (state) => state.addresses.selectedAddress
  );
  // console.log("selectedAddress",selectedAddress);

  useEffect(() => {
    if (addresses.length > 0) {
      const savedAddress = JSON.parse(localStorage.getItem("selectedAddress"));

      if (
        savedAddress &&
        addresses.some((addr) => addr.id === savedAddress.id)
      ) {
        dispatch(setSelectedAddress(savedAddress));
      } else {
        if (!savedAddress) {
          const firstAddress = addresses[0];
          dispatch(setSelectedAddress(firstAddress));
          localStorage.setItem("selectedAddress", JSON.stringify(firstAddress));
        }
      }
    }
  }, [addresses, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAddresses());
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchData();
  }, [dispatch]);

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
  const showConfirm = (id) => {
    Modal.confirm({
      title: t("deletedAddress"),
      okText: t("profile.ok"),
      cancelText: t("profile.cancel"),
      centered: true,
      okButtonProps: {
        style: { backgroundColor: "#d32f2f" }
      }, maskClosable: true,
      // cancelButtonProps: {
      //   style: { border: "none" }
      // },
      async onOk() {
        try {
          await dispatch(deleteAddress(id));

          // بعد الحذف، تحديث قائمة العناوين وعنوان الـ Checkout
          const remainingAddresses = addresses.filter(
            (address) => address.id !== id
          );
          if (remainingAddresses.length > 0) {
            // تعيين أول عنوان متاح كعنوان محدد جديد
            dispatch(setSelectedAddress(remainingAddresses[0]));
            localStorage.setItem(
              "selectedAddress",
              JSON.stringify(remainingAddresses[0])
            );
          } else {
            // لا يوجد عناوين، يجب تعيين selectedAddress إلى null
            dispatch(setSelectedAddress(null));
            localStorage.removeItem("selectedAddress");
          }

          // تحديث العناوين
          dispatch(fetchAddresses());
        } catch (error) {
          console.error("Error deleting address:", error);
        }
      }
    })
  };
  // const handleDeleteAddress = async (id) => {
  //   const isConfirmed = window.confirm(
  //     "Are you sure you want to delete this address?"
  //   );

  //   if (isConfirmed) {
  //     try {
  //       await dispatch(deleteAddress(id));

  //       // بعد الحذف، تحديث قائمة العناوين وعنوان الـ Checkout
  //       const remainingAddresses = addresses.filter(
  //         (address) => address.id !== id
  //       );
  //       if (remainingAddresses.length > 0) {
  //         // تعيين أول عنوان متاح كعنوان محدد جديد
  //         dispatch(setSelectedAddress(remainingAddresses[0]));
  //         localStorage.setItem(
  //           "selectedAddress",
  //           JSON.stringify(remainingAddresses[0])
  //         );
  //       } else {
  //         // لا يوجد عناوين، يجب تعيين selectedAddress إلى null
  //         dispatch(setSelectedAddress(null));
  //         localStorage.removeItem("selectedAddress");
  //       }

  //       // تحديث العناوين
  //       dispatch(fetchAddresses());
  //     } catch (error) {
  //       console.error("Error deleting address:", error);
  //     }
  //   }
  // };

  const [openDialog2, setOpenDialog2] = useState(false);

  const handleClickOpen2 = () => {
    setOpenDialog2(true);
  };

  const handleClose2 = () => {
    setOpenDialog2(false);
  };

  useEffect(() => {
    const storedAddress = localStorage.getItem("selectedAddress");

    if (storedAddress) {
      const parsedAddress = JSON.parse(storedAddress);
      dispatch(setSelectedAddress(parsedAddress));
      // console.log("Address loaded from localStorage:", parsedAddress);
    }
  }, [dispatch]);

  useEffect(() => {
    // console.log("Current selectedAddress in Redux:", selectedAddress);
    const storedAddress = localStorage.getItem("selectedAddress");

    if (storedAddress) {
      const parsedAddress = JSON.parse(storedAddress);
      // console.log("Address loaded from localStorage:", parsedAddress);

      if (parsedAddress.id !== selectedAddress?.id) {
        dispatch(setSelectedAddress(parsedAddress));
      }
    }
  }, [dispatch, selectedAddress]);

  // const handleAddressSelect = (address) => {
  //  if (address !== null && typeof address === "object" && address?.id) {
  //     if (address.isAvailable) {
  //       // Assuming there's a property that indicates availability
  //       dispatch(setSelectedAddress(address));
  //       localStorage.setItem("selectedAddress", JSON.stringify(address));
  //     } else {
  //       // console.warn("Selected address is not available.");
  //     }
  //   } else {
  //     console.error(
  //       "Address is not an object or is missing required properties."
  //     );
  //   }
  // };
  // console.log("addressData",addressData); 

  const handleAddressSelect = (address) => {
    if (!address) return; // لو null أو undefined اخرج بهدوء

    if (typeof address === "object" && address.id) {
      if (address.isAvailable) {
        dispatch(setSelectedAddress(address));
        localStorage.setItem("selectedAddress", JSON.stringify(address));
      }
    } else {
      console.error("Address is not an object or is missing required properties.");
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
            fontFamily: "tahoma",
          }}
        >
          {t("Your Delivery Address List")}
        </Typography>
      </Stack>
      <AddressData
        handleDeleteAddress={showConfirm}
        addressData={addressData}
        onAddressSelect={handleAddressSelect}
        unavailableAddresses={unavailableAddresses}
        showDeleteIcon={true}
      />
      <AddNewAddressButton
        handleClickOpen={handleClickOpen2}
        buttonText="Add New Address"
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
