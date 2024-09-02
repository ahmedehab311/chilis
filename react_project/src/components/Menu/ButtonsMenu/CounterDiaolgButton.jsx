/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
function Counter({
  itemId,
  basePrice,
  onChange,
  onQuantityChange,
  initialQuantity,
}) {
  const item = useSelector((state) =>
    state.cart.items.find((item) => item.id === itemId)
  );
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
    onChange(basePrice * newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
      onChange(basePrice * newQuantity);
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
