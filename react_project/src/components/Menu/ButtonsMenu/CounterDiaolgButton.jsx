// /* eslint-disable react/prop-types */
// import { Stack } from "@mui/material";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// function Counter({
//   itemId,
//   basePrice,
//   onChange,
//   onQuantityChange,
//   initialQuantity,
// }) {
//   const item = useSelector((state) =>
//     state.cart.items.find((item) => item.id === itemId)
//   );
//   const [quantity, setQuantity] = useState(initialQuantity || 1);

//   const handleIncrease = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     onQuantityChange(newQuantity);
//     onChange(basePrice * newQuantity);
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       const newQuantity = quantity - 1;
//       setQuantity(newQuantity);
//       onQuantityChange(newQuantity);
//       onChange(basePrice * newQuantity);
//     }
//   };

//   return (
//     <Stack
//       direction={"row"}
//       alignItems={"center"}
//       sx={{
//         background: "green",
//         borderRadius: "10%",
//         width: "80px",
//         justifyContent: "space-evenly",
//         marginRight: "10px",
//         height: "20px",
//       }}
//     >
//       <button
//         style={{
//           fontSize: "18px",
//           color: "white",
//           borderRight: "0px",
//           borderRadius: "0px 50% 50% 0px",
//         }}
//         onClick={handleDecrease}
//       >
//         -
//       </button>
//       <Stack
//         sx={{
//           color: quantity === 0 ? "gray" : "white",
//           fontSize: "12px",
//         }}
//       >
//         {quantity}
//       </Stack>
//       <button
//         style={{
//           fontSize: "18px",
//           marginLeft: "5px",
//           color: "white",
//           borderLeft: "0px",
//           borderRadius: "0px 50% 50% 0px",
//         }}
//         onClick={handleIncrease}
//       >
//         +
//       </button>
//     </Stack>
//   );
// }

// export default Counter;
/* eslint-disable react/prop-types */

// import { Stack } from "@mui/material";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// function Counter({
//   itemId,
//   basePrice,
//   onChange,
//   onQuantityChange,
//   initialQuantity,
// }) {
//   const itemsInCart = useSelector((state) => state.cart.items);
//   const item = itemsInCart.find((item) => item.id === itemId);
//   const [quantity, setQuantity] = useState(initialQuantity || 1);

//   const handleIncrease = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     onQuantityChange(newQuantity);
//     onChange(basePrice * newQuantity);
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       const newQuantity = quantity - 1;
//       setQuantity(newQuantity);
//       onQuantityChange(newQuantity);
//       onChange(basePrice * newQuantity);
//     }
//   };
//   return (
//     <Stack
//       direction={"row"}
//       alignItems={"center"}
//       sx={{
//         background: "green",
//         borderRadius: "10%",
//         width: "80px",
//         justifyContent: "space-evenly",
//         marginRight: "10px",
//         height: "20px",
//       }}
//     >
//       <button
//         style={{
//           fontSize: "18px",
//           color: "white",
//           borderRight: "0px",
//           borderRadius: "0px 50% 50% 0px",
//         }}
//         onClick={handleDecrease}
//       >
//         -
//       </button>
//       <Stack
//         sx={{
//           color: quantity === 0 ? "gray" : "white",
//           fontSize: "12px",
//         }}
//       >
//         {quantity}
//       </Stack>
//       <button
//         style={{
//           fontSize: "18px",
//           marginLeft: "5px",
//           color: "white",
//           borderLeft: "0px",
//           borderRadius: "0px 50% 50% 0px",
//         }}
//         onClick={handleIncrease}
//       >
//         +
//       </button>
//     </Stack>
//   );
// }

// export default Counter;

import { Stack } from "@mui/material";
import { useState, useEffect } from "react";

// function Counter({
//   itemId,
//   basePrice,
//   onChange,
//   onQuantityChange,
//   initialQuantity,
// }) {
//   const [quantity, setQuantity] = useState(initialQuantity || 1);


//   useEffect(() => {
//     if (initialQuantity !== undefined) {
//       setQuantity(initialQuantity);
//     }
//   }, [initialQuantity]);
//   const handleIncrease = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     onQuantityChange(newQuantity, itemId);
//     onChange(basePrice * newQuantity);
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       const newQuantity = quantity - 1;
//       setQuantity(newQuantity);
//       onQuantityChange(newQuantity, itemId);
//       onChange(basePrice * newQuantity);
//     }
//   };

//   return (
//     <Stack
//       direction={"row"}
//       alignItems={"center"}
//       sx={{
//         background: "green",
//         borderRadius: "10%",
//         width: "80px",
//         justifyContent: "space-evenly",
//         marginRight: "10px",
//         height: "20px",
//       }}
//     >
//       <button
//         style={{
//           fontSize: "18px",
//           color: "white",
//           borderRight: "0px",
//           borderRadius: "0px 50% 50% 0px",
//         }}
//         onClick={handleDecrease}
//       >
//         -
//       </button>
//       <Stack
//         sx={{
//           color: quantity === 0 ? "gray" : "white",
//           fontSize: "12px",
//         }}
//       >
//         {quantity}
//       </Stack>
//       <button
//         style={{
//           fontSize: "18px",
//           marginLeft: "5px",
//           color: "white",
//           borderLeft: "0px",
//           borderRadius: "0px 50% 50% 0px",
//         }}
//         onClick={handleIncrease}
//       >
//         +
//       </button>
//     </Stack>
//   );
// }
function Counter({
  itemId,
  basePrice,
  onChange,
  onQuantityChange,
  initialQuantity,
}) {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  // لمزامنة الكمية الأولية عند تغييرها
  useEffect(() => {
    if (initialQuantity !== undefined) {
      setQuantity(initialQuantity);
    }
  }, [initialQuantity]);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    // console.log(`Increased quantity to: ${newQuantity}`);
    onQuantityChange(newQuantity, itemId); 
    onChange(basePrice * newQuantity); 
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      console.log(`Decrease quantity to: ${newQuantity}`);
      onQuantityChange(newQuantity, itemId);
      onChange(basePrice * newQuantity); // تحديث السعر بناءً على الكمية الجديدة
    }
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        background: "green",
        borderRadius: "10%",
        width: "80px",
        justifyContent: "space-evenly",
        marginRight: "10px",
        height: "20px",
      }}
    >
      <button
        style={{
          fontSize: "18px",
          color: "white",
          borderRight: "0px",
          borderRadius: "0px 50% 50% 0px",
        }}
        onClick={handleDecrease}
      >
        -
      </button>
      <Stack
        sx={{
          color: quantity === 0 ? "gray" : "white",
          fontSize: "12px",
        }}
      >
        {quantity}
      </Stack>
      <button
        style={{
          fontSize: "18px",
          marginLeft: "5px",
          color: "white",
          borderLeft: "0px",
          borderRadius: "0px 50% 50% 0px",
        }}
        onClick={handleIncrease}
      >
        +
      </button>
    </Stack>
  );
}


export default Counter;
