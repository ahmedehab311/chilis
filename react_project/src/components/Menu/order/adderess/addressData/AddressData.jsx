/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { Card, Stack, Typography } from "@mui/material";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import { useState } from "react";
// function AddressData({ handleDeleteAddress, addressData }) {
//   const [activeIndex, setActiveIndex] = useState(null);

//   return (
//     <>
//       {addressData.length > 0 ? (
//         addressData.map((address, index) => (
//           <Card
//             key={index}
//             sx={{
//               mb: 3,

//               border: activeIndex === index ? "2px solid #d32f2f" : "none",
//             }}
//             onClick={() => setActiveIndex(index)}
//           >
//             <Stack sx={{ background: "#f8f9fa!important", p: 2}}>
//               <Typography
//                 sx={{
//                   fontSize: "1.4rem",
//                   fontWeight: "500",
//                   lineHeight: "1.2",
//                 }}
//               >
//                 {address.address_name}
//               </Typography>
//             </Stack>
//             <Stack
//               sx={{ display: "flex", p: ".5rem",justifyContent:"space-between", }}
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
//                   {address.building}, {address.street},
//                   {address.area.area_name_en},{address.city.name_en},Building:{" "}
//                   {address.building} - Floor: {address.floor}
//                   {/* Apt: {address.apt} */}
//                   <br />
//                   {/* Instructions: {address.deliveryInstructions} */}
//                 </Typography>
//               </Stack>
//               <Stack

//                 fontSize="22px"
//                 direction={"row"}
//                 alignItems={"center"}
//                 sx={{
//                   justifyContent:"space-between",
//                   border: "1px solid #dc3545",
//                   fontSize: "1.2rem",
//                   p: ".8rem 1.5rem",
//                   cursor: "pointer",
//                   "&:hover": {
//                     backgroundColor: "#dc3545",
//                     color: "#fff",
//                     "& .MuiSvgIcon-root": {
//                       color: "#fff",
//                     },
//                   },
//                 }}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent event bubbling to Card
//                   handleDeleteAddress(address.id);
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     pr: 2,
//                     fontSize: "1.7rem",
//                     color: "#000",
//                     fontWeight: "500",
//                     lineHeight: "1.2",
//                     // p: ".6rem .8rem",
//                     p: ".6rem .8rem !important",
//                   }}
//                 >
//                   Delete
//                 </Typography>
//                 <DeleteOutlineOutlinedIcon
//                   sx={{
//                     fontSize: "2rem",
//                     color: "#000",
//                     fontWeight: "500",
//                     lineHeight: "1.2",
//                   }}
//                 />
//               </Stack>
//             </Stack>
//           </Card>
//         ))
//       ) : (
//         <Typography
//           sx={{
//             fontSize: "1.2rem",
//             fontWeight: "bold",
//             lineHeight: "1.2",
//           }}
//         >
//           {/* No address found ... */}
//         </Typography>
//       )}
//     </>
//   );
// }

// export default AddressData;

// import { Card, Stack, Typography } from "@mui/material";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import { useState, useEffect } from "react";

// function AddressData({ handleDeleteAddress, addressData, onAddressSelect }) {
//   const [activeIndex, setActiveIndex] = useState(() => {
//     // قم بجلب القيمة المخزنة مسبقاً من localStorage عند التحميل الأولي
//     const savedIndex = localStorage.getItem("activeIndex");
//     return savedIndex !== null ? parseInt(savedIndex, 10) : null;
//   });

//   useEffect(() => {
//     if (activeIndex !== null && !isNaN(activeIndex) && addressData[activeIndex]) {
//       const selectedAddressId = addressData[activeIndex].id;
//       // console.log("Selected Address ID:", selectedAddressId);

//       // تحديث القيمة في localStorage
//       localStorage.setItem("activeIndex", activeIndex.toString());

//       onAddressSelect(selectedAddressId);
//     }
//   }, [activeIndex, addressData, onAddressSelect]);

//   const handleCardClick = (index) => {
//     if (Number.isInteger(index) && index >= 0 && index < addressData.length) {
//       setActiveIndex(index);
//     } else {
//       console.error("Invalid index:", index);
//     }
//   };

