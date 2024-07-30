/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./Dialog.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  RadioGroup,
  FormControlLabel,
  TextField,
  Radio,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { CounterDiaolgButton, AddToCardButton } from "../index";
import { useCart } from "../../hooks/CardContext";
function DialogItem({
  openDialog,
  handleCloseDialog,
  tempSelectedItemImage,
  tempSelectedItemName,
  tempSelectedItemPrice,
  tempSelectedItemDescription,
  itemDetails,
  price,
  dataExtra,
  BASE_URL
  // handleAddToCart
}) {


  return (
    <Dialog
    open={openDialog}
    onClose={handleCloseDialog}
    aria-labelledby="item-dialog-title"
    aria-describedby="item-dialog-description"
    maxWidth="lg"
    sx={{border:"2px solid #c0b56e"}}
  >
    {itemDetails && (
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Box>
          <img
            src={`${BASE_URL}${itemDetails.image}`}
            alt={itemDetails.name_en}
            width={300}
            height={200}
            className="imgDialog"
          />
        </Box>
        <DialogContentText id="item-dialog-description" sx={{ mx: 3 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <DialogTitle id="item-dialog-title">
              {itemDetails.name_en}
            </DialogTitle>
            <Stack direction={"row"} alignItems={"center"}>
              <CounterDiaolgButton />
              <span style={{ color: "#000", fontSize: "12px" }}>
                {price}EGP
              </span>
            </Stack>
          </Stack>
          <div className="borderItem"></div>
          <Typography variant="body1" sx={{ mb: 2, color: "#000" }}>
            {itemDetails.description_en}
          </Typography>

          {dataExtra && dataExtra.length > 0 && (
            <FormControl component="fieldset">
              <Typography variant="h6" sx={{ color: "#000" }}>
            option
              </Typography>
              <Typography variant="h6" sx={{ color: "#000" }}>
            Add one
              </Typography>
              <RadioGroup>
                {dataExtra.map((extra, index) => (
                  <FormControlLabel
                    key={index}
                    sx={{ color: "#000" }}
                    value={extra.description_en}
                    control={<Radio sx={{ color: "#000" }} />}
                    label={extra.description_en}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
      
        </DialogContentText>
     
             <AddToCardButton onClick={handleAddToCart} />
     
      </DialogContent>
    )}
  </Dialog>
  );
}

export default DialogItem;



/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import "./Dialog.css";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   TextField,
//   Radio,
//   Box,
//   Typography,
//   Stack,
// } from "@mui/material";
// import { CounterDiaolgButton, AddToCardButton } from "../index";
// import { useCart } from "../../hooks/CardContext";

// function DialogItem({
//   openDialog,
//   handleCloseDialog,
//   tempSelectedItemImage,
//   tempSelectedItemName,
//   tempSelectedItemPrice,
//   tempSelectedItemDescription,
//   extras,
//   extra,
//   PriceExtra,
//   extra2,
//   PriceExtra2,
//   extra3,
//   PriceExtra3,
//   // extras,
//   ...props
// }) {
//   const { addToCart } = useCart();
//   const handleAddToCart = () => {
//     const item = {
//       id: props.tempSelectedItemId,
//       name: props.tempSelectedItemName,
//       quantity: 1,
//       price: props.tempSelectedItemPrice,
//       extras: extras.map((extra) => ({
//         name: extra.category,
//         options: extra.options.map((option) => ({
//           name: option.description,
//           price: option.price,
//         })),
//       })),
//     };

//     addToCart(item);
//     handleCloseDialog();
//   };

//   return (
//     <Dialog
//       open={openDialog}
//       onClose={handleCloseDialog}
//       aria-labelledby="item-dialog-title"
//       aria-describedby="item-dialog-description"
//       maxWidth="lg"
//       sx={{ border: "2px solid #c0b56e" }}
//     >
//       <DialogContent
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mb: 2,
//         }}
//       >
//         <Box>
//           <Stack>
//             <img
//               src={tempSelectedItemImage}
//               alt={tempSelectedItemName}
//               width={300}
//               height={200}
//               className="imgDialog"
//             />
//           </Stack>
//         </Box>
//         <DialogContentText id="item-dialog-description" sx={{ mx: 3 }}>
//           <Stack
//             direction={"row"}
//             alignItems={"center"}
//             justifyContent={"space-between"}
//           >
//             <DialogTitle id="item-dialog-title">
//               {tempSelectedItemName}
//             </DialogTitle>
//             <Stack direction={"row"} alignItems={"center"}>
//               <CounterDiaolgButton />
//               <span style={{ color: "#000", fontSize: "12px" }}>
//                 {tempSelectedItemPrice
//                   ? `${tempSelectedItemPrice} EGP`
//                   : "Price not available"}
//               </span>
//             </Stack>
//           </Stack>
//           <div className="borderItem"></div>
//           <Typography
//             variant="h5"
//             sx={{ mb: 2, color: "#000", fontFamily: "uniform" }}
//           >
//             {tempSelectedItemDescription}
//           </Typography>
//           <Stack>
//             <FormControl component="fieldset">
//               <Typography variant="h6" sx={{ color: "#000" }}>
//                 Any special request?
//               </Typography>
//             </FormControl>
//             <TextField
//               multiline
//               rows={2}
//               variant="outlined"
//               fullWidth
//               sx={{ mt: 0, mb: 1 }}
//             />
//             <Stack>
//               <Typography
//                 variant="h6"
//                 sx={{ color: "#000", textAlign: "left" }}
//               >
//                 Option
//               </Typography>
           
//                 <Box  sx={{ mb: 1 }}>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: "#000",
//                       textTransform: "capitalize",
//                       textAlign: "left",
//                     }}
//                   >
//                     {extra.category}
//                   </Typography>
//                   <RadioGroup sx={{ display: "flex " }}>
//                     <FormControlLabel
//                       sx={{ color: "#000" }}
//                       value="extra1"
//                       control={<Radio sx={{ color: "#000" }} />}
//                       label={`${extra} ${PriceExtra}`}
//                     />
//                     <FormControlLabel
//                       sx={{ color: "#000" }}
//                       value="extra2"
//                       control={<Radio sx={{ color: "#000" }} />}
//                       label={`${extra2} ${PriceExtra2}`}
//                     />
//                     <FormControlLabel
//                       sx={{ color: "#000" }}
//                       value="extra3"
//                       control={<Radio sx={{ color: "#000" }} />}
//                       label={`${extra3} ${PriceExtra3}`}
//                     />
//                   </RadioGroup>
//                 </Box>
          
//             </Stack>
//             <AddToCardButton onClick={handleAddToCart} />
//           </Stack>
//         </DialogContentText>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default DialogItem;
