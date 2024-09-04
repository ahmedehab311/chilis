// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Stack, Typography } from "@mui/material";
// import AddressData from "./addressData/AddressData";
// import { API_AREAS, API_CITIES } from "./apiAdderss";
// import {
//   fetchAddresses,
//   deleteAddress,
// } from "../../../../rtk/slices/adderssSlice";
// import DialogAdderss from "./addressDaiolg/DialogAdderss";
// import AddNewAddressButton from "../buttons/AddNewAddressButton";
// function Address({ onClose }) {
//   const dispatch = useDispatch();
//   const addressData = useSelector((state) => state.addresses.items || []);

//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loadingAreas, setLoadingAreas] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log("Starting fetchAddresses...");
//       try {
//         const result = await dispatch(fetchAddresses());
//         console.log("fetchAddresses completed:", result);
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchCities = async () => {
//       setLoadingCities(true);
//       try {
//         const response = await fetch(API_CITIES);
//         const data = await response.json();
//         setCities(data.data.cities);
//       } catch (error) {
//         console.error("Error fetching cities:", error);
//       } finally {
//         setLoadingCities(false);
//       }
//     };

//     fetchCities();
//   }, []);

//   useEffect(() => {
//     if (selectedCity) {
//       const fetchAreas = async () => {
//         setLoadingAreas(true);
//         try {
//           const response = await fetch(`${API_AREAS}${selectedCity}`);
//           const responseData = await response.json();
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }

//           const areaNames = responseData.data.areas.map((area) => ({
//             id: area.id,
//             name: area.area_name_en,
//           }));

//           setAreas(areaNames);
//         } catch (error) {
//           console.error("Error fetching areas:", error);
//         } finally {
//           setLoadingAreas(false);
//         }
//       };

//       fetchAreas();
//     }
//   }, [selectedCity]);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(fetchAddresses());
//   }, [dispatch]);

//   const addresses = useSelector((state) => state.addresses);
//   useEffect(() => {
//     console.log("Addresses from Redux state:", addresses.items);
//   }, [addresses]);
//   const handleDeleteAddress = async (id) => {
//     const isConfirmed = window.confirm(
//       "Are you sure you want to delete this address?"
//     );

//     if (isConfirmed) {
//       try {
//         await dispatch(deleteAddress(id));
//         dispatch(fetchAddresses());
//       } catch (error) {
//         console.error("Error deleting address:", error);
//       }
//     }
//   };

//   const [openDialog2, setOpenDialog2] = useState(false);

//   const handleClickOpen2 = () => {
//     setOpenDialog2(true);
//   };

//   const handleClose2 = () => {
//     setOpenDialog2(false);
//   };

//   const handleAddressSelect = (selectedAddressId) => {
//     console.log("Selected address ID in parent component:", selectedAddressId);
//     // يمكنك تنفيذ أي منطق تريده هنا بناءً على العنوان المحدد
//   };

//   return (
//     <Stack spacing={3} sx={{ margin: "1rem" }}>
//       <Stack>
//         <Typography
//           sx={{
//             fontSize: "18px",
//             fontWeight: 700,
//             textAlign: "left",
//             fontFamily: "cairo",
//           }}
//         >
//           Your Delivery Address List
//         </Typography>
//       </Stack>
//       <AddressData
//         handleDeleteAddress={handleDeleteAddress}
//         addressData={addressData}
//         onAddressSelect={handleAddressSelect}

//       />
//       <AddNewAddressButton
//         handleClickOpen={handleClickOpen2}
//         buttonText="Add Address adderss"
//         buttonStyle={{
//           backgroundColor: "#d32f2f",
//           "&:hover": { backgroundColor: "#d32f2f" },
//         }}
//       />

//       <DialogAdderss open={openDialog2} onClose={handleClose2} />
//     </Stack>
//   );
// }

// export default Address;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Typography } from "@mui/material";
import AddressData from "./addressData/AddressData";
import { API_AREAS, API_CITIES } from "./apiAdderss";
import {
  fetchAddresses,
  deleteAddress,
  setSelectedAddress, 
  setUnavailableAddresses
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
  const addresses = useSelector((state) => state.addresses.items);
  const unavailableAddresses = useSelector((state) => state.addresses.unavailableAddresses);
  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem('addresses', JSON.stringify(addresses));
    }
  }, [addresses]);
  useEffect(() => {
    const fetchData = async () => {
      console.log("Starting fetchAddresses...");
      try {
        const result = await dispatch(fetchAddresses());
        console.log("fetchAddresses completed:", result.payload);
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

  // const handleAddressSelect = (selectedAddressId) => {
  //   // console.log("Selected address ID in parent component:", selectedAddressId);
  //   dispatch(setSelectedAddress(selectedAddressId));
  // };
  const checkAvailability = (addresses) => {
    const now = new Date();
    const unavailable = addresses.filter((address) => {
      const branch = address.branches[0];
      if (branch) {
        const branchOpenTime = new Date(branch.open);
        const lastDeliveryTime = new Date(branch.last_delivery);
        return now < branchOpenTime || now > lastDeliveryTime;
      }
      return false;
    });

    dispatch(setUnavailableAddresses(unavailable.map((addr) => addr.id)));
  };
  
  const handleAddressSelect = (selectedAddressId) => {
    if (unavailableAddresses.includes(selectedAddressId)) {
      alert("This address is currently unavailable for delivery.");
    } else {
      dispatch(setSelectedAddress(selectedAddressId));
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
        onAddressSelect={handleAddressSelect}
      />
      <AddNewAddressButton
        handleClickOpen={handleClickOpen2}
        buttonText="Add Address"
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
