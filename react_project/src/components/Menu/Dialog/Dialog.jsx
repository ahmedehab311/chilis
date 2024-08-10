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
import {
  addItemToCart,
  setTotalItems,
} from "../../../rtk/slices/orderSlice.js"; // import your action
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
  const description =
    itemDetails?.description ||
    tempSelectedItemDescription ||
    "Default Description";
  const image =
    itemDetails?.image || tempSelectedItemImage || "default-image.jpg";
  const [showOrderNow, setShowOrderNow] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const dispatch = useDispatch();

  const totalItems = useSelector((state) => state.cart.totalItems);

  // const handleAddToCart = () => {
  //   handleCloseDialog();

  //   // الحصول على الاختيارات المختارة من الـ RadioGroup
  //   const selectedExtras = dataExtra
  //     .filter(
  //       (extra) =>
  //         document.querySelector(`input[value="${extra.description_en}"]`)
  //           .checked
  //     )
  //     .map((extra) => ({
  //       name: extra.description_en,
  //       price: extra.price_en,
  //     }));

  //   const itemDetailsToAdd = {
  //     name: itemDetails?.name_en || "Default Name",
  //     price: price || tempSelectedItemPrice || 0,
  //     quantity: 1,
  //     extras: selectedExtras,
  //     totalPrice:
  //       (price || tempSelectedItemPrice || 0) +
  //       selectedExtras.reduce((sum, extra) => sum + extra.price_en, 0),
  //   };

  //   // تحديث الـ Redux state
  //   dispatch(addItemToCart(itemDetailsToAdd));

  //   // الحصول على الكارت من localStorage
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];

  //   // إضافة الطلب الجديد إلى الكارت
  //   cart.push(itemDetailsToAdd);

  //   // حفظ الكارت المحدث في localStorage
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };
  const handleAddToCart = () => {
  handleCloseDialog();

  // الحصول على الاختيارات المختارة من الـ RadioGroup
  const selectedExtras = dataExtra
    .filter(
      (extra) =>
        document.querySelector(`input[value="${extra.description_en}"]`)
          .checked
    )
    .map((extra) => ({
      name: extra.description_en,
      price: parseFloat(extra.price_en), // تأكد من تحويل السعر إلى رقم
    }));

  const itemDetailsToAdd = {
    name: itemDetails?.name_en || "Default Name",
    price: parseFloat(price) || parseFloat(tempSelectedItemPrice) || 0, // تأكد من تحويل السعر إلى رقم
    quantity: 1,
    extras: selectedExtras,
    totalPrice:
      (parseFloat(price) || parseFloat(tempSelectedItemPrice) || 0) +
      selectedExtras.reduce((sum, extra) => sum + extra.price, 0), // حساب الإجمالي مع إضافة أسعار extras
  };

  // تحديث الـ Redux state
  dispatch(addItemToCart(itemDetailsToAdd));

  // الحصول على الكارت من localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // إضافة الطلب الجديد إلى الكارت
  cart.push(itemDetailsToAdd);

  // حفظ الكارت المحدث في localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
};


  const [totalPrice, setTotalPrice] = useState(0);
  const handlePriceChange = (price) => {
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

            {dataExtra && dataExtra.length > 0 && (
              <FormControl component="fieldset">
                <Typography variant="h6" sx={{ color: "#000" }}>
                  Option
                </Typography>
                <Typography variant="h6" sx={{ color: "#000" }}>
                  Add on
                </Typography>
                {/* <RadioGroup>
                {dataExtra.map((extra, index) => (
                  <FormControlLabel
                    key={index}
                    sx={{ color: "#000" }}
                    value={extra.description_en}
                    control={<Radio sx={{ color: "#000" }} />}
                    label={`${extra.description_en} - ${extra.price_en} EGP`}
                  />
                ))}
              </RadioGroup> */}
                <RadioGroup
                  onChange={(e) => {
                    const selectedExtra = dataExtra.find(
                      (extra) => extra.description_en === e.target.value
                    );
                    if (selectedExtra) {
                      // إضافة الإضافة المختارة إلى القائمة إذا لم تكن موجودة
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
