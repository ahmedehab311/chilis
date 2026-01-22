// /* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
function Counter({
  itemId,
  basePrice,
  onChange,
  onQuantityChange,
  initialQuantity,
}) {
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  useEffect(() => {
    if (initialQuantity !== undefined) {
      setQuantity(initialQuantity);
    }
  }, [initialQuantity]);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity, itemId);
    onChange(basePrice * newQuantity);
  };

  // const handleDecrease = () => {

  //   if (quantity > 1) {
  //     const newQuantity = quantity - 1;
  //     setQuantity(newQuantity);
  //     onQuantityChange(newQuantity, itemId);
  //     onChange(basePrice * newQuantity);
  //   }
  // };
  const handleDecrease = () => {
    const newQuantity = quantity - 1; // ممكن تبقى 0

    // ✅ لو كانت 1 → newQuantity = 0 → ابعت 0 للأب
    if (newQuantity >= 0) {
      // ما تغيّرش UI للكونتر لـ 0 (اختياري)
      // لو عايزه يظهر 0 مؤقتاً قبل التأكيد: حط setQuantity(newQuantity)
      // لكن الأفضل ما نغيرش الكمّية لحد ما اليوزر يconfirm

      onQuantityChange(newQuantity, itemId); // هتوصل 0 لـ OrderOnline
      // onChange(basePrice * Math.max(newQuantity, 1)); // مش محتاجها هنا
    }
  };

  const convertNumberToArabic = (number) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(number).replace(/[0-9]/g, (digit) => arabicNumbers[digit]);
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
        {isArabic ? convertNumberToArabic(quantity) : quantity}
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
