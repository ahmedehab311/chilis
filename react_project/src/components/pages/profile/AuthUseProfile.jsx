/* eslint-disable react/prop-types */
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import img from "../profile/user-profile-icon.svg"
import { useState } from "react";
function CardProfile({user}) {
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
  const [errors, setErrors] = useState({});
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

  return (
    <Card

      sx={{
        flexGrow: 1,
        // padding: 2,
        // padding:" 15px 47px",
        border: "1px solid #ddd",
        boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
        // maxWidth:  "50%" ,
          // width: "100%",
        ml:"170px" ,
        "@media (max-width: 1000px)": {
          alignItems: "center",
        maxWidth:  "100%" ,
        ml:"0" ,
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
          borderBottom:"1px solid #dee2e6",
          padding:"2rem",
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
              <CheckCircleOutlinedIcon sx={{ color: "#28a745!important",    ml:".3rem" }} />
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
   
      <Button variant="contained" color="error" className="addNameProfile" >
        Add Address
      </Button>

    </Card>
  );
}
  {/* <CardProfile user={user} /> */}
export default CardProfile;

// import { useState } from "react";
// import { Box, Button, Card, Stack, Typography } from "@mui/material";
// import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
// import AddressDialog from "../../Menu/order/adderess/addressDaiolg/DialogAdderss";
// // يمكن إضافة هذا السطر لو كان لديك ملف فرعي يحتوي على الدالة getCities وغيرها من البيانات
// // import { getCities, getAreas, handleCityChange, handleAreaChange, handleInputChange, handleBlur, handleSelectLabel, handleAddAddress } from '../../path/to/your/hooks';

// function CardProfile({ user }) {
//   const [openDialog, setOpenDialog] = useState(false);
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
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loadingAreas, setLoadingAreas] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);

//   // تأكد من أن هذه الدوال توفر القيم والوظائف اللازمة
//   const handleCityChange = (event) => { /* المنطق هنا */ };
//   const handleAreaChange = (event) => { /* المنطق هنا */ };
//   const handleInputChange = (e) => { /* المنطق هنا */ };
//   const handleBlur = (e) => { /* المنطق هنا */ };
//   const handleSelectLabel = (label) => { /* المنطق هنا */ };
//   const handleAddAddress = async () => { /* المنطق هنا */ };

//   return (
//     <Card
//       sx={{
//         padding: 2,
//         maxWidth: 300,
//         width: "50%",
//         mr: "5rem",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           width: "100%",
//           marginBottom: 2,
//           justifyContent: "space-between",
//         }}
//       >
//         <img
//           src="user-profile-icon.png"
//           alt="User"
//           style={{ borderRadius: "50%", width: "80px", height: "80px" }}
//         />
//         <Box sx={{ marginLeft: 2 }}>
//           <Stack direction={"row"} alignItems={"center"}>
//             <Typography
//               variant="h6"
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: "1.5rem",
//                 fontWeight: "600",
//               }}
//             >
//               {user.user_name}
//               <CheckCircleOutlinedIcon sx={{ color: "#28a745!important" }} />
//             </Typography>
//           </Stack>

//           <Typography
//             variant="body1"
//             color="textSecondary"
//             sx={{ fontSize: "1.1rem", fontWeight: "500" }}
//           >
//             {user.email}
//           </Typography>
//         </Box>
//       </Box>
//       <Button variant="contained" color="error" onClick={handleOpenDialog}>
//         Add Address
//       </Button>
//       <AddressDialog
//         open={openDialog}
//         handleClose={handleCloseDialog}
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
//     </Card>
//   );
// }

// export default CardProfile;
