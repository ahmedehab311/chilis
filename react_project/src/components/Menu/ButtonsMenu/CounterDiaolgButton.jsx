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
//     onChange(totalPrice);

//     // تخزين القيمة في localStorage
//     localStorage.setItem('counter', counter);
//   }, [counter, basePrice, onChange]);

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
import { useState, useEffect } from "react";
import { Stack } from "@mui/material";

function Counter({ basePrice, onChange }) {
  // استرجاع القيمة من localStorage أو تعيين القيمة الافتراضية 1
  const [counter, setCounter] = useState(() => {
    const savedCounter = localStorage.getItem('counter');
    return savedCounter ? parseInt(savedCounter, 10) : 1;
  });

  useEffect(() => {
    // حساب السعر الإجمالي بناءً على العدد وسعر الأساس
    const totalPrice = counter * basePrice;
    
    // استخدم useCallback لإنشاء دالة ثابتة
    onChange(totalPrice);

    // تخزين القيمة في localStorage
    localStorage.setItem('counter', counter);
  }, [counter, basePrice, onChange]); // تأكد من أن هذه التبعيات لا تتسبب في تكرار التحديثات

  const handleClick1 = () => {
    setCounter(prevCounter => prevCounter + 1); // زيادة بمقدار 1
  };

  const handleClick2 = () => {
    setCounter(prevCounter => Math.max(1, prevCounter - 1)); // تقليل بمقدار 1 مع التأكد من أن العدد لا يقل عن 1
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
