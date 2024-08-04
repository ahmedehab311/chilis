// import { useEffect, useState } from "react";
// import {
//   Stack,
//   TextField,
//   Typography,
//   Card,
//   Button,
//   CircularProgress,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// function Address() {
//   const API_CITIES = "https://myres.me/chilis/api/cities";
//   const API_ARIA = (cityId) =>
//     `https://myres.me/chilis/api/areas/?city=${cityId}`;
//   const API_ADDRESS = "https://myres.me/chilis/api/profile/address/";
//   const API_ADD_ADDRESS = "https://myres.me/chilis/api/profile/address/add";
//   const API_DELETE_ADDRESS = (id) =>
//     `https://myres.me/chilis/api/profile/address/delete/${id}`;

//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loadingAreas, setLoadingAreas] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [open, setOpen] = useState(false);
//   const [addressData, setAddressData] = useState([]);
//   const [user, setUser] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(null);
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
//         console.log(data.data.cities);
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
//           const response = await fetch(API_ARIA(selectedCity));
//           const data = await response.json();
//           setAreas(data.data.areas);
//           console.log(data.data.areas);
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
//     const fetchAddresses = async () => {
//       try {
//         const response = await fetch(API_ADDRESS, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const data = await response.json();
//         setAddressData(data.data.addresses);
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//       }
//     };

//     fetchAddresses();
//   }, []);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleCityChange = (event) => {
//     setSelectedCity(event.target.value);
//     setCurrentAddress((prevAddress) => ({
//       ...prevAddress,
//       deliveryCity: event.target.value,
//       deliveryArea: "", // Reset delivery area when city changes
//     }));
//     setAreas([]); // Reset areas when city changes
//   };

//   const handleAreaChange = (event) => {
//     setSelectedArea(event.target.value);
//     setCurrentAddress((prevAddress) => ({
//       ...prevAddress,
//       deliveryArea: event.target.value,
//     }));
//   };

//   const handleDeleteAddress = async (id) => {
//     try {
//       await fetch(API_DELETE_ADDRESS(id), {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setAddressData((prev) => prev.filter((address) => address.id !== id));
//       if (activeIndex === id) {
//         setActiveIndex(null);
//       }
//     } catch (error) {
//       console.error("Error deleting address:", error);
//     }
//   };

//   const handleCardClick = (index) => {
//     setActiveIndex(index);
//     setSelectedAddress(addressData[index]);
//   };

//   const handleSelectLabel = (label) => {
//     setCurrentAddress((prev) => ({ ...prev, label }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentAddress((prevAddress) => ({
//       ...prevAddress,
//       [name]: value,
//     }));
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     if (!value.trim()) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "This field is required",
//       }));
//     }
//   };

//   const handleAddAddress = async () => {
//     const requiredFields = [
//       "deliveryCity",
//       "deliveryArea",
//       "street",
//       "building",
//       "floor",
//       "apt",
//     ];
//     const newErrors = {};