//   return (
//     <>
//       {addressData.length > 0 ? (
//         addressData.map((address, index) => (
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
//                 {address.address_name}
//               </Typography>
//             </Stack>
//             <Stack
//               sx={{
//                 display: "flex",
//                 p: ".5rem",
//                 justifyContent: "space-between",
//               }}
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
//                   {address.building}, {address.street},
//                   {address.area.area_name_en},{address.city.name_en},Building:
//                   {address.building} - Floor: {address.floor}
//                   <br />
//                 </Typography>
//               </Stack>
//               <Stack
//                 fontSize="22px"
//                 direction={"row"}
//                 alignItems={"center"}
//                 sx={{
//                   justifyContent: "space-between",
//                   border: "1px solid #dc3545",
//                   fontSize: "1.2rem",
//                   p: ".8rem 1.5rem",
//                   cursor: "pointer",
//                   "&:hover": {
//                     backgroundColor: "#dc3545",
//                     color: "#fff",
//                     "& .MuiSvgIcon-root": {
//                       color: "#fff",
//                     },
//                   },
//                 }}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent event bubbling to Card
//                   handleDeleteAddress(address.id);
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     pr: 2,
//                     fontSize: "1.7rem",
//                     color: "#000",
//                     fontWeight: "500",
//                     lineHeight: "1.2",
//                   }}
//                 >
//                   Delete
//                 </Typography>
//                 <DeleteOutlineOutlinedIcon
//                   sx={{
//                     fontSize: "2rem",
//                     color: "#000",
//                     fontWeight: "500",
//                     lineHeight: "1.2",
//                   }}
//                 />
//               </Stack>
//             </Stack>
//           </Card>
//         ))
//       ) : (
//         <Typography
//           sx={{
//             fontSize: "1.2rem",
//             fontWeight: "bold",
//             lineHeight: "1.2",
//           }}
//         >
//           {/* No address found ... */}
//         </Typography>
//       )}
//     </>
//   );
// }

// export default AddressData;

// import { Card, Stack, Typography } from "@mui/material";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import { useState, useEffect } from "react";

// function AddressData({ handleDeleteAddress, addressData, unavailableAddresses, onAddressSelect }) {
//   const [activeIndex, setActiveIndex] = useState(() => {
//     const savedIndex = localStorage.getItem("activeIndex");
//     return savedIndex !== null ? parseInt(savedIndex, 10) : null;
//   });

//   useEffect(() => {
//     if (activeIndex !== null && !isNaN(activeIndex) && addressData[activeIndex]) {
//       const selectedAddressId = addressData[activeIndex].id;
//       localStorage.setItem("activeIndex", activeIndex.toString());
//       onAddressSelect(selectedAddressId);
//     }
//   }, [activeIndex, addressData, onAddressSelect]);

//   const isAddressAvailable = (address) => {
//     const now = new Date();
//     const hours = now.getHours(); // ساعة من 0 إلى 23
//     const minutes = now.getMinutes(); // دقيقة من 0 إلى 59
//     const seconds = now.getSeconds(); // ثانية من 0 إلى 59

//     // الوقت الحالي بتنسيق HH:MM:SS
//     const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

//     console.log(`Current time (HH:MM:SS): ${currentTime}`);

//     let isAvailable = false;

//     address.branches.forEach((branch) => {
//       // تسجيل بيانات الفرع في الكونسول للتحقق
//       console.log(`Checking branch: ${branch.address_en}`);
//       console.log(`Open: ${branch.open}, Last Delivery: ${branch.last_delivery}`);

//       // تحويل أوقات الفتح والإغلاق إلى دقائق
//       const [openHour, openMinute] = branch.open.split(':').map(Number);
//       const [deliveryHour, deliveryMinute] = branch.last_delivery.split(':').map(Number);

//       // تحويل أوقات الفتح والإغلاق إلى وقت بتنسيق HHMM
//       const branchOpenMinutes = openHour * 100 + openMinute;
//       const branchLastDeliveryMinutes = deliveryHour * 100 + deliveryMinute;

//       // تحويل الوقت الحالي إلى دقائق
//       const currentTimeMinutes = hours * 100 + minutes;

//       console.log(`Branch open minutes: ${branchOpenMinutes}, Branch last delivery minutes: ${branchLastDeliveryMinutes}`);
//       console.log(`Current time minutes: ${currentTimeMinutes}`);

