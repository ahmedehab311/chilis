import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemQuantity } from '../../../rtk/slices/orderSlice'; // تأكد من أن هذا المسار صحيح
import Stack from '@mui/material/Stack';

const Counter = ({ itemId, onChange }) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cart.items.find((i) => i.id === itemId));
  const count = item?.quantity || 1; // استخدم القيمة 1 إذا كانت الكمية غير موجودة  
  const [localCount, setLocalCount] = useState(count);

  useEffect(() => {
    setLocalCount(count);
  }, [count]);

  const handleChange = (newCount) => {
    if (newCount >= 1) {
      dispatch(updateItemQuantity({ itemId, quantity: newCount }));
      if (onChange) {
        onChange(newCount);
      }
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
          border: "none",
          background: "transparent",
          borderRadius: "50% 0 0 50%",
        }}
        onClick={() => handleChange(localCount - 1)}
      >
        -
      </button>
      <Stack
        sx={{
          color: localCount === 0 ? "gray" : "white",
          fontSize: "12px",
        }}
      >
        {localCount}
      </Stack>
      <button
        style={{
          fontSize: "18px",
          marginLeft: "5px",
          color: "white",
          border: "none",
          background: "transparent",
          borderRadius: "0 50% 50% 0",
        }}
        onClick={() => handleChange(localCount + 1)}
      >
        +
      </button>
    </Stack>
  );
};

export default Counter;
