/* eslint-disable react/prop-types */
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
// import AddressDialog from "../../Menu/order/adderess/addressDaiolg/DialogAdderss";

function CardProfile({user}) {
 
  
  return (
    <Card
      sx={{
        padding: 2,
        maxWidth: 300,
        width: "50%",
        mr: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: 2,
          justifyContent: "space-between",
        }}
      >
        <img
          src="user-profile-icon.png"
          alt="User"
          style={{ borderRadius: "50%", width: "80px", height: "80px" }}
        />
        <Box sx={{ marginLeft: 2 }}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              {user.user_name}
              <CheckCircleOutlinedIcon sx={{ color: "#28a745!important" }} />
            </Typography>
          </Stack>

          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ fontSize: "1.1rem", fontWeight: "500" }}
          >
            {user.email}
          </Typography>
        </Box>
      </Box>
      {/* <Button variant="contained" color="error">
        Add Address
      </Button> */}
 
    </Card>
  );
}

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