//       // التحقق مما إذا كان الوقت الحالي ضمن نطاق أوقات الفتح والتوصيل
//       if (currentTimeMinutes >= branchOpenMinutes && currentTimeMinutes <= branchLastDeliveryMinutes) {
//         isAvailable = true;
//       }
//     });

//     return isAvailable;
//   };

//   const handleCardClick = (index) => {
//     if (Number.isInteger(index) && index >= 0 && index < addressData.length) {
//       const address = addressData[index];
//       console.log(`Selected address: ${address.address_name}`);

//       const isAvailable = isAddressAvailable(address);
//       console.log(`Is address available: ${isAvailable}`);

//       if (isAvailable) {
//         setActiveIndex(index);
//       } else {
//         console.log("Address is not available for delivery.");
//       }
//     } else {
//       console.error("Invalid index:", index);
//     }
//   };

//   return (
//     <>
//       {addressData.length > 0 ? (
//         addressData.map((address, index) => {
//           // تحقق من أن unavailableAddresses هو مصفوفة
//           const isAvailable = (Array.isArray(unavailableAddresses) && !unavailableAddresses.includes(address.id)) && isAddressAvailable(address);

//           return (
//             <Card
//               key={index}
//               sx={{
//                 mb: 3,
//                 border: activeIndex === index ? "2px solid #d32f2f" : "none",
//                 backgroundColor: isAvailable ? "#fff" : "#f8d7da", // تغيير لون الخلفية إذا كان العنوان غير متاح
//               }}
//               // onClick={() => isAvailable && handleCardClick(index)} // السماح بالنقر فقط إذا كان العنوان متاح
//               onClick={handleCardClick(index)} // السماح بالنقر فقط إذا كان العنوان متاح
//             >
//               <Stack sx={{ background: "#f8f9fa!important", p: 2 }}>
//                 <Typography
//                   sx={{
//                     fontSize: "1.4rem",
//                     fontWeight: "500",
//                     lineHeight: "1.2",
//                   }}
//                 >
//                   {address.address_name}
//                 </Typography>
//               </Stack>
//               <Stack
//                 sx={{
//                   display: "flex",
//                   p: ".5rem",
//                   justifyContent: "space-between",
//                 }}
//                 direction={"row"}
//                 alignItems={"center"}
//               >
//                 <Stack sx={{ p: "1.5rem" }}>
//                   <Typography
//                     sx={{
//                       display: "flex",
//                       color: "#6c757d!important",
//                       fontSize: "1.3rem",
//                       fontWeight: "500",
//                       lineHeight: "1.2",
//                       textTransform: "capitalize",
//                     }}
//                   >
//                     {address.building}, {address.street},
//                     {address.area.area_name_en},{address.city.name_en},Building:
//                     {address.building} - Floor: {address.floor}
//                     <br />
//                     {!isAvailable && (
//                       <Typography sx={{ color: "#d32f2f", fontSize: "1.2rem" }}>
//                         هذا العنوان غير متاح حالياً للتوصيل.
//                       </Typography>
//                     )}
//                   </Typography>
//                 </Stack>
//                 <Stack
//                   fontSize="22px"
//                   direction={"row"}
//                   alignItems={"center"}
//                   sx={{
//                     justifyContent: "space-between",
//                     mr: 2,
//                     display: "flex",
//                   }}
//                 >
//                   <DeleteOutlineOutlinedIcon
//                     sx={{
//                       cursor: "pointer",
//                       color: "#d32f2f",
//                       "&:hover": { color: "#a30000" },
//                     }}
//                     onClick={(event) => {
//                       event.stopPropagation(); // لمنع النقر على أيقونة الحذف من تفعيل العنصر
//                       handleDeleteAddress(address.id);
//                     }}
//                   />
//                 </Stack>
//               </Stack>
//             </Card>
//           );
//         })
//       ) : (
//         <Typography>No addresses available</Typography>
//       )}
//     </>
//   );
// }

// export default AddressData;
import { Card, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState, useEffect } from "react";

