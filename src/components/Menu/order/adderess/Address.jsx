/* eslint-disable no-unused-vars */
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

  // import { useState, useEffect } from "react";
  // import { useSelector, useDispatch } from "react-redux";
  // import { Stack, Typography } from "@mui/material";
  // import AddressData from "./addressData/AddressData";
  // import { API_AREAS, API_CITIES } from "./apiAdderss";
  // import {
  //   fetchAddresses,
  //   deleteAddress,
  //   setSelectedAddress,
  //   setUnavailableAddresses,
  // } from "../../../../rtk/slices/adderssSlice.js";
  // import DialogAdderss from "./addressDaiolg/DialogAdderss";
  // import AddNewAddressButton from "../buttons/AddNewAddressButton";

  // function Address() {
  //   const dispatch = useDispatch();
  //   const addressData = useSelector((state) => state.addresses.items || []);

  //   const [cities, setCities] = useState([]);
  //   const [areas, setAreas] = useState([]);
  //   const [loadingCities, setLoadingCities] = useState(false);
  //   const [loadingAreas, setLoadingAreas] = useState(false);
  //   const [selectedCity, setSelectedCity] = useState("");
  //   const [user, setUser] = useState(null);
  //   const addresses = useSelector((state) => state.addresses.items);
  //   const unavailableAddresses = useSelector(
  //     (state) => state.addresses.unavailableAddresses
  //   );
  //   useEffect(() => {
  //     if (addresses.length > 0) {
  //       localStorage.setItem("addresses", JSON.stringify(addresses));
  //     }
  //   }, [addresses]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       console.log("Starting fetchAddresses...");
  //       try {
  //         const result = await dispatch(fetchAddresses());
  //         console.log("fetchAddresses completed:", result.payload);
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

  //   useEffect(() => {
  //     const storedAddressId = localStorage.getItem("selectedAddressId");
    
  //     if (storedAddressId && addresses.length > 0) {
  //       const selectedAddress = addresses.find(
  //         (address) => address.id === storedAddressId
  //       );
    
  //       // تحقق من أن العنوان موجود وصحيح قبل تمريره إلى Redux
  //       if (selectedAddress) {
  //         dispatch(setSelectedAddress(selectedAddress));
  //       } else {
  //         console.error("No address found with the given ID.");
  //         dispatch(setSelectedAddress(null)); // إذا لم يتم العثور على عنوان، اجعل Redux يخزن null
  //       }
  //     }
  //   }, [dispatch, addresses]);
    
  //   const handleAddressSelect = (address) => {
  //     if (typeof address === 'object' && address.id) {
  //       localStorage.setItem("selectedAddress", JSON.stringify(address));
    
    
  //       dispatch(setSelectedAddress(address));
    
  //       console.log("Selected Address from profile:", address);
  //     } else {
  //       console.error("Address is not an object or is missing required properties.");
  //     }
  //   };
    
  //   useEffect(() => {
  //     const storedAddress = localStorage.getItem("selectedAddress");
    
  //     if (storedAddress) {
  //       const parsedAddress = JSON.parse(storedAddress);
  //       dispatch(setSelectedAddress(parsedAddress));
  //     }
  //   }, [dispatch]);
    

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
  //         unavailableAddresses={unavailableAddresses}
  //         showDeleteIcon={true}
     
  //       />
  //       <AddNewAddressButton
  //         handleClickOpen={handleClickOpen2}
  //         buttonText="Add New Address"
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

//   import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Stack, Typography } from "@mui/material";
// import AddressData from "./addressData/AddressData";
// import { API_AREAS, API_CITIES } from "./apiAdderss";
// import {
//   fetchAddresses,
//   deleteAddress,
//   setSelectedAddress,
//   setUnavailableAddresses,
// } from "../../../../rtk/slices/adderssSlice.js";
// import DialogAdderss from "./addressDaiolg/DialogAdderss";
// import AddNewAddressButton from "../buttons/AddNewAddressButton";

