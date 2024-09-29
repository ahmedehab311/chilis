// import { Typography, Stack } from "@mui/material";
// import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

// function AddAdderssFromProfile({ handleClickOpen1 }) {
//   return (
//     <Stack
//       sx={{
//         cursor: "pointer",
//         padding: 2,
//         borderTop: "1px solid #dee2e6",
//         borderBottom: "1px solid #dee2e6",
//       }}
//       onClick={handleClickOpen1}
//     >
//       <Typography
//         sx={{
//           fontSize: "1.8rem",
//           textTransform: "capitalize",
//           fontWeight: "600",
//           color: "#343a40 !important",
//           textAlign: "left",
//         }}
//       >
//         address
//       </Typography>
//       <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
//         <Typography
//           sx={{
//             fontSize: "1.6rem",
//             textTransform: "",
//             fontWeight: "600",
//             color: "#6c757d!important",
//             textAlign: "left",
//           }}
//         >
//           Add or remove a delivery address
//         </Typography>
//         <ArrowForwardIosOutlinedIcon
//           sx={{
//             fontSize: "2rem",
//             animation: "moveRight 0.9s infinite",
//             "@keyframes moveRight": {
//               "0%": {
//                 transform: "translateX(0)",
//               },
//               "50%": {
//                 transform: "translateX(10px)",
//               },
//               "100%": {
//                 transform: "translateX(0)",
//               },
//             },
//           }}
//         />
//       </Stack>
//     </Stack>
//   );
// }

// export default AddAdderssFromProfile;

import { useState } from "react";
import { Typography, Stack, Dialog, DialogContent } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Address from "../../../Menu/order/adderess/Address";
import { useTranslation } from "react-i18next";

function AdderssInProfile() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [openAddressListDialog, setOpenAddressListDialog] = useState(false);

  const handleOpenAddressListDialog = () => {
    setOpenAddressListDialog(true);
  };

  const handleCloseAddressListDialog = () => {
    setOpenAddressListDialog(false);
  };

  return (
    <>
      <Stack
        sx={{
          cursor: "pointer",
          padding: 2,
          borderTop: "1px solid #dee2e6",
          borderBottom: "1px solid #dee2e6",
        }}
        onClick={handleOpenAddressListDialog}
      >
        <Typography
          sx={{
            fontSize: "1.8rem",
            textTransform: "capitalize",
            fontWeight: "600",
            color: "#343a40 !important",
            textAlign: "left",
          }}
        >
         {t('address.Addresses')}
        </Typography>
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontSize: "1.6rem",
              textTransform: "",
              fontWeight: "600",
              color: "#6c757d!important",
              textAlign: "left",
            }}
          >
             {t('address.addOrRemoveAddress')}
          </Typography>
          <ArrowForwardIosOutlinedIcon
            sx={{
              fontSize: "2rem",
              animation: "moveRight 0.9s infinite",
              "@keyframes moveRight": {
                "0%": {
                  transform: "translateX(0)",
                },
                "50%": {
                  transform: "translateX(10px)",
                },
                "100%": {
                  transform: "translateX(0)",
                },
              },
            }}
          />
        </Stack>
      </Stack>

      <Dialog
        open={openAddressListDialog}
        onClose={handleCloseAddressListDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <Stack spacing={2}>
            <Address />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdderssInProfile;