function AddressData({
  handleDeleteAddress,
  addressData,
  unavailableAddresses,
  onAddressSelect,
}) {
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = localStorage.getItem("activeIndex");
    return savedIndex !== null ? parseInt(savedIndex, 10) : null;
  });

  useEffect(() => {
    if (
      activeIndex !== null &&
      !isNaN(activeIndex) &&
      addressData[activeIndex]
    ) {
      const selectedAddressId = addressData[activeIndex].id;
      localStorage.setItem("activeIndex", activeIndex.toString());
      onAddressSelect(selectedAddressId);
    }
  }, [activeIndex, addressData, onAddressSelect]);

  const isAddressAvailable = (address) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const currentTimeMinutes = hours * 60 + minutes;

    let isAvailable = false;
  if (address && Array.isArray(address.branches)) {
    address.branches.forEach((branch) => {
      console.log(`Checking branch: ${branch.address_en}`);
      console.log(
        `Open: ${branch.open}, Last Delivery: ${branch.last_delivery}`
      );
  
      const [openHour, openMinute] = branch.open.split(":").map(Number);
      const [deliveryHour, deliveryMinute] = branch.last_delivery
        .split(":")
        .map(Number);
  
      const branchOpenMinutes = openHour * 60 + openMinute;
      const branchLastDeliveryMinutes = deliveryHour * 60 + deliveryMinute;
  
      if (branchLastDeliveryMinutes < branchOpenMinutes) {
        if (
          currentTimeMinutes >= branchOpenMinutes ||
          currentTimeMinutes <= branchLastDeliveryMinutes
        ) {
          isAvailable = true;
        }
      } else {
        if (
          currentTimeMinutes >= branchOpenMinutes &&
          currentTimeMinutes <= branchLastDeliveryMinutes
        ) {
          isAvailable = true;
        }
      }
    });
  } else {
    console.error("Branches data is missing or invalid.");
  }
  
  return isAvailable;
}

  const handleCardClick = (index) => {
    if (Number.isInteger(index) && index >= 0 && index < addressData.length) {
      const address = addressData[index];
      console.log(`Selected address: ${address.address_name}`);

      const isAvailable = isAddressAvailable(address);
      // console.log(`Is address available: ${isAvailable}`);

      if (isAvailable) {
        setActiveIndex(index);
      } else {
        console.log("Address is not available for delivery.");
      }
    } else {
      console.error("Invalid index:", index);
    }
  };

  // الدالة التي تتحقق من التوفر ثم تستدعي handleCardClick
  const handleClick = (index) => () => {
    const address = addressData[index];
    if (isAddressAvailable(address)) {
      handleCardClick(index);
    }
  };


  return (
    <>
      {addressData.length > 0 ? (
        addressData.map((address, index) => {
          const isAvailable = (Array.isArray(unavailableAddresses) && !unavailableAddresses.includes(address.id)) && isAddressAvailable(address);
          console.log(`Address: ${address.address_name}, isAvailable: ${isAvailable}`);

          

          return (
            <Card
              key={index}
              sx={{
                mb: 3,
                border: activeIndex === index ? "2px solid #d32f2f" : "none",
                backgroundColor: isAvailable ? "#fff" : "#f8d7da", 
              }}
              onClick={handleClick(index)}
            >
              <Stack direction={"row"} alignItems={"center"} sx={{ justifyContent:"space-between", background: "#f8f9fa!important", p: 2 }}>
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    lineHeight: "1.2",
                  }}
                >
                  {address.address_name}
                </Typography>
                 <br />
                    {!isAvailable && (
                      <Typography sx={{ color: "#d32f2f", fontSize: "1.2rem",ml:"2rem" }}>
                      This address is currently unavailable for delivery.
                      </Typography>
                    )}
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  p: ".5rem",
                  justifyContent: "space-between",
                }}
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
                    {address.building}, {address.street},
                    {address.area.area_name_en},{address.city.name_en},Building:
                    {address.building} - Floor: {address.floor}
                   
                  </Typography>
                </Stack>
                <Stack
                  fontSize="22px"
                  direction={"row"}
                  alignItems={"center"}
                  sx={{
                    justifyContent: "space-between",
                    mr: 2,
                    display: "flex",
                  }}
                >
                  <DeleteOutlineOutlinedIcon
                    sx={{
                      cursor: "pointer",
                      color: "#d32f2f",
                      "&:hover": { color: "#a30000" },
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteAddress(address.id);
                    }}
                  />
                </Stack>
              </Stack>
            </Card>
          );
        })
      ) : (
        <Typography>
        {/* No addresses available */}
        </Typography>
      )}
    </>
  );
  
}

export default AddressData;
