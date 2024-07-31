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
import { useDispatch } from "react-redux";
// import { addOrder } from "../../../rtk/slices/orderSlice.js";
import { addItemToCart } from "../../../rtk/slices/orderSlice.js"; // import your action

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
  BASE_URL,
  // handleAddToCart,
  ...props
}) {
  console.log("DialogItem Props:", {
    tempSelectedItemImage,
    tempSelectedItemName,
    tempSelectedItemDescription,
    tempSelectedItemPrice,
    itemDetails,
    price,
    dataExtra,
    BASE_URL
  });
  // const name = itemDetails?.name || tempSelectedItemName || 'Default Name';
  const description = itemDetails?.description || tempSelectedItemDescription || 'Default Description';
  const image = itemDetails?.image || tempSelectedItemImage || 'default-image.jpg';

  const dispatch = useDispatch();


  const handleAddToCart = () => {
    // Ensure itemDetails is initialized before using it
    const itemDetails = {
      // name: itemDetails?.name_en || tempSelectedItemName || 'Default Name', // Use optional chaining and fallback values
      price: price || tempSelectedItemPrice || 0,
      // Add other details if needed
    };
  
    console.log("Adding to cart:", itemDetails); // Debugging output
    dispatch(addItemToCart(itemDetails)); // Make sure addItemToCart action creator is imported and used correctly
    handleCloseDialog(); // Close the dialog
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="item-dialog-title"
      aria-describedby="item-dialog-description"
      maxWidth="lg"
      sx={{ border: "2px solid #c0b56e" }}
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
                  {price} EGP
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
                  Option
                </Typography>
                <Typography variant="h6" sx={{ color: "#000" }}>
                  Add on
                </Typography>
                <RadioGroup>
                  {dataExtra.map((extra, index) => (
                    <FormControlLabel
                      key={index}
                      sx={{ color: "#000" }}
                      value={extra.description_en}
                      control={<Radio sx={{ color: "#000" }} />}
                      label={`${extra.description_en} - ${extra.price_en} EGP`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            <AddToCardButton onClick={handleAddToCart} />
          </DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default DialogItem;
