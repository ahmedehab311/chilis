// import { useState } from "react";
// import axios from "axios";
// import { Button, Stack, TextField } from "@mui/material";
// import { BASE_URL } from "../../../../../setting.jsx";

// function Coupun({ api_token }) {
//   const [couponCode, setCouponCode] = useState("");
//   const [error, setError] = useState("");
//   const [couponData, setCouponData] = useState(null); // لتخزين بيانات الكوبون عند الاستجابة

//   const handleApplyCoupon = async () => {
//     if (couponCode.trim() === "") {
//       setError("Please enter a coupon code.");
//       return;
//     }

//     setError("");

//     try {
//       const response = await axios.get(
//         `${BASE_URL}/coupon/validation?coupon=${couponCode}&api_token=${api_token}`,
     
//       );

//       console.log("Response Data:", response.data.coupon);
//       if (response.data.response) {
//         setCouponData(response.data.coupon);
//       } else {
//         setError("Invalid coupon code.");
//       }
//     } catch (error) {
//       console.error("Error applying coupon:", error);
//       setError("Failed to apply coupon. Please try again.");
//     }
//   };

//   return (
//     <Stack
//       className="middleOrder"
//       sx={{ p: 2, borderBottom: "2px solid #ececec" }}
//     >
//       <Stack className="middleOrder" sx={{ p: 2 }}>
//         <Stack direction="row" alignItems="center" sx={{ mb: "1rem" }}>
//           <TextField
//             id="coupon-code-input"
//             placeholder="Enter coupon code"
//             value={couponCode}
//             onChange={(e) => setCouponCode(e.target.value)}
//             sx={{
//               flex: 1,
//               "& .MuiInputBase-input": {
//                 borderTopRightRadius: 0,
//                 borderBottomRightRadius: 0,
//                 padding: ".9rem 1rem !important",
//                 fontSize: "1.3rem",
//                 color: "gray",
//               },
//               "& .MuiInputBase-input::placeholder": {
//                 color: "gray",
//                 fontSize: "1.3rem",
//               },
//             }}
//           />
//           <Stack>
//             <Button
//               variant="contained"
//               color="error"
//               sx={{
//                 p: "10px 16px !important",
//                 height: "100%",
//                 borderTopLeftRadius: 0,
//                 borderBottomLeftRadius: 0,
//                 backgroundColor: "#d32f2f",
//                 "&:hover": { backgroundColor: "#d32f2f" },
//               }}
//               onClick={handleApplyCoupon}
//             >
//               Apply
//             </Button>
//           </Stack>
//         </Stack>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {couponData && (
//           <div>
//             <p>Coupon Code: {couponData.code}</p>
//             <p>Discount: {couponData.percentage}%</p>
//           </div>
//         )}
//         <TextField
//           className="formControl"
//           id="outlined-basic"
//           placeholder="Any notes? please enter it here."
//           fullWidth
//           multiline
//           minRows={3}
//           sx={{
//             width: "100%",
//             transition: ".5s",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             "& .MuiInputBase-input": {
//               fontSize: "1.5rem",
//               color: "gray",
//               m: ".2rem",
//             },
//             "& .MuiInputBase-input::placeholder": {
//               color: "#000",
//               fontSize: "1.3rem",
//             },
//           }}
//           InputProps={{
//             style: {
//               textAlign: "center",
//             },
//           }}
//         />
//       </Stack>
//     </Stack>
//   );
// }

// export default Coupun;

import { useState } from "react";
import axios from "axios";
import { Button, Stack, TextField } from "@mui/material";
import { BASE_URL } from "../../../../../setting.jsx";

