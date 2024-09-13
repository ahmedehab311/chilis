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
import {
  addItemToCart,
  updateItemQuantity,
  updateCartItems
} from "../../../rtk/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
  BASE_URL_images,
}) {
  const dispatch = useDispatch();

  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  // const totalItems = useSelector((state) => state.cart.totalItems);



  // const handleAddToCart = () => {

  //   handleCloseDialog();

  //   const itemDetailsToAdd = {
  //     id: itemDetails?.id || "default-id",
  //     name: itemDetails?.name_en || "Default Name",
  //     price: parseFloat(price) || 0,
  //     quantity: quantity,
  //     extras: Array.isArray(selectedExtras)
  //       ? selectedExtras.map((extra) => ({
  //           id: extra.id,
  //           name: extra.description_en,
  //           price: parseFloat(extra.price_en),
  //         }))
  //       : [],
  //     option: selectedOption
  //       ? {
  //           id: selectedOption.id,
  //           name: selectedOption.name_en,
  //         }
  //       : null,
  //     totalPrice:
  //       (parseFloat(price) || 0) +
  //       selectedExtras.reduce(
  //         (sum, extra) => sum + parseFloat(extra.price_en),
  //         0
  //       ),
  //   };

  //   dispatch(addItemToCart(itemDetailsToAdd));

  // };


  // const handleAddToCart = () => {
  //   handleCloseDialog();
  
   
  //   const quantityToAdd = quantity || 1;  
  //   const itemDetailsToAdd = {
  //     id: itemDetails?.id || "default-id",
  //     name: itemDetails?.name_en || "Default Name",
  //     price: parseFloat(price) || 0,
  //     quantity: quantityToAdd,  // استخدم الكمية الحالية أو الافتراضية
  //     extras: Array.isArray(selectedExtras)
  //       ? selectedExtras.map((extra) => ({
  //           id: extra.id,
  //           name: extra.description_en,
  //           price: parseFloat(extra.price_en),
  //         }))
  //       : [],
  //     option: selectedOption
  //       ? {
  //           id: selectedOption.id,
  //           name: selectedOption.name_en,
  //         }
  //       : null,
  //     totalPrice:
  //       (parseFloat(price) || 0) +
  //       selectedExtras.reduce(
  //         (sum, extra) => sum + parseFloat(extra.price_en),
  //         0
  //       ),
  //   };
  
  //   console.log("Adding item to cart:", itemDetailsToAdd);
  
  //   // إضافة العنصر إلى السلة
  //   dispatch(addItemToCart(itemDetailsToAdd));
  //   setQuantity(1);
  // };
  
  // const handleAddToCart = () => {
  //   handleCloseDialog();
  
  //   const quantityToAdd = quantity || 1;
  
  //   const itemDetailsToAdd = {
  //     id: itemDetails?.id || "default-id",
  //     name: itemDetails?.name_en || "Default Name",
  //     price: parseFloat(price) || 0,
  //     quantity: quantityToAdd,  // استخدم الكمية الحالية أو الافتراضية
  //     extras: Array.isArray(selectedExtras)
  //       ? selectedExtras.map((extra) => ({
  //           id: extra.id,
  //           name: extra.description_en,
  //           price: parseFloat(extra.price_en),
  //         }))
  //       : [],
  //     option: selectedOption
  //       ? {
  //           id: selectedOption.id,
  //           name: selectedOption.name_en,
  //         }
  //       : null,
  //     totalPrice:
  //       (parseFloat(price) || 0) +
  //       selectedExtras.reduce(
  //         (sum, extra) => sum + parseFloat(extra.price_en),
  //         0
  //       ),
  //   };
  
  //   // عرض معلومات العنصر في الـ console للمساعدة في التصحيح
  //   console.log("Adding item to cart:", itemDetailsToAdd);
  
  //   // إضافة العنصر إلى السلة
  //   dispatch(addItemToCart(itemDetailsToAdd));
  
  //   // إعادة تعيين الكمية إلى 1 بعد إضافة العنصر
  //   setQuantity(1);
  // };

  // const handleAddToCart = () => {
  //   handleCloseDialog();
  
  //   const quantityToAdd = quantity || 1;
  //   const itemDetailsToAdd = {
  //     id: itemDetails?.id || "default-id",
  //     name: itemDetails?.name_en || "Default Name",
  //     price: parseFloat(price) || 0,
  //     quantity: quantityToAdd,
  //     extras: Array.isArray(selectedExtras)
  //       ? selectedExtras.map((extra) => ({
  //           id: extra.id,
  //           name: extra.description_en,
  //           price: parseFloat(extra.price_en),
  //         }))
  //       : [],
  //     option: selectedOption
  //       ? {
  //           id: selectedOption.id,
  //           name: selectedOption.name_en,
  //         }
  //       : null,
  //     totalPrice:
  //       (parseFloat(price) || 0) +
  //       selectedExtras.reduce((sum, extra) => sum + parseFloat(extra.price_en), 0),
  //   };
  
  //   // تسجيل بيانات العنصر الذي سيتم إضافته
  //   console.log("Item to Add:", itemDetailsToAdd);
  
  //   // تحقق مما إذا كان العنصر موجود بالفعل في السلة
  //   const existingItemIndex = cartItems.findIndex(
  //     (item) =>
  //       item.id === itemDetailsToAdd.id &&
  //       JSON.stringify(item.option) === JSON.stringify(itemDetailsToAdd.option) &&
  //       JSON.stringify(item.extras) === JSON.stringify(itemDetailsToAdd.extras)
  //   );
  
  //   // تسجيل نتيجة findIndex للتحقق من العنصر الموجود
  //   console.log("Existing Item Index:", existingItemIndex);
  //   console.log("Cart Items Before Update:", cartItems);
  
  //   if (existingItemIndex !== -1) {
  //     // إذا كان العنصر موجودًا، نقوم بزيادة الكمية فقط
  //     const updatedCartItems = cartItems.map((item, index) => {
  //       if (index === existingItemIndex) {
  //         return {
  //           ...item,
  //           quantity: item.quantity + quantityToAdd,
  //         };
  //       }
  //       return item;
  //     });
  
  //     // تسجيل حالة السلة بعد التحديث
  //     console.log("Updated Cart Items:", updatedCartItems);
  
  //     dispatch(updateCartItems(updatedCartItems)); // استخدم الديسباتش لتحديث السلة
  //   } else {
  //     // إذا لم يكن موجودًا، أضف العنصر كعنصر جديد
  //     console.log("Adding New Item to Cart");
  //     dispatch(addItemToCart(itemDetailsToAdd));
  //   }
  
  //   setQuantity(1); // إعادة تعيين الكمية بعد إضافة العنصر
  
  //   // تسجيل حالة السلة بعد إضافة العنصر
  //   console.log("Cart Items After Add:", cartItems);
  // };
 
  // const [quantity, setQuantity] = useState(1);

  // const handleQuantityChange = (newQuantity) => {
  //   setQuantity(newQuantity);
  //   dispatch(updateItemQuantity({ itemId: itemDetails.id, newQuantity }));
  //   console.log("Updated quantity:", newQuantity);

  // };

  // const cartItems = useSelector((state) => state.cart.cartItems) || [];
  // const handleAddToCart = () => {
  //   handleCloseDialog();
  
  //   const quantityToAdd = quantity || 1; // الكمية التي يتم إضافتها إلى السلة
  //   const itemDetailsToAdd = {
  //     id: itemDetails?.id || "default-id",
  //     name: itemDetails?.name_en || "Default Name",
  //     price: parseFloat(price) || 0,
  //     quantity: quantityToAdd,
  //     extras: Array.isArray(selectedExtras)
  //       ? selectedExtras.map((extra) => ({
  //           id: extra.id,
  //           name: extra.description_en,
  //           price: parseFloat(extra.price_en),
  //         }))
  //       : [],
  //     option: selectedOption
  //       ? {
  //           id: selectedOption.id,
  //           name: selectedOption.name_en,
  //         }
  //       : null,
  //     totalPrice:
  //       (parseFloat(price) || 0) +
  //       selectedExtras.reduce((sum, extra) => sum + parseFloat(extra.price_en), 0),
  //   };
  
  //   // تحقق مما إذا كان العنصر موجود بالفعل في السلة
  //   const existingItemIndex = cartItems.findIndex(
  //     (item) =>
  //       item.id === itemDetailsToAdd.id &&
  //       JSON.stringify(item.option) === JSON.stringify(itemDetailsToAdd.option) &&
  //       JSON.stringify(item.extras) === JSON.stringify(itemDetailsToAdd.extras)
  //   );
  
  //   if (existingItemIndex !== -1) {
  //     // إذا كان العنصر موجودًا، قم بزيادة الكمية فقط
  //     const updatedCartItems = cartItems.map((item, index) => {
  //       if (index === existingItemIndex) {
  //         return {
  //           ...item,
  //           quantity: item.quantity + quantityToAdd, // زيادة الكمية
  //         };
  //       }
  //       return item;
  //     });
  //     dispatch(updateCartItems(updatedCartItems)); // استخدم الديسباتش لتحديث السلة
  //   } else {
  //     // إذا لم يكن موجودًا، أضف العنصر كعنصر جديد
  //     dispatch(addItemToCart(itemDetailsToAdd));
  //   }
  
  //   setQuantity(1); // إعادة تعيين الكمية بعد إضافة العنصر
  // };
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state) => state.cart.items);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    handleCloseDialog();
  
    const itemDetailsToAdd = {
      id: itemDetails.id,
      name: itemDetails.name_en,
      price: parseFloat(price),
      quantity: quantity,  // استخدم الكمية المحددة
      extras: selectedExtras.map(extra => ({
        id: extra.id,
        name: extra.description_en,
        price: parseFloat(extra.price_en),
      })),
      option: selectedOption ? {
        id: selectedOption.id,
        name: selectedOption.name_en,
      } : null,
      totalPrice: (parseFloat(price) || 0) + selectedExtras.reduce(
        (sum, extra) => sum + parseFloat(extra.price_en),
        0
      ),
    };

    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.id === itemDetailsToAdd.id &&
        JSON.stringify(item.option) === JSON.stringify(itemDetailsToAdd.option) &&
        JSON.stringify(item.extras) === JSON.stringify(itemDetailsToAdd.extras)
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            quantity: item.quantity + itemDetailsToAdd.quantity, // زيادة الكمية
          };
        }
        return item;
      });
      dispatch(updateCartItems(updatedCartItems));
    } else {
      dispatch(addItemToCart(itemDetailsToAdd));
    }
  
    setQuantity(1); // إعادة تعيين الكمية بعد الإضافة
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
