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
  Radio,
  Box,
  Typography,
  Stack,
  Checkbox,
} from "@mui/material";
import { CounterDiaolgButton, AddToCardButton } from "../index";
import {
  addItemToCart,
  updateItemQuantity,
  updateCartItems,
} from "../../../rtk/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function DialogItem({
  openDialog,
  handleCloseDialog,
  itemDetails,
  price,
  dataExtra,
  dataOptions,
  BASE_URL_images,
  selectedExtras,
  setSelectedExtras,
  selectedOption,
  setSelectedOption,
  quantity,
  setQuantity,
  selectedOptionName,
  setSelectedOptionName,
  ...props
}) {
  const dispatch = useDispatch();

  // const [selectedExtras, setSelectedExtras] = useState([]);
  // const [selectedOption, setSelectedOption] = useState("");
  // const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state) => state.cart.items);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    handleCloseDialog();

    // const itemDetailsToAdd = {
    //   uniqueId: uuidv4(),
    //   id: itemDetails.id,
    //   name: itemDetails.name_en,
    //   price: parseFloat(price),
    //   quantity: quantity,
    //   extras: selectedExtras.map(extra => ({
    //     id: extra.id,
    //     name: extra.description_en,
    //     price: parseFloat(extra.price_en),
    //   })),
    //   option: selectedOption ? {
    //     id: selectedOption.id,
    //     name: selectedOption.name_en,
    //   } : null,
    //   totalPrice: (parseFloat(price) || 0) + selectedExtras.reduce(
    //     (sum, extra) => sum + parseFloat(extra.price_en),
    //     0
    //   ),
    // };

    const itemDetailsToAdd = {
      uniqueId: uuidv4(),
      id: itemDetails.id,
      name: itemDetails.name_en,
      price: parseFloat(price),
      quantity: quantity,
      extras: selectedExtras.map((extra) => ({
        id: extra.id,
        name: extra.description_en,
        price: parseFloat(extra.price_en),
      })),
      option: selectedOption
        ? {
            id: selectedOption.id,
            name: selectedOption.name_en,
          }
        : null,
      totalPrice:
        (parseFloat(price) || 0) +
        selectedExtras.reduce(
          (sum, extra) => sum + parseFloat(extra.price_en),
          0
        ),
    };
    // console.log("Item to add:", itemDetailsToAdd);

    // إضافة العنصر الجديد للسلة بشكل مباشر
    dispatch(addItemToCart(itemDetailsToAdd));

    setQuantity(1);
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const handlePriceChange = (price) => {
    setTotalPrice(price);
  };

  const handleCheckboxChange = (extra) => (event) => {
    if (event.target.checked) {
      setSelectedExtras([...selectedExtras, extra]);
    } else {
      setSelectedExtras(selectedExtras.filter((item) => item !== extra));
    }
  };

  const handleOptionChange = (event) => {
    const selectedOption = dataOptions.find(
      (option) => option.name_en === event.target.value
    );
    setSelectedOption(selectedOption); // احتفظ بالكائن الكامل
    setSelectedOptionName(selectedOption.name_en); // استخدم name_en فقط كقيمة للراديو جروب
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
              src={`${BASE_URL_images}${itemDetails.image}`}
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
                <CounterDiaolgButton
                  itemId={itemDetails.id}
                  basePrice={parseFloat(price)}
                  onChange={handlePriceChange}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(newQuantity)
                  }
                />

                <span style={{ color: "#000", fontSize: "1.3rem",fontWeight:"600" }}>
                  {price} EGP
                </span>
              </Stack>
            </Stack>
            <div className="borderItem"></div>
            <Typography variant="body1" sx={{ mb: 2, color: "#000",fontSize:"1.4rem" }}>
              {itemDetails.description_en}
            </Typography>
            <Stack>
              {dataOptions && dataOptions.length > 0 && (
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ color: "#000" }}>
                    Options
                  </Typography>
                  <RadioGroup
                    value={selectedOptionName} 
                    onChange={handleOptionChange}
                  >
                    {dataOptions.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option.name_en}
                        control={<Radio sx={{ color: "#000" }} />}
                        label={`${option.name_en}`}
                        sx={{ color: "#000" }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </Stack>

            {dataExtra && dataExtra.length > 0 && (
              <FormControl component="fieldset">
                <Typography variant="h6" sx={{ color: "#000" }}>
                  Extras
                </Typography>
                <RadioGroup
                  onChange={(e) => {
                    const selectedExtra = dataExtra.find(
                      (extra) => extra.description_en === e.target.value
                    );
                    if (selectedExtra) {
                      if (
                        !selectedExtras.some(
                          (extra) =>
                            extra.description_en ===
                            selectedExtra.description_en
                        )
                      ) {
                        setSelectedExtras([...selectedExtras, selectedExtra]);
                      }
                    }
                  }}
                >
                  {dataExtra.map((extra, index) => (
                    <FormControlLabel
                      key={index}
                      sx={{ color: "#000", fontSize: "8px" }}
                      control={
                        <Checkbox
                          sx={{
                            color: "#000",
                            transform: "scale(0.8)",
                            padding: "4px",
                          }}
                          checked={selectedExtras.includes(extra)}
                          onChange={handleCheckboxChange(extra)}
                        />
                      }
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
