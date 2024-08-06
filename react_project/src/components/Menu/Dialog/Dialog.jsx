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
import { addItemToCart,setTotalItems } from "../../../rtk/slices/orderSlice.js"; // import your action
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
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
}) {
  

  const description = itemDetails?.description || tempSelectedItemDescription || 'Default Description';
  const image = itemDetails?.image || tempSelectedItemImage || 'default-image.jpg';
const [showOrderNow,setShowOrderNow] = useState(false);
const [orderDetails,setOrderDetails] = useState(null);
  const dispatch = useDispatch();


const totalItems = useSelector((state) => state.cart.totalItems);



const handleAddToCart = () => {
  handleCloseDialog()
  const itemDetailsToAdd = {
    name: itemDetails?.name_en || 'Default Name',
    price: price || tempSelectedItemPrice || 0,
    quantity: 1,
  };

  // Update Redux state
  dispatch(addItemToCart(itemDetailsToAdd));

  // Get existing cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Add the new item to the cart
  cart.push(itemDetailsToAdd);
  
  // Save the updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
};


const [totalPrice, setTotalPrice] = useState(0);
const  handlePriceChange = (price) => {
  setTotalPrice(price);
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
              <CounterDiaolgButton basePrice={10} onChange={handlePriceChange} /> 
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

