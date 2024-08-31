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
  Checkbox,
} from "@mui/material";
import { CounterDiaolgButton, AddToCardButton } from "../index";
// import { addItemToCart } from "../../../rtk/slices/orderSlice.js"; // import your action
import { addItemToCart } from '../../../rtk/slices/cartSlice.js'; // تأكد من المسار الصحيح
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
  dataOptions,
  BASE_URL,
}) {
  const dispatch = useDispatch();

  const [showOrderNow, setShowOrderNow] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const totalItems = useSelector((state) => state.cart.totalItems);

  // const handleAddToCart = () => {
  //   handleCloseDialog();

  //   console.log("Selected Option:", selectedOption);
  //   console.log("Selected Extras:", selectedExtras);

  //   const itemDetailsToAdd = {
  //     id: itemDetails?.id || "default-id",
  //     name: itemDetails?.name_en || "Default Name",
  //     price: parseFloat(price) || parseFloat(tempSelectedItemPrice) || 0,
  //     quantity: 1,
  //     extras: Array.isArray(selectedExtras)
  //       ? selectedExtras.map((extra) => ({
  //           id: extra.id,
  //           name: extra.description_en,
  //           price: parseFloat(extra.price_en),
  //         }))
  //       : [],
  //     option: selectedOption
  //       ? {
  //           id: selectedOption.id, // استخدام الـ ID هنا
  //           name: selectedOption.name_en, // استخدام الاسم المناسب
  //         }
  //       : null,
  //     totalPrice:
  //       (parseFloat(price) || parseFloat(tempSelectedItemPrice) || 0) +
  //       selectedExtras.reduce(
  //         (sum, extra) => sum + parseFloat(extra.price_en),
  //         0
  //       ),
  //   };

  //   dispatch(addItemToCart(itemDetailsToAdd));

  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   cart.push(itemDetailsToAdd);
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };
  
  const handleAddToCart = () => {
      handleCloseDialog();
  
      const itemDetailsToAdd = {
        id: itemDetails?.id || "default-id",
        name: itemDetails?.name_en || "Default Name",
        price: parseFloat(price) || 0,
        quantity: 1,
        extras: Array.isArray(selectedExtras)
          ? selectedExtras.map((extra) => ({
              id: extra.id,
              name: extra.description_en,
              price: parseFloat(extra.price_en),
            }))
          : [],
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
  
      // إضافة العنصر إلى السلة في Redux
      dispatch(addItemToCart(itemDetailsToAdd));
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
  useEffect(() => {
    console.log("dataOptions:", dataOptions);
    console.log("dataExtra:", dataExtra);
  }, [dataOptions, dataExtra]);

  const handleOptionChange = (event) => {
    const selectedOption = dataOptions.find(
      (option) => option.name_en === event.target.value
    );
    setSelectedOption(selectedOption);
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
                <CounterDiaolgButton
                  basePrice={10}
                  onChange={handlePriceChange}
                />
                <span style={{ color: "#000", fontSize: "12px" }}>
                  {price} EGP
                </span>
              </Stack>
            </Stack>
            <div className="borderItem"></div>
            <Typography variant="body1" sx={{ mb: 2, color: "#000" }}>
              {itemDetails.description_en}
            </Typography>
            <Stack>
              {dataOptions && dataOptions.length > 0 && (
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ color: "#000" }}>
                    Options
                  </Typography>
                  <RadioGroup
                    value={selectedOption}
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
                {/* <Typography variant="h6" sx={{ color: "#000" }}>
                  Option
                </Typography> */}
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