function Coupun({ api_token, total, setTotal, deliveryFee, setDeliveryFee, paymentMethod }) {
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [couponData, setCouponData] = useState(null); // لتخزين بيانات الكوبون عند الاستجابة
  const [originalTotal, setOriginalTotal] = useState(total);
  const [originalDeliveryFee, setOriginalDeliveryFee] = useState(deliveryFee);
  const [isCouponApplied, setIsCouponApplied] = useState(false); // حالة لتحديد ما إذا كان الكوبون مفعلاً
  
  // const handleApplyCoupon = async () => {
  //   if (isCouponApplied) {
  //     // إعادة القيم الأصلية إذا كان الكوبون مفعلاً بالفعل
  //     setTotal(originalTotal);
  //     setDeliveryFee(originalDeliveryFee);
  //     setIsCouponApplied(false); // إلغاء الكوبون
  //     setCouponCode(""); // إعادة تعيين حقل الكوبون
  //     setCouponData(null); // إخفاء بيانات الكوبون
  //     setError(""); // إعادة تعيين الرسالة
  //     return;
  //   }
  //   if (couponCode.trim() === "") {
  //     setError("Please enter a coupon code.");
  //     return;
  //   }
  
  //   setError("");

  //   try {
  //     const response = await axios.get(
  //       `${BASE_URL}/coupon/validation?coupon=${couponCode}&api_token=${api_token}`
  //     );

  //     console.log("Response Data:", response.data.coupon);
  //     if (response.data.response) {
  //       const coupon = response.data.coupon;
  //       setCouponData(coupon);

  //       // تحقق من قيم الكوبون المختلفة وقم بتحديث القيم بناءً على الشروط

  //       // 1. التحقق من قيمة fixed
  //       if (coupon.fixed !== null) {
  //         setTotal((prevTotal) => prevTotal - coupon.fixed);
  //       } else if (coupon.percentage !== null) {
  //         // 2. التحقق من قيمة percentage
  //         const discount = (total * coupon.percentage) / 100;
  //         setTotal((prevTotal) => prevTotal - discount);
  //       }

  //       // 3. التحقق من قيمة free_delivery
  //       if (coupon.free_delivery === "1") {
  //         setDeliveryFee(0); // تعيين تكلفة الدليفري إلى صفر
  //       }

  //       // 4. التحقق من قيمة free_on_pay_card
  //       if (coupon.free_on_pay_card === "1" && paymentMethod === 2) {
  //         setDeliveryFee(0); // تعيين تكلفة الدليفري إلى صفر إذا كانت طريقة الدفع فيزا
  //       }
  //     } else {
  //       setError("Invalid coupon code.");
  //     }
  //   } catch (error) {
  //     console.error("Error applying coupon:", error);
  //     setError("Failed to apply coupon. Please try again.");
  //   }
  // };
// لتحديث الرسوم بناءً على حالة معينة، على سبيل المثال تغيير نوع التوصيل:


const handleApplyCoupon = async () => {
  if (isCouponApplied) {
    // إعادة القيم الأصلية إذا كان الكوبون مفعلاً بالفعل
    setTotal(originalTotal);
    setDeliveryFee(originalDeliveryFee);
    setIsCouponApplied(false); // إلغاء الكوبون
    setCouponCode(""); // إعادة تعيين حقل الكوبون
    setCouponData(null); // إخفاء بيانات الكوبون
    setError(""); // إعادة تعيين الرسالة
    return;
  }

  if (couponCode.trim() === "") {
    setError("Please enter a coupon code.");
    return;
  }

  setError("");

  try {
    const response = await axios.get(
      `${BASE_URL}/coupon/validation?coupon=${couponCode}&api_token=${api_token}`
    );

    console.log("Response Data:", response.data.coupon);
    if (response.data.response) {
      const coupon = response.data.coupon;
      setCouponData(coupon);

      // حفظ القيم الأصلية قبل تطبيق الكوبون
      setOriginalTotal(total);
      setOriginalDeliveryFee(deliveryFee);

      // تطبيق الكوبون بناءً على القيم المختلفة
      if (coupon.fixed !== null) {
        setTotal((prevTotal) => prevTotal - coupon.fixed);
      } else if (coupon.percentage !== null) {
        const discount = (total * coupon.percentage) / 100;
        setTotal((prevTotal) => prevTotal - discount);
      }

      if (coupon.free_delivery === "1") {
        setDeliveryFee(0);
      }

      if (coupon.free_on_pay_card === "1" && paymentMethod === 2) {
        setDeliveryFee(0);
      }

      setIsCouponApplied(true); // تم تطبيق الكوبون
    } else {
      setError("Invalid coupon code.");
    }
  } catch (error) {
    console.error("Error applying coupon:", error);
    setError("Failed to apply coupon. Please try again.");
  }
};

const handleDeliveryTypeChange = (type) => {
  if (type === "delivery") {
    setDeliveryFee(50); // تعيين قيمة التوصيل للتوصيل العادي
  } else if (type === "pickup") {
    setDeliveryFee(0); // لا توجد رسوم توصيل إذا كان الاستلام من الفرع
  }
};

  return (
    <Stack
      className="middleOrder"
      sx={{ p: 2, borderBottom: "2px solid #ececec" }}
    >
      <Stack className="middleOrder" sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" sx={{ mb: "1rem" }}>
          <TextField
            id="coupon-code-input"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            sx={{
              flex: 1,
              "& .MuiInputBase-input": {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                padding: ".9rem 1rem !important",
                fontSize: "1.3rem",
                color: "gray",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "gray",
                fontSize: "1.3rem",
              },
            }}
          />
          <Stack>
          <Button
  variant="contained"
  color={isCouponApplied ? "primary" : "error"}
  sx={{
    p: "10px 16px !important",
    height: "100%",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: isCouponApplied ? "#1976d2" : "#d32f2f",
    "&:hover": { backgroundColor: isCouponApplied ? "#1976d2" : "#d32f2f" },
  }}
  onClick={handleApplyCoupon}
>
  {isCouponApplied ? "Cancel" : "Apply"}
</Button>
          </Stack>
        </Stack>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {couponData && (
          <div>
            <p>Coupon Code: {couponData.code}</p>
            <p>Discount: {couponData.fixed !== null ? `${couponData.fixed} fixed` : `${couponData.percentage}%`}</p>
            {couponData.free_delivery === "1" && <p>Free Delivery</p>}
            {couponData.free_on_pay_card === "1" && paymentMethod === 2 && <p>Free Delivery on Card Payment</p>}
          </div>
        )}
        <TextField
          className="formControl"
          id="outlined-basic"
          placeholder="Any notes? please enter it here."
          fullWidth
          multiline
          minRows={3}
          sx={{
            width: "100%",
            transition: ".5s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiInputBase-input": {
              fontSize: "1.5rem",
              color: "gray",
              m: ".2rem",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#000",
              fontSize: "1.3rem",
            },
          }}
          InputProps={{
            style: {
              textAlign: "center",
            },
          }}
        />
      </Stack>
    </Stack>
  );
}

export default Coupun;
