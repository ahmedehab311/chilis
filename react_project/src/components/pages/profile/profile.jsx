// import { Box, Stack } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// // import img from "./user-profile-icon"
// import CardProfile from "./AuthUseProfile.jsx";
// import { Button, Card, Typography } from "@mui/material";
// import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
// import img from "../profile/user-profile-icon.svg";
// import UserInfo from "./userInfo";
// import AddressDialog from "../../Menu/order/adderess/addressDaiolg/DialogAdderss.jsx";
// import AddNewAddressButton from "../../Menu/order/buttons/AddNewAddressButton.jsx";
// const Profile = () => {
//   const BASE_URL = "https://myres.me/chilis/api";
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     user_name: "",
//     email: "",
//     phone: "",
//   });
//   const [openAddressDialog, setOpenAddressDialog] = useState(false); // حالة لإدارة الحوار
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser({
//         user_name: storedUser.user_name,
//         email: storedUser.email,
//         phone: storedUser.phone,
//       });
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const api_token = localStorage.getItem("api_token");

//       const APIURL = `/profile/update?name=${user.user_name}&phone=${user.phone}&email=${user.email}&api_token=${api_token}`;
//       const response = await axios.post(`${BASE_URL}${APIURL}`);

//       if (response.data) {
//         localStorage.setItem("user", JSON.stringify(user));
//         toast.success("Profile updated successfully!");
//       } else {
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       toast.error("Failed to update profile.");
//       console.error("Error updating profile: ", error);
//     }
//   };

//   const handleChangePassword = () => {
//     navigate("/change-password");
//   };
//   // const handleClickOpen = () => setOpen(true);
//   // const handleClose = () => setOpen(false);
//   return (
//     <>
//       <Stack
//         spacing={4}
//         direction={"row"}
//         alignItems="flex-start"
//         justifyContent="center"
//         sx={{
//           mt: "6rem",
//           display: "flex",
//           "@media (max-width: 1000px)": {
//             flexDirection: "column !important",
//             alignItems: "center",
//           },
//         }}
//       >
//         <Stack
//           sx={{
//             flexGrow: 1,
//             width: "60%",
//             "@media (max-width: 1000px)": {
//               alignItems: "center",
//               justifyContent: "center",
//             },
//           }}
//         >
//           <Card
//             sx={{
//               flexGrow: 1,
//               // padding: 2,
//               // padding:" 15px 47px",
//               border: "1px solid #ddd",
//               boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
//               // maxWidth:  "50%" ,
//               // width: "100%",
//               ml: "170px",
//               "@media (max-width: 1000px)": {
//                 alignItems: "center",
//                 maxWidth: "100%",
//                 ml: "0",
//                 width: "100%",
//               },
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 // width: "100%",
//                 marginBottom: 2,
//                 justifyContent: "space-between",
//                 borderBottom: "1px solid #dee2e6",
//                 padding: "2rem",
//                 flexWrap: "wrap",
//                 "@media (max-width:600px)": {
//                   justifyContent: "center",
//                 },
//               }}
//             >
//               <img
//                 src={img}
//                 alt="User"
//                 style={{ borderRadius: "50%", width: "105px", height: "125px" }}
//               />
//               <Box sx={{ marginLeft: 2 }}>
//                 <Stack direction={"row"} alignItems={"center"}>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       // width:"80%",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       fontSize: "2rem",
//                       fontWeight: "600",
//                     }}
//                   >
//                     {user.user_name}
//                     <CheckCircleOutlinedIcon
//                       sx={{ color: "#28a745!important", ml: ".3rem" }}
//                     />
//                   </Typography>
//                 </Stack>

//                 <Typography
//                   variant="body1"
//                   color="textSecondary"
//                   sx={{ fontSize: "1.5rem", fontWeight: "500" }}
//                 >
//                   {user.email}
//                 </Typography>
//               </Box>
//             </Box>

//     {/* <AddNewAddressButton handleClickOpen={handleClickOpen} /> */}
//             <Button
//               onClick={() => setOpenAddressDialog(true)}
//               variant="contained"
//               color="error"
//               className="addNameProfile"
//             >
//               {" "}
//               Add new Address
//             </Button>
//   <AddressDialog open={openAddressDialog} setOpen={setOpenAddressDialog} />
//           </Card>
//         </Stack>
//         <UserInfo
//           handleInputChange={handleInputChange}
//           handleChangePassword={handleChangePassword}
//           handleSave={handleSave}
//           user={user}
//         />
//       </Stack>
//     </>
//   );
// };

// export default Profile;
// 
// 
// 
// 
// 
// 
// import { Box, Stack } from "@mui/material";
// import { Button, Stack } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import CardProfile from "./AuthUseProfile.jsx";
// import UserInfo from "./userInfo";
// import AddressDialog from "../../Menu/order/adderess/addressDaiolg/DialogAdderss.jsx";
// import { API_AREAS, API_CITIES, API_ADD_ADDRESS  } from "../../Menu/order/adderess/apiAdderss.jsx";
// const Profile = () => {
//   const BASE_URL = "https://myres.me/chilis/api";
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     user_name: "",
//     email: "",
//     phone: "",
//   });

//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loadingAreas, setLoadingAreas] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [open, setOpen] = useState(false);
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
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser({
//         user_name: storedUser.user_name,
//         email: storedUser.email,
//         phone: storedUser.phone,
//       });
//     }
//   }, []);

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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const api_token = localStorage.getItem("api_token");
//       const APIURL = `/profile/update?name=${user.user_name}&phone=${user.phone}&email=${user.email}&api_token=${api_token}`;
//       const response = await axios.post(`${BASE_URL}${APIURL}`);
//       if (response.data) {
//         localStorage.setItem("user", JSON.stringify(user));
//         toast.success("Profile updated successfully!");
//       } else {
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       toast.error("Failed to update profile.");
//       console.error("Error updating profile: ", error);
//     }
//   };

//   const handleChangePassword = () => {
//     navigate("/change-password");
//   };

//   const handleSelectLabel = (label) => {
//     setCurrentAddress((prev) => ({ ...prev, label }));
//   };

//   const handleAddAddress = async () => {
//     const requiredFields = [
//       "deliveryCity",
//       "deliveryArea",
//       "street",
//       "building",
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

//     const queryParams = new URLSearchParams({
//       area: currentAddress.deliveryArea,
//       street: currentAddress.street,
//       building: currentAddress.building,
//       floor: currentAddress.floor,
//       apt: currentAddress.apt,
//       name: currentAddress.label,
//       lat: "0",
//       lng: "0",
//       api_token: localStorage.getItem("api_token"),
//     });

//     try {
//       const response = await axios.post(
//         `${API_ADD_ADDRESS}?${queryParams.toString()}`
//       );
//       if (response.data) {
//         toast.success("Address added successfully!");
//         setCurrentAddress({
//           deliveryCity: "",
//           deliveryArea: "",
//           street: "",
//           building: "",
//           floor: "",
//           apt: "",
//           deliveryInstructions: "",
//           label: "",
//         });
//         setErrors({});
//         setOpen(false);
//       } else {
//         throw new Error("Add address failed");
//       }
//     } catch (error) {
//       toast.error("Failed to add address.");
//       console.error("Error adding address:", error);
//     }
//   };

//   const handleDeleteAddress = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/address/delete/${id}`);
//       toast.success("Address deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete address.");
//       console.error("Error deleting address:", error);
//     }
//   };

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleCityChange = (event) => {
//     setSelectedCity(event.target.value);
//     setCurrentAddress((prevAddress) => ({
//       ...prevAddress,
//       deliveryCity: event.target.value,
//       deliveryArea: "",
//     }));
//     setAreas([]);
//   };

//   const handleAreaChange = (event) => {
//     setSelectedArea(event.target.value);
//     setCurrentAddress((prevAddress) => ({
//       ...prevAddress,
//       deliveryArea: event.target.value,
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

//   return (
//     <>
//       <Stack
//         spacing={4}
//         direction={"row"}
//         alignItems="flex-start"
//         justifyContent="center"
//         sx={{
//           mt: "6rem",
//           display: "flex",
//           "@media (max-width: 1000px)": {
//             flexDirection: "column !important",
//             alignItems: "center",
//           },
//         }}
//       >
//         <Stack
//           sx={{
//             flexGrow: 1,
//             width: "60%",
//             "@media (max-width: 1000px)": {
//               alignItems: "center",
//               justifyContent: "center",
//             },
//           }}
//         >
//           <CardProfile user={user} />
//         </Stack>
//         <UserInfo
//           handleInputChange={handleInputChange}
//           handleChangePassword={handleChangePassword}
//           handleSave={handleSave}
//           user={user}
//         />
//       </Stack>
//       <Button variant="contained" color="error" className="addNameProfile" >
//         Add Address
//       </Button>
//       <AddressDialog
//         open={open}
//         // handleClose={handleClose}
//         currentAddress={currentAddress}
//         cities={cities}
//         areas={areas}
//         loadingCities={loadingCities}
//         loadingAreas={loadingAreas}
//         handleCityChange={handleCityChange}
//         handleAreaChange={handleAreaChange}
//         handleInputChange={handleInputChange}
//         handleBlur={handleBlur}
//         errors={errors}
//         handleSelectLabel={handleSelectLabel}
//         handleAddAddress={handleAddAddress}
//       />
//     </>
//   );
// };

// export default Profile;



import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import img from "./user-profile-icon"
import CardProfile from "./AuthUseProfile.jsx";
import { Button, Card, Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import img from "../profile/user-profile-icon.svg";
import UserInfo from "./userInfo";
import AddressDialog from "../../Menu/order/adderess/addressDaiolg/DialogAdderss.jsx";
import AddNewAddressButton from "../../Menu/order/buttons/AddNewAddressButton.jsx";
const Profile = () => {
  const BASE_URL = "https://myres.me/chilis/api";
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    phone: "",
  });
  const [openAddressDialog, setOpenAddressDialog] = useState(false); // حالة لإدارة الحوار
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        user_name: storedUser.user_name,
        email: storedUser.email,
        phone: storedUser.phone,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const api_token = localStorage.getItem("api_token");

      const APIURL = `/profile/update?name=${user.user_name}&phone=${user.phone}&email=${user.email}&api_token=${api_token}`;
      const response = await axios.post(`${BASE_URL}${APIURL}`);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Profile updated successfully!");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile: ", error);
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };
  // const handleClickOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  return (
    <>
      <Stack
        spacing={4}
        direction={"row"}
        alignItems="flex-start"
        justifyContent="center"
        sx={{
          mt: "6rem",
          display: "flex",
          "@media (max-width: 1000px)": {
            flexDirection: "column !important",
            alignItems: "center",
          },
        }}
      >
        <Stack
          sx={{
            flexGrow: 1,
            width: "60%",
            "@media (max-width: 1000px)": {
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <Card
            sx={{
              flexGrow: 1,
              // padding: 2,
              // padding:" 15px 47px",
              border: "1px solid #ddd",
              boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
              // maxWidth:  "50%" ,
              // width: "100%",
              ml: "170px",
              "@media (max-width: 1000px)": {
                alignItems: "center",
                maxWidth: "100%",
                ml: "0",
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // width: "100%",
                marginBottom: 2,
                justifyContent: "space-between",
                borderBottom: "1px solid #dee2e6",
                padding: "2rem",
                flexWrap: "wrap",
                "@media (max-width:600px)": {
                  justifyContent: "center",
                },
              }}
            >
              <img
                src={img}
                alt="User"
                style={{ borderRadius: "50%", width: "105px", height: "125px" }}
              />
              <Box sx={{ marginLeft: 2 }}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography
                    variant="h6"
                    sx={{
                      // width:"80%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "2rem",
                      fontWeight: "600",
                    }}
                  >
                    {user.user_name}
                    <CheckCircleOutlinedIcon
                      sx={{ color: "#28a745!important", ml: ".3rem" }}
                    />
                  </Typography>
                </Stack>

                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ fontSize: "1.5rem", fontWeight: "500" }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>

    {/* <AddNewAddressButton handleClickOpen={handleClickOpen} /> */}
            {/* <Button
              onClick={() => setOpenAddressDialog(true)}
              variant="contained"
              color="error"
              className="addNameProfile"
            >
              {" "}
              Add new Address
            </Button> */}
  <AddressDialog open={openAddressDialog} setOpen={setOpenAddressDialog} />
          </Card>
        </Stack>
        <UserInfo
          handleInputChange={handleInputChange}
          handleChangePassword={handleChangePassword}
          handleSave={handleSave}
          user={user}
        />
      </Stack>
    </>
  );
};

export default Profile;

// import { Box, Stack } from "@mui/material";
// import { Button, Stack } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import CardProfile from "./AuthUseProfile.jsx";
// import UserInfo from "./userInfo";
// import AddressDialog from "../../Menu/order/adderess/addressDaiolg/DialogAdderss.jsx";
// import { API_AREAS, API_CITIES, API_ADD_ADDRESS  } from "../../Menu/order/adderess/apiAdderss.jsx";
// const Profile = () => {
//   const BASE_URL = "https://myres.me/chilis/api";
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     user_name: "",
//     email: "",
//     phone: "",
//   });

//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loadingAreas, setLoadingAreas] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [open, setOpen] = useState(false);
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
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser({
//         user_name: storedUser.user_name,
//         email: storedUser.email,
//         phone: storedUser.phone,
//       });
//     }
//   }, []);

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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const api_token = localStorage.getItem("api_token");
//       const APIURL = `/profile/update?name=${user.user_name}&phone=${user.phone}&email=${user.email}&api_token=${api_token}`;
//       const response = await axios.post(`${BASE_URL}${APIURL}`);
//       if (response.data) {
//         localStorage.setItem("user", JSON.stringify(user));
//         toast.success("Profile updated successfully!");
//       } else {
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       toast.error("Failed to update profile.");
//       console.error("Error updating profile: ", error);
//     }
//   };

//   const handleChangePassword = () => {
//     navigate("/change-password");
//   };

//   const handleSelectLabel = (label) => {
//     setCurrentAddress((prev) => ({ ...prev, label }));
//   };

//   const handleAddAddress = async () => {
//     const requiredFields = [
//       "deliveryCity",
//       "deliveryArea",
//       "street",
//       "building",
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

//     const queryParams = new URLSearchParams({
//       area: currentAddress.deliveryArea,
//       street: currentAddress.street,
//       building: currentAddress.building,
//       floor: currentAddress.floor,
//       apt: currentAddress.apt,
//       name: currentAddress.label,
//       lat: "0",
//       lng: "0",
//       api_token: localStorage.getItem("api_token"),
//     });

//     try {
//       const response = await axios.post(
//         `${API_ADD_ADDRESS}?${queryParams.toString()}`
//       );
//       if (response.data) {
//         toast.success("Address added successfully!");
//         setCurrentAddress({
//           deliveryCity: "",
//           deliveryArea: "",
//           street: "",
//           building: "",
//           floor: "",
//           apt: "",
//           deliveryInstructions: "",
//           label: "",
//         });
//         setErrors({});
//         setOpen(false);
//       } else {
//         throw new Error("Add address failed");
//       }
//     } catch (error) {
//       toast.error("Failed to add address.");
//       console.error("Error adding address:", error);
//     }
//   };

//   const handleDeleteAddress = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/address/delete/${id}`);
//       toast.success("Address deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete address.");
//       console.error("Error deleting address:", error);
//     }
//   };

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleCityChange = (event) => {
//     setSelectedCity(event.target.value);
//     setCurrentAddress((prevAddress) => ({
//       ...prevAddress,
//       deliveryCity: event.target.value,
//       deliveryArea: "",
//     }));
//     setAreas([]);
//   };

//   const handleAreaChange = (event) => {
//     setSelectedArea(event.target.value);
//     setCurrentAddress((prevAddress) => ({
//       ...prevAddress,
//       deliveryArea: event.target.value,
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

//   return (
//     <>
//       <Stack
//         spacing={4}
//         direction={"row"}
//         alignItems="flex-start"
//         justifyContent="center"
//         sx={{
//           mt: "6rem",
//           display: "flex",
//           "@media (max-width: 1000px)": {
//             flexDirection: "column !important",
//             alignItems: "center",
//           },
//         }}
//       >
//         <Stack
//           sx={{
//             flexGrow: 1,
//             width: "60%",
//             "@media (max-width: 1000px)": {
//               alignItems: "center",
//               justifyContent: "center",
//             },
//           }}
//         >
//           <CardProfile user={user} />
//         </Stack>
//         <UserInfo
//           handleInputChange={handleInputChange}
//           handleChangePassword={handleChangePassword}
//           handleSave={handleSave}
//           user={user}
//         />
//       </Stack>
//       <Button variant="contained" color="error" className="addNameProfile" >
//         Add Address
//       </Button>
//       <AddressDialog
//         open={open}
//         // handleClose={handleClose}
//         currentAddress={currentAddress}
//         cities={cities}
//         areas={areas}
//         loadingCities={loadingCities}
//         loadingAreas={loadingAreas}
//         handleCityChange={handleCityChange}
//         handleAreaChange={handleAreaChange}
//         handleInputChange={handleInputChange}
//         handleBlur={handleBlur}
//         errors={errors}
//         handleSelectLabel={handleSelectLabel}
//         handleAddAddress={handleAddAddress}
//       />
//     </>
//   );
// };

// export default Profile;