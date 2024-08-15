// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Button, Stack, Typography } from "@mui/material";
// import axios from "axios";
// import AddressData from "./addressData/DialogAdderss";
// import { API_AREAS, API_CITIES, API_ADD_ADDRESS } from "./apiAdderss";
// import {
//   fetchAddresses,
//   deleteAddress,
// } from "../../../../rtk/slices/adderssSlice";
// import DialogAdderss from "./addressDaiolg/DialogAdderss";
// function Address({ onClose }) {
//   // const api_token = localStorage.getItem("token");
//   const dispatch = useDispatch();
//   // const navigate = useNavigate();
//   const addressData = useSelector((state) => state.addresses.items || []);

//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loadingAreas, setLoadingAreas] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [currentAddress, setCurrentAddress] = useState({
//     deliveryCity: "",
//     deliveryArea: "",
//     street: "",
//     building: "",
//     floor: "",
//     apt: "",
//     deliveryInstructions: "",
//     label: "",
//   });

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
//     console.log("Address Data:", addressData);
//   }, [addressData]);

//   useEffect(() => {
//     dispatch(fetchAddresses());
//   }, [dispatch]);


//   const handleDeleteAddress = async (id) => {
//     try {
//       await dispatch(deleteAddress(id));
//       dispatch(fetchAddresses());
//     } catch (error) {
//       console.error("Error deleting address:", error);
//     }
//   };
//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);


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
//       />

// <Stack>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleClickOpen}
//           sx={{
//             backgroundColor: "#d32f2f",
//             "&:hover": {
//               backgroundColor: "#9a0007",
//             },
//           }}
//         >
//           Add New Address
//         </Button>
//       </Stack>
//       <DialogAdderss open={open}  onclose={handleClose} handleClose={handleClose} />
//       {/* <DialogAdderss open={open} onclose={onClose} setopen={setOpen} /> */}
//     </Stack>
//   );
// }

// export default Address;
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Stack, Typography } from "@mui/material";
import AddressData from "./addressData/DialogAdderss";
import { API_AREAS, API_CITIES } from "./apiAdderss";
import {
  fetchAddresses,
  deleteAddress,
} from "../../../../rtk/slices/adderssSlice";
import DialogAdderss from "./addressDaiolg/DialogAdderss";
function Address({ onClose }) {

  const dispatch = useDispatch();
  const addressData = useSelector((state) => state.addresses.items || []);

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});


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
 <Stack
    sx={{ alignItems:"center",
      mb:"4px",}}>
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
      <DialogAdderss open={open} onclose={onClose} setopen={setOpen} />
    </Stack>
  );
}

export default Address;