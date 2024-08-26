// import { useState, useEffect } from "react";
// import { Stack } from "@mui/material";

// function Counter({ basePrice, onChange }) {
//   // استرجاع القيمة من localStorage أو تعيين القيمة الافتراضية 1
//   const [counter, setCounter] = useState(() => {
//     const savedCounter = localStorage.getItem('counter');
//     return savedCounter ? parseInt(savedCounter, 10) : 1;
//   });

//   useEffect(() => {
//     // حساب السعر الإجمالي بناءً على العدد وسعر الأساس
//     const totalPrice = counter * basePrice;
    
//     // استخدم useCallback لإنشاء دالة ثابتة
//     onChange(totalPrice);

//     // تخزين القيمة في localStorage
//     localStorage.setItem('counter', counter);
//   }, [counter, basePrice, onChange]); // تأكد من أن هذه التبعيات لا تتسبب في تكرار التحديثات

//   const handleClick1 = () => {
//     setCounter(prevCounter => prevCounter + 1); // زيادة بمقدار 1
//   };

//   const handleClick2 = () => {
//     setCounter(prevCounter => Math.max(1, prevCounter - 1)); // تقليل بمقدار 1 مع التأكد من أن العدد لا يقل عن 1
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
//         onClick={handleClick2}
//       >
//         -
//       </button>
//       <Stack
//         sx={{
//           color: counter === 0 ? "gray" : "white",
//           fontSize: "12px",
//         }}
//       >
//         {counter}
//       </Stack>
//       <button
//         style={{
//           fontSize: "18px",
//           marginLeft: "5px",
//           color: "white",
//           borderLeft: "0px",
//           borderRadius: "0px 50% 50% 0px",
//         }}
//         onClick={handleClick1}
//       >
//         +
//       </button>
//     </Stack>
//   );
// }

// export default Counter;

// import { useState, useEffect } from "react";
// import { Stack } from "@mui/material";

// function CounterDiaolgButton({ basePrice, onChange }) {
//   // استرجاع القيمة من localStorage أو تعيين القيمة الافتراضية 1
//   const [counter, setCounter] = useState(() => {
//         const savedCounter = localStorage.getItem('counter');
//         return savedCounter ? parseInt(savedCounter, 10) : 1;
//       });
    
//       useEffect(() => {
//         // حساب السعر الإجمالي بناءً على العدد وسعر الأساس
//         const totalPrice = counter * basePrice;
        
//         // استخدم useCallback لإنشاء دالة ثابتة
//         onChange(totalPrice);
    
//         // تخزين القيمة في localStorage
//         localStorage.setItem('counter', counter);
//       }, [counter, basePrice, onChange]); // تأكد من أن هذه التبعيات لا تتسبب في تكرار التحديثات
    
//       const handleClick1 = () => {
//         setCounter(prevCounter => prevCounter + 1); // زيادة بمقدار 1
//       };
    
//       const handleClick2 = () => {
//         setCounter(prevCounter => Math.max(1, prevCounter - 1)); // تقليل بمقدار 1 مع التأكد من أن العدد لا يقل عن 1
//       };

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
//         onClick={handleClick2}
//       >
//         -
//       </button>
//       <Stack
//         sx={{
//           color: counter === 0 ? "gray" : "white",
//           fontSize: "12px",
//         }}
//       >
//         {counter}
//       </Stack>
//       <button
//         style={{
//           fontSize: "18px",
//           marginLeft: "5px",
//           color: "white",
//           borderLeft: "0px",
//           borderRadius: "0px 50% 50% 0px",
//         }}
//         onClick={handleClick1}
//       >
//         +
//       </button>
//     </Stack>
//   );
// }

// export default CounterDiaolgButton;

import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateItemQuantity } from "../../../rtk/slices/orderSlice";

function Counter({ itemId, basePrice, onChange }) {
  const dispatch = useDispatch();
  const item = useSelector(state => state.cart.items.find(item => item.id === itemId));
  
  const [counter, setCounter] = useState(() => {
    // حاول قراءة الكمية من الـ Local Storage
    const savedCounter = localStorage.getItem(`counter_${itemId}`);
    return savedCounter ? parseInt(savedCounter, 10) : (item ? item.quantity : 1);
  });

  useEffect(() => {
    // حساب السعر الإجمالي بناءً على العدد وسعر الأساس
    const totalPrice = counter * basePrice;
    onChange(totalPrice);

    // تحديث الكمية في Redux
    dispatch(updateItemQuantity({ itemId, quantity: counter }));
    
    // تخزين القيمة في localStorage
    localStorage.setItem(`counter_${itemId}`, counter);
    localStorage.setItem('totalItems', JSON.stringify(
      Object.keys(localStorage)
        .filter(key => key.startsWith('counter_'))
        .reduce((total, key) => total + parseInt(localStorage.getItem(key)), 0)
    ));
  }, [counter, basePrice, onChange, dispatch, itemId]);

  const handleClick1 = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const handleClick2 = () => {
    setCounter(prevCounter => Math.max(1, prevCounter - 1));
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
        onClick={handleClick2}
      >
        -
      </button>
      <Stack
        sx={{
          color: counter === 0 ? "gray" : "white",
          fontSize: "12px",
        }}
      >
        {counter}
      </Stack>
      <button
        style={{
          fontSize: "18px",
          marginLeft: "5px",
          color: "white",
          borderLeft: "0px",
          borderRadius: "0px 50% 50% 0px",
        }}
        onClick={handleClick1}
      >
        +
      </button>
    </Stack>
  );
}

export default Counter;
