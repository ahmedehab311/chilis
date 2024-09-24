// /* eslint-disable react/prop-types */

// import { Card, Stack } from "@mui/material";

// import AddressDialog from "../../../Menu/order/adderess/addressDaiolg/DialogAdderss.jsx";
// import InfoUserCard from "./InfoUserCard.jsx";
// import AddAdderssFromProfile from "./AddAdderssFromProfile.jsx";

// function UserCard({
//   displayedUser,
//   handleClickOpen1,
//   openDialog1,
//   handleClose1,
// }) {
//   return (
//     <Stack
//       sx={{
//         flexGrow: 1,
//         width: "60%",
//         "@media (max-width: 1000px)": {
//           alignItems: "center",
//           justifyContent: "center",
//         },
//       }}
//     >
//       <Card
//         sx={{
//           flexGrow: 1,
//           border: "1px solid #ddd",
//           boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
//           ml: "170px",
//           "@media (max-width: 1000px)": {
//             alignItems: "center",
//             maxWidth: "100%",
//             ml: "0",
//             width: "100%",
//           },
//         }}
//       >
//         <InfoUserCard displayedUser={displayedUser} />
//         <AddAdderssFromProfile handleClickOpen1={handleClickOpen1} />
//         <AddressDialog open={openDialog1} onClose={handleClose1} />
//       </Card>
//     </Stack>
//   );
// }

// export default UserCard;import { Card, Stack } from "@mui/material";
import { Card, Stack } from "@mui/material";

import AddressDialog from "../../../Menu/order/adderess/addressDaiolg/DialogAdderss.jsx";
import InfoUserCard from "./InfoUserCard.jsx";
import AddAdderssFromProfile from "./AdderssInProfile.jsx";
import Address from "../../../Menu/order/adderess/Address"; // تأكد من استيراد مكون Address
import { useState } from "react";

function UserCard({
  displayedUser,
  handleClickOpen1,
  openDialog1,
  handleClose1,
}) {
  const [showAddress, setShowAddress] = useState(false); // حالة للتحكم بين عرض إضافة العنوان أو العنوان

  // دالة لتغيير الحالة بين عرض إضافة العنوان والعنوان
  const handleAddAddress = () => {
    setShowAddress(true); // عند الضغط لفتح إضافة العنوان، قم بتفعيل العنوان
  };

  return (
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
          border: "1px solid #ddd",
          boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
          ml: "170px",
          "@media (max-width: 1000px)": {
            alignItems: "center",
            maxWidth: "100%",
            ml: "0",
            width: "100%",
          },
        }}
      >
        <InfoUserCard displayedUser={displayedUser} />

        <AddAdderssFromProfile handleClickOpen1={handleClickOpen1} />

        <AddressDialog open={openDialog1} onClose={handleClose1}>
          {showAddress ? (
            <Address /> 
          ) : (
            <div>
              <p>No address available. Click to add an address.</p>
              {/* <button onClick={handleAddAddress}>Add Address</button> */}
            </div>
          )}
        </AddressDialog>
      </Card>
    </Stack>
  );
}

export default UserCard;