//     requiredFields.forEach((field) => {
//       if (!currentAddress[field]) {
//         newErrors[field] = "This field is required";
//       }
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     const addressWithUser = {
//       ...currentAddress,
//       user: user?.name || "Anonymous",
//     };

//     try {
//       const response = await fetch(
//         `${API_ADD_ADDRESS}?area=${addressWithUser.deliveryArea}&street=${addressWithUser.street}&building=${addressWithUser.building}&floor=${addressWithUser.floor}&apt=${addressWithUser.apt}&name=${addressWithUser.label}&lat=20.222222&lng=30.333333`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       const data = await response.json();
//       setAddressData((prev) => [...prev, data.data.address]);
//       setOpen(false);
//       setCurrentAddress({
//         deliveryCity: "",
//         deliveryArea: "",
//         street: "",
//         building: "",
//         floor: "",
//         apt: "",
//         deliveryInstructions: "",
//         label: "",
//       });
//       setErrors({});
//     } catch (error) {
//       console.error("Error adding address:", error);
//     }
//   };

//   return (
//     <Stack>
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
//       <Stack spacing={2}>
//         {addressData.map((address, index) => (
//           <Card
//             key={index}
//             sx={{
//               mb: 3,
//               border: activeIndex === index ? "2px solid #d32f2f" : "none",
//             }}
//             onClick={() => handleCardClick(index)}
//           >
//             <Stack sx={{ background: "#f8f9fa!important", p: 2 }}>
//               <Typography
//                 sx={{
//                   fontSize: "1.4rem",
//                   fontWeight: "500",
//                   lineHeight: "1.2",
//                 }}
//               >
//                 {address.label}
//               </Typography>
//             </Stack>
//             <Stack
//               sx={{ display: "flex", p: ".5rem" }}
//               direction={"row"}
//               alignItems={"center"}
//             >
//               <Stack sx={{ p: "1.5rem" }}>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     color: "#6c757d!important",
//                     fontSize: "1.3rem",
//                     fontWeight: "500",
//                     lineHeight: "1.2",
//                     textTransform: "capitalize",
//                   }}
//                 >
//                   {address.deliveryCity}, {address.deliveryArea},{" "}
//                   {address.street}, Building: {address.building}, Floor:{" "}
//                   {address.floor}, Apt: {address.apt}
//                   <br />
//                   Instructions: {address.deliveryInstructions}
//                 </Typography>
//               </Stack>
//               <Stack
//                 fontSize="22px"
//                 direction={"row"}
//                 alignItems={"center"}
//                 sx={{
//                   border: "1px solid #dc3545",
//                   fontSize: "1.2rem",
//                   p: ".8rem 1.5rem",
//                   cursor: "pointer",
//                   "&:hover": {
//                     backgroundColor: "#d32f2f",
//                     borderColor: "#d32f2f",
//                     transition: ".6s",
//                   },
//                 }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDeleteAddress(address.id);
//                 }}
//               >
//                 <DeleteOutlineOutlinedIcon
//                   sx={{ color: "#6c757d", mr: 1 }}
//                   fontSize="large"
//                 />
//                 <Typography sx={{ color: "#6c757d", textAlign: "left" }}>
//                   Delete
//                 </Typography>
//               </Stack>
//             </Stack>
//           </Card>
//         ))}
//       </Stack>
//       <Stack>
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
//       <Dialog open={open} onClose={handleClose} >
//         <DialogTitle>
//           <Stack
//             direction={"row"}
//             justifyContent={"space-between"}
//             alignItems={"center"}
//             sx={{width:"60%" }}
//           >
//             <Typography variant="h6">Add New Address</Typography>
//             <IconButton onClick={handleClose}>
//               <CloseIcon />
//             </IconButton>
//           </Stack>
//         </DialogTitle>
//         <DialogContent >
//           <Stack spacing={2}>
//             <Stack>
//               <Typography>City</Typography>
//               {loadingCities ? (
//                 <CircularProgress />
//               ) : (
//                 <Select
//                   value={selectedCity}
//                   onChange={handleCityChange}
//                   fullWidth
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Select City
//                   </MenuItem>
//                   {cities.map((city) => (
//                     <MenuItem key={city.id} value={city.id}>
//                       {city.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//               {errors.deliveryCity && (
//                 <Typography color="error">{errors.deliveryCity}</Typography>
//               )}
//             </Stack>
//             <Stack>
//               <Typography>Area</Typography>
//               {loadingAreas ? (
//                 <CircularProgress />
//               ) : (
//                 <Select
//                   value={selectedArea}
//                   onChange={handleAreaChange}
//                   fullWidth
//                   displayEmpty
//                   disabled={!selectedCity}
//                 >
//                   <MenuItem value="" disabled>
//                     Select Area
//                   </MenuItem>
//                   {areas.map((area) => (
//                     <MenuItem key={area.id} value={area.id}>
//                       {area.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//               {errors.deliveryArea && (
//                 <Typography color="error">{errors.deliveryArea}</Typography>
//               )}
//             </Stack>
//             <TextField
//               label="Street"
//               name="street"
//               value={currentAddress.street}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               error={!!errors.street}
//               helperText={errors.street}
//               fullWidth
//             />
//             <TextField
//               label="Building"
//               name="building"
//               value={currentAddress.building}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               error={!!errors.building}
//               helperText={errors.building}
//               fullWidth
//             />
//             <TextField
//               label="Floor"
//               name="floor"
//               value={currentAddress.floor}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               error={!!errors.floor}
//               helperText={errors.floor}
//               fullWidth
//             />
//             <TextField
//               label="Apartment"
//               name="apt"
//               value={currentAddress.apt}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               error={!!errors.apt}
//               helperText={errors.apt}
//               fullWidth
//             />
//             <TextField
//               label="Delivery Instructions"
//               name="deliveryInstructions"
//               value={currentAddress.deliveryInstructions}
//               onChange={handleInputChange}
//               fullWidth
//             />
//             <TextField
//               label="Label (e.g., Home, Office)"
//               name="label"
//               value={currentAddress.label}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               error={!!errors.label}
//               helperText={errors.label}
//               fullWidth
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleAddAddress}
//             color="primary"
//             variant="contained"
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Stack>
//   );
// }

