/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
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
import { v4 as uuidv4 } from "uuid";
import i18n from "../../Translation/i18n.js";
import { useTranslation } from "react-i18next";
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
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  // console.log("dataExtra", dataExtra);
  // console.log("dataOptions", dataOptions);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    handleCloseDialog();

    const itemDetailsToAdd = {
      uniqueId: uuidv4(),
      id: itemDetails.id,
      name_en: itemDetails.name_en,
      name_ar: itemDetails.name_ar,
      price: parseFloat(price),
      quantity: quantity,
      extras: selectedExtras.map((extra) => ({
        id: extra.id,
        name_en: extra.name_en,
        name_ar: extra.name_ar,
        price: parseFloat(extra.price_en),
      })),
      option: selectedOption
        ? {
            id: selectedOption.id,
            name_en: selectedOption.name_en,
            name_ar: selectedOption.name_ar,
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
    setSelectedOption(selectedOption);
    setSelectedOptionName(selectedOption.name_en);
  };
  useEffect(() => {
    if (dataOptions && dataOptions.length > 0) {
      const defaultOption = dataOptions[0];
      setSelectedOption(defaultOption);
      setSelectedOptionName(defaultOption.name_en);
    }
  }, [dataOptions]);
  const convertNumberToArabic = (number) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(number).replace(/[0-9]/g, (digit) => arabicNumbers[digit]);
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
              <DialogTitle
                id="item-dialog-title"
                sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "1.7rem" }}>
                  {isArabic ? itemDetails.name_ar : itemDetails.name_en}
                </Typography>
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

                <span
                  style={{
                    color: "#000",
                    fontSize: "1.7rem",
                    fontWeight: "600",
                  }}
                >
                  {price} {t("egp")}
                  {/* {isArabic ? convertNumberToArabic(price) : price} {t("egp")} */}
                </span>
              </Stack>
            </Stack>
            <div className="borderItem"></div>
            <Typography
              variant="body1"
              sx={{ color: "#000", fontSize: "1.4rem", fontWeight: "600" }}
            >
              {isArabic
                ? itemDetails.description_ar
                : itemDetails.description_en}
            </Typography>
            <Stack>
              {dataOptions && dataOptions.length > 0 && (
                <FormControl component="fieldset" sx={{ mt: ".7rem" }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#000", fontSize: "1.5rem" }}
                  >
                    {t("options")}
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
                        label=<Typography
                          sx={{
                            fontSize: "1.5rem",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {`${isArabic ? option.name_ar : option.name_en}`}
                        </Typography>
                        sx={{ color: "#000" }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </Stack>

            {dataExtra && dataExtra.length > 0 && (
              <FormControl component="fieldset">
                <Typography
                  variant="h5"
                  sx={{
                    color: "#000",
                    fontSize: "1.8rem",
                    my: ".6rem",
                    fontWeight: "600",
                  }}
                >
                  {t("extras")}
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
                      control={
                        <Checkbox
                          sx={{
                            color: "#000",
                            transform: "scale(0.8)",
                            padding: "4px",
                            mt: 0,
                          }}
                          checked={selectedExtras.includes(extra)}
                          onChange={handleCheckboxChange(extra)}
                        />
                      }
                      
                      label={
                        <Typography
                          sx={{
                            fontSize: "1.3rem",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {`${isArabic ? extra.name_ar : extra.name_en} - ${
                            extra[isArabic ? "price_ar" : "price_en"]
                          } ${t("egp")}`}
                        </Typography>
                      }
                      // label={
                      //   <Typography
                      //     sx={{
                      //       fontSize: "1.3rem",
                      //       color: "#000",
                      //       fontWeight: "500",
                      //     }}
                      //   >
                      //     {`${isArabic ? extra.name_ar : extra.name_en} - ${
                      //       isArabic
                      //         ? convertNumberToArabic(extra.price_ar)
                      //         : extra.price_en
                      //     } ${t("egp")}`}
                      //   </Typography>
                      // }
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
