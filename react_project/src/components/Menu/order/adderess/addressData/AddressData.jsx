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
import { Card, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState, useEffect } from "react";

function AddressData({ handleDeleteAddress, addressData, onAddressSelect }) {
  const [activeIndex, setActiveIndex] = useState(() => {
    // قم بجلب القيمة المخزنة مسبقاً من localStorage عند التحميل الأولي
    const savedIndex = localStorage.getItem("activeIndex");
    return savedIndex !== null ? parseInt(savedIndex, 10) : null;
  });

  useEffect(() => {
    if (activeIndex !== null && !isNaN(activeIndex) && addressData[activeIndex]) {
      const selectedAddressId = addressData[activeIndex].id;
      // console.log("Selected Address ID:", selectedAddressId);

      // تحديث القيمة في localStorage
      localStorage.setItem("activeIndex", activeIndex.toString());

      onAddressSelect(selectedAddressId);
    }
  }, [activeIndex, addressData, onAddressSelect]);

  const handleCardClick = (index) => {
    if (Number.isInteger(index) && index >= 0 && index < addressData.length) {
      setActiveIndex(index);
    } else {
      console.error("Invalid index:", index);
    }
  };

  return (
    <>
      {addressData.length > 0 ? (
        addressData.map((address, index) => (
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
                {address.address_name}
              </Typography>
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
                  {address.area.area_name_en},{address.city.name_en},Building:{" "}
                  {address.building} - Floor: {address.floor}
                  <br />
                </Typography>
              </Stack>
              <Stack
                fontSize="22px"
                direction={"row"}
                alignItems={"center"}
                sx={{
                  justifyContent: "space-between",
                  border: "1px solid #dc3545",
                  fontSize: "1.2rem",
                  p: ".8rem 1.5rem",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    "& .MuiSvgIcon-root": {
                      color: "#fff",
                    },
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling to Card
                  handleDeleteAddress(address.id);
                }}
              >
                <Typography
                  sx={{
                    pr: 2,
                    fontSize: "1.7rem",
                    color: "#000",
                    fontWeight: "500",
                    lineHeight: "1.2",
                  }}
                >
                  Delete
                </Typography>
                <DeleteOutlineOutlinedIcon
                  sx={{
                    fontSize: "2rem",
                    color: "#000",
                    fontWeight: "500",
                    lineHeight: "1.2",
                  }}
                />
              </Stack>
            </Stack>
          </Card>
        ))
      ) : (
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            lineHeight: "1.2",
          }}
        >
          No address found ...
        </Typography>
      )}
    </>
  );
}

export default AddressData;