// export default Address;
import { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  Typography,
  Card,
  Button,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Address() {
  const API_CITIES = "https://myres.me/chilis/api/cities";
  const API_ARIA = (cityId) =>
    `https://myres.me/chilis/api/areas/?city=${cityId}`;
  const API_ADDRESS = "https://myres.me/chilis/api/profile/address/";
  const API_ADD_ADDRESS = "https://myres.me/chilis/api/profile/address/add";
  const API_DELETE_ADDRESS = (id) =>
    `https://myres.me/chilis/api/profile/address/delete/${id}`;

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [open, setOpen] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [user, setUser] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
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

//   useEffect(() => {
//     if (selectedCity) {
//       const fetchAreas = async () => {
//         setLoadingAreas(true);
//         try {
//           const response = await fetch(API_ARIA(selectedCity));
//           const data = await response.json();
//           // Extract name_en from each area
//           const areaNames = data.data.areas.map((area) => ({
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
// useEffect(() => {
//     if (selectedCity) {
//       const fetchAreas = async () => {
//         setLoadingAreas(true);
//         try {
//           const response = await fetch(API_ARIA(selectedCity));
//           const data = await response.json();
          
//           // Assuming data.data.areas contains an array of functions that need to be called to get area_name_en
//           const areaPromises = data.data.areas.map(async (areaFunc) => {
//             const areaData = await areaFunc();
//             return {
//               id: areaData.id,
//               name: areaData.area_name_en,
//             };
//           });
  
//           const areaNames = await Promise.all(areaPromises);
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
useEffect(() => {
    if (selectedCity) {
      const fetchAreas = async () => {
        setLoadingAreas(true);
        try {
            const response = await fetch(`https://myres.me/chilis/api/areas/?city=${selectedCity}`);
            console.log("fetch areas",response.data.areas)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const areaNames = data.data.areas.map((area) => ({
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
  
      fetchAreas(); // Ensure this line is present to actually call the function
    }
  }, [selectedCity]);
  
  

  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      deliveryCity: event.target.value,
      deliveryArea: "", // Reset delivery area when city changes
    }));
    setAreas([]); // Reset areas when city changes
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      deliveryArea: event.target.value,
    }));
  };

  const handleDeleteAddress = async (id) => {
    try {
      await fetch(API_DELETE_ADDRESS(id), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAddressData((prev) => prev.filter((address) => address.id !== id));
      if (activeIndex === id) {
        setActiveIndex(null);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
    setSelectedAddress(addressData[index]);
  };

  const handleSelectLabel = (label) => {
    setCurrentAddress((prev) => ({ ...prev, label }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
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

  const handleAddAddress = async () => {
    const requiredFields = [
      "deliveryCity",
      "deliveryArea",
      "street",
      "building",
      "floor",
      "apt",
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

    const addressWithUser = {
      ...currentAddress,
      user: user?.name || "Anonymous",
    };

    try {
      const response = await fetch(
        `${API_ADD_ADDRESS}?area=${addressWithUser.deliveryArea}&street=${addressWithUser.street}&building=${addressWithUser.building}&floor=${addressWithUser.floor}&apt=${addressWithUser.apt}&name=${addressWithUser.label}&lat=20.222222&lng=30.333333`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setAddressData((prev) => [...prev, data.data.address]);
      setOpen(false);
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
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <Stack>
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
      <Stack spacing={2}>
        {addressData.map((address, index) => (
          <Card
            key={index}
            sx={{
              mb: 3,
              border: activeIndex === index ? "2px solid #d32f2f" : "none",
            }}
            onClick={() => handleCardClick(index)}
          >
            <Stack sx={{ background: "#f8f9fa!important", p: 2 }}>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "500",
                  lineHeight: "1.2",
                }}
              >
                {address.label}
              </Typography>
            </Stack>
            <Stack
              sx={{ display: "flex", p: ".5rem" }}
              direction={"row"}
              alignItems={"center"}
            >
              <Stack sx={{ p: "1.5rem" }}>
                <Typography
                  sx={{
                    display: "flex",
                    color: "#6c757d!important",
                    fontSize: "1.3rem",
                    fontWeight: "500",
                    lineHeight: "1.2",
                    textTransform: "capitalize",
                  }}
                >
                  {address.deliveryCity}, {address.deliveryArea},{" "}
                  {address.street}, Building: {address.building}, Floor:{" "}
                  {address.floor}, Apt: {address.apt}
                  <br />
                  Instructions: {address.deliveryInstructions}
                </Typography>
              </Stack>
              <Stack
                fontSize="22px"
                direction={"row"}
                alignItems={"center"}
                sx={{
                  border: "1px solid #dc3545",
                  fontSize: "1.2rem",
                  p: ".8rem 1.5rem",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                    borderColor: "#d32f2f",
                    transition: ".6s",
                  },
                }}
                onClick={() => handleDeleteAddress(address.id)}
              >
                <DeleteOutlineOutlinedIcon
                  sx={{ color: "#6c757d", mr: 1 }}
                  fontSize="large"
                />
                <Typography sx={{ color: "#6c757d", textAlign: "left" }}>
                  Delete
                </Typography>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
      <Stack>
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
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6">Add New Address</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack>
              <Typography>City</Typography>
              {loadingCities ? (
                <CircularProgress />
              ) : (
                <Select
                  value={selectedCity}
                  onChange={handleCityChange}
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select City
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name_en}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {errors.deliveryCity && (
                <Typography color="error">{errors.deliveryCity}</Typography>
              )}
            </Stack>
            <Stack>
              <Typography>Area</Typography>
              {loadingAreas ? (
                <CircularProgress />
              ) : (
                <Select
                  value={selectedArea}
                  onChange={handleAreaChange}
                  fullWidth
                  displayEmpty
                  disabled={!selectedCity}
                >
                  <MenuItem value="" disabled>
                    Select Area
                  </MenuItem>
                  {areas.map((area) => (
                    <MenuItem key={area.id} value={area.id}>
                      {area.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {errors.deliveryArea && (
                <Typography color="error">{errors.deliveryArea}</Typography>
              )}
            </Stack>
            <TextField
              label="Street"
              name="street"
              value={currentAddress.street}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.street}
              helperText={errors.street}
              fullWidth
            />
            <TextField
              label="Building"
              name="building"
              value={currentAddress.building}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.building}
              helperText={errors.building}
              fullWidth
            />
            <TextField
              label="Floor"
              name="floor"
              value={currentAddress.floor}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.floor}
              helperText={errors.floor}
              fullWidth
            />
            <TextField
              label="Apartment"
              name="apt"
              value={currentAddress.apt}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.apt}
              helperText={errors.apt}
              fullWidth
            />
            <TextField
              label="Delivery Instructions"
              name="deliveryInstructions"
              value={currentAddress.deliveryInstructions}
              onChange={handleInputChange}
              fullWidth
            />
 
          </Stack>
        </DialogContent>
        <Stack direction="row" spacing={1} mt={2} sx={{ "@media (max-width: 700px)": {
          flexDirection:"column !important"
        },}}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleSelectLabel("Home")}
                  sx={{
                    border:
                      currentAddress.label === "Home"
                        ? "2px solid #d32f2f"
                        : "",
                  }}
                >
                  Home
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleSelectLabel("Work")}
                  sx={{
                    border:
                      currentAddress.label === "Work"
                        ? "2px solid #d32f2f"
                        : "",
                  }}
                >
                  Work
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleSelectLabel("Other")}
                  sx={{
                    border:
                      currentAddress.label === "Other"
                        ? "2px solid #d32f2f"
                        : "",
                  }}
                >
                  Other
                </Button>
              </Stack>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddAddress}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
          
        
        </DialogActions>
      </Dialog> */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "60%",
            maxWidth: "none",
            "@media (max-width: 900px)": {
              width: "80%",
            },
            "@media (max-width: 600px)": {
              width: "95%",
            },
          },
        }}
      >
        <DialogTitle>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6">Add New Address</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack>
              <Typography>City</Typography>
              {loadingCities ? (
                <CircularProgress />
              ) : (
                <Select
                  value={selectedCity}
                  onChange={handleCityChange}
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select City
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name_en}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {errors.deliveryCity && (
                <Typography color="error">{errors.deliveryCity}</Typography>
              )}
            </Stack>
            <Stack>
              <Typography>Area</Typography>
              {loadingAreas ? (
                <CircularProgress />
              ) : (
                <Select
                  value={selectedArea}
                  onChange={handleAreaChange}
                  fullWidth
                  displayEmpty
                  disabled={!selectedCity}
                >
                  <MenuItem value="" disabled>
                    Select Area
                  </MenuItem>
                  {areas.map((area) => (
                    <MenuItem key={area.id} value={area.id}>
                      {area.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {errors.deliveryArea && (
                <Typography color="error">{errors.deliveryArea}</Typography>
              )}
            </Stack>
            <TextField
              label="Street"
              name="street"
              value={currentAddress.street}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.street}
              helperText={errors.street}
              fullWidth
            />
            <TextField
              label="Building"
              name="building"
              value={currentAddress.building}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.building}
              helperText={errors.building}
              fullWidth
            />
            <TextField
              label="Floor"
              name="floor"
              value={currentAddress.floor}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.floor}
              helperText={errors.floor}
              fullWidth
            />
            <TextField
              label="Apartment"
              name="apt"
              value={currentAddress.apt}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.apt}
              helperText={errors.apt}
              fullWidth
            />
            <TextField
              label="Delivery Instructions"
              name="deliveryInstructions"
              value={currentAddress.deliveryInstructions}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Label (e.g., Home, Office)"
              name="label"
              value={currentAddress.label}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.label}
              helperText={errors.label}
              fullWidth
            />
          </Stack>
          <Stack
          direction="row"
          spacing={1}
          mt={2}
          sx={{
            "@media (max-width: 700px)": {
              flexWrap:"wrap !important"
            },
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSelectLabel("Home")}
            sx={{
              border:
                currentAddress.label === "Home" ? "2px solid #d32f2f" : "",
            }}
          >
            Home
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSelectLabel("Work")}
            sx={{
              border:
                currentAddress.label === "Work" ? "2px solid #d32f2f" : "",
            }}
          >
            Work
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSelectLabel("Other")}
            sx={{
              border:
                currentAddress.label === "Other" ? "2px solid #d32f2f" : "",
            }}
          >
            Other
          </Button>
        </Stack>
        </DialogContent>
   
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAddress} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default Address;