// function Address() {
//   const dispatch = useDispatch();
//   const addressData = useSelector((state) => state.addresses.items || []);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loadingAreas, setLoadingAreas] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [user, setUser] = useState(null);
//   const addresses = useSelector((state) => state.addresses.items);
//   const unavailableAddresses = useSelector(
//     (state) => state.addresses.unavailableAddresses
//   );
//   const selectedAddressId = useSelector(
//     (state) => state.addresses.selectedAddress?.id
//   ); // افترض أن الـ Redux store يحتوي على selectedAddress
//   useEffect(() => {
//     if (addresses.length > 0) {
//       localStorage.setItem("addresses", JSON.stringify(addresses));

//       // تعيين العنوان الأول كعنوان محدد إذا لم يكن هناك عنوان محدد
//       if (!selectedAddressId) {
//         const firstAddress = addresses[0];
//         dispatch(setSelectedAddress(firstAddress));
//         localStorage.setItem("selectedAddress", JSON.stringify(firstAddress));
//       }
//     } else {
//       // لا يوجد عناوين، يجب تعيين selectedAddress إلى null
//       dispatch(setSelectedAddress(null));
//       localStorage.removeItem("selectedAddress");
//     }
//   }, [addresses, dispatch, selectedAddressId]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchAddresses());
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

//   useEffect(() => {
//     const storedAddress = localStorage.getItem("selectedAddress");

//     if (storedAddress) {
//       const parsedAddress = JSON.parse(storedAddress);
//       dispatch(setSelectedAddress(parsedAddress));
//     }
//   }, [dispatch]);

//   const handleAddressSelect = (address) => {
//     if (typeof address === 'object' && address.id) {
//       localStorage.setItem("selectedAddress", JSON.stringify(address));
//       dispatch(setSelectedAddress(address));
//       console.log("Selected Address from profile:", address);
//     } else {
//       console.error("Address is not an object or is missing required properties.");
//     }
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
//         unavailableAddresses={unavailableAddresses}
//         showDeleteIcon={true}
//       />
//       <AddNewAddressButton
//         handleClickOpen={handleClickOpen2}
//         buttonText="Add New Address"
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
  setUnavailableAddresses,

} from "../../../../rtk/slices/adderssSlice.js";
import DialogAdderss from "./addressDaiolg/DialogAdderss";
import AddNewAddressButton from "../buttons/AddNewAddressButton";

function Address() {
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

  const addresses = useSelector((state) => state.addresses.items);
  const selectedAddressId = useSelector(
    (state) => state.addresses.selectedAddress?.id
  );

  const selectedAddress = useSelector((state) => state.addresses.selectedAddress);
  useEffect(() => {
    if (addresses.length > 0) {
      const savedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
      
      // تحقق من أن العنوان المخزن موجود في قائمة العناوين
      if (savedAddress && addresses.some((addr) => addr.id === savedAddress.id)) {
        dispatch(setSelectedAddress(savedAddress));
      } else {
        // لا تعيين العنوان الأول مباشرة إلا إذا كان لا يوجد عنوان مخزن
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

  const handleDeleteAddress = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (isConfirmed) {
      try {
        await dispatch(deleteAddress(id));

        // بعد الحذف، تحديث قائمة العناوين وعنوان الـ Checkout
        const remainingAddresses = addresses.filter((address) => address.id !== id);
        if (remainingAddresses.length > 0) {
          // تعيين أول عنوان متاح كعنوان محدد جديد
          dispatch(setSelectedAddress(remainingAddresses[0]));
          localStorage.setItem("selectedAddress", JSON.stringify(remainingAddresses[0]));
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
  };

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
  


  const handleAddressSelect = (address) => {
    if (typeof address === 'object' && address.id) {
      if (address.isAvailable) { // Assuming there's a property that indicates availability
        dispatch(setSelectedAddress(address));
        localStorage.setItem("selectedAddress", JSON.stringify(address));
      } else {
        // console.warn("Selected address is not available.");
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
