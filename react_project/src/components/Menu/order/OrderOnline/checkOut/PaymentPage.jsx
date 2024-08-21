// import { useState } from "react";
// import { Button, TextField, Stack, Typography } from "@mui/material";
// import * as yup from "yup";
// import { useFormik } from "formik";
// import axios from "axios";

// // Schema for validation
// export const paySchema = yup.object({
//   cardNumber: yup
//     .string()
//     .required("Card number is required")
//     .matches(/^[0-9\s]{19}$/, "Invalid card number"), // Adjusted for spaces
//   expiryDate: yup
//     .string()
//     .required("Expiry date is required")
//     .test("valid-month", "Invalid month", function (value) {
//       if (!value) {
//         return false;
//       }

//       const [month] = value.split("/").map((item) => parseInt(item, 10));

//       return month >= 1 && month <= 12;
//     })
//     .test(
//       "is-future-date",
//       "Expiry date must be in the future",
//       function (value) {
//         if (!value) {
//           return false;
//         }

//         const currentDate = new Date();
//         const [month, year] = value
//           .split("/")
//           .map((item) => parseInt(item, 10));

//         const expiryDate = new Date(year + 2000, month, 1);

//         return expiryDate > currentDate;
//       }
//     ),
//   name: yup.string().required("Name is required"),
//   cvv: yup
//     .string()
//     .matches(/^[0-9]{3,4}$/, "Invalid CVV")
//     .required("CVV is required"),
// });

// // Functions for formatting input values
// export const formatCardNumber = (value) => {
//   return value
//     .replace(/\D/g, "")
//     .replace(/(.{4})/g, "$1 ")
//     .trim();
// };

// export const formatExpiryDate = (value) => {
//   const numericValue = value.replace(/\D/g, "");
//   const formattedValue = numericValue.slice(0, 4);

//   if (formattedValue.length > 2) {
//     return formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
//   } else {
//     return formattedValue;
//   }
// };

// const PaymentForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       cardNumber: "",
//       expiryDate: "",
//       cvv: "",
//     },
//     validationSchema: paySchema,
//     onSubmit: async (values) => {
//       console.log("Processing payment...", values);
//       // Implement payment logic here
//     },
//   });
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [name, setName] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState("");

//   // const handlePayment = async () => {
//   //   try {
//   //     // Prepare the payment data to send
//   //     const paymentData = {
//   //       card_number: cardNumber,
//   //       expiry_date: expiryDate,
//   //       cvv: cvv,
//   //       name: name,
//   //       amount: 1000, // Example: $10.00
//   //       currency: "USD",
//   //     };

//   //     // Send a POST request to the payment API
//   //     const response = await axios.post(
//   //       "https://api.example.com/pay",
//   //       paymentData
//   //     );

//   //     // Handle the API response
//   //     if (response.data) {
//   //       setPaymentStatus("Payment successful!");
//   //     } else {
//   //       setPaymentStatus("Payment failed! Please try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error processing payment:", error);
//   //     setPaymentStatus("An error occurred during payment processing.");
//   //   }
//   // };
//   const handlePayment = async (paymentType) => {
//     try {
//       const response = await axios.post(API_CHECKOUT, {
//         payment: paymentType,  // 1 إذا كان الدفع نقدًا، 2 إذا كان بالبطاقة
//         // أضف هنا باقي البيانات المطلوبة للـ API مثل تفاصيل الطلب والعنوان إلخ.
//       });
  
//       if (response.data.success) {
//         alert("تم الطلب بنجاح!");
//       } else {
//         alert("فشل الطلب، يرجى المحاولة مرة أخرى.");
//       }
//     } catch (error) {
//       console.error("Error processing payment:", error);
//       alert("حدث خطأ أثناء معالجة الدفع.");
//     }
//   };
  

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Stack>
//         <Stack>
//           <Typography sx={{ fontSize: "1.3rem", fontWeight: "600", my: 1 }}>
//             Card Number
//           </Typography>
//           <TextField
//             fullWidth
//             variant="outlined"
//             name="cardNumber"
//             value={formatCardNumber(formik.values.cardNumber)}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
//             }
//             helperText={formik.touched.cardNumber && formik.errors.cardNumber}
//             FormHelperTextProps={{
//               sx: {
//                 fontSize: "1rem", // تعديل حجم الخط
//               },
//             }}
//           />
//         </Stack>

//         <Stack direction="row" spacing={2} sx={{ my: 2 }}>
//           <Stack flex={1}>
//             <Typography sx={{ fontSize: "1.3rem", fontWeight: "600", my: 1 }}>
//               Expiration Date
//             </Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="MM/YY"
//               name="expiryDate"
//               value={formatExpiryDate(formik.values.expiryDate)}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
//               }
//               helperText={formik.touched.expiryDate && formik.errors.expiryDate}
//               FormHelperTextProps={{
//                 sx: {
//                   fontSize: "1rem", // تعديل حجم الخط
//                 },
//               }}
//             />
//           </Stack>

//           <Stack flex={1}>
//             <Typography sx={{ fontSize: "1.3rem", fontWeight: "600", my: 1 }}>
//               CVV
//             </Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="cvv"
//               value={formik.values.cvv}
//               onChange={formik.handleChange}
//               error={formik.touched.cvv && Boolean(formik.errors.cvv)}
//               helperText={formik.touched.cvv && formik.errors.cvv}
//               FormHelperTextProps={{
//                 sx: {
//                   fontSize: "1rem", // تعديل حجم الخط
//                 },
//               }}
//               inputProps={{
//                 maxLength: 4,
//                 inputMode: "numeric",
//                 pattern: "[0-9]*",
//               }}
//             />
//           </Stack>
//         </Stack>

//         <Button
//           variant="contained"
//           color="error"
//           sx={{ fontSize: "1.1rem", fontWeight: "500" }}
//           type="submit"
//           onClick={handlePayment}
//         >
//           Pay Now
//         </Button>
//       </Stack>
//     </form>
//   );
// };

// export default PaymentForm;
import { useState } from "react";
import { Button, TextField, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

// Schema for validation
export const paySchema = yup.object({
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^[0-9\s]{19}$/, "Invalid card number"),
  expiryDate: yup
    .string()
    .required("Expiry date is required")
    .test("valid-month", "Invalid month", function (value) {
      if (!value) {
        return false;
      }
      const [month] = value.split("/").map((item) => parseInt(item, 10));
      return month >= 1 && month <= 12;
    })
    .test("is-future-date", "Expiry date must be in the future", function (value) {
      if (!value) {
        return false;
      }
      const currentDate = new Date();
      const [month, year] = value.split("/").map((item) => parseInt(item, 10));
      const expiryDate = new Date(year + 2000, month, 1);
      return expiryDate > currentDate;
    }),
  name: yup.string().required("Name is required"),
  cvv: yup
    .string()
    .matches(/^[0-9]{3,4}$/, "Invalid CVV")
    .required("CVV is required"),
});

// Functions for formatting input values
export const formatCardNumber = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const formatExpiryDate = (value) => {
  const numericValue = value.replace(/\D/g, "");
  const formattedValue = numericValue.slice(0, 4);

  if (formattedValue.length > 2) {
    return formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
  } else {
    return formattedValue;
  }
};

const PaymentForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [paymentType, setPaymentType] = useState(""); // "cash" or "card"

  const formik = useFormik({
    initialValues: {
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: paySchema,
    onSubmit: (values) => {
      // Handle form submission
    },
  });

  const handlePayment = async () => {
    try {
      const response = await axios.post("YOUR_API_ENDPOINT", {
        payment: paymentType, // "cash" or "card"
        // Add other required fields like order details, address, etc.
      });
  
      if (response.data.success) {
        alert("Order placed successfully!");
      } else {
        alert("Order failed, please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  const handleConfirmPayment = async () => {
    // Perform payment processing for card details
    await handlePayment();
    setOpenDialog(false); // Close dialog after processing
  };

  return (
    <>
      <Stack>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setPaymentType("cash");
            handlePayment(); // Directly handle cash payment
          }}
          sx={{ fontSize: "1.1rem", fontWeight: "500", mb: 2 }}
        >
          Pay with Cash
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenDialog(true)} // Show dialog for credit card payment
          sx={{ fontSize: "1.1rem", fontWeight: "500" }}
        >
          Pay with Credit Card
        </Button>
      </Stack>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter Payment Details</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <Stack>
                <Typography sx={{ fontSize: "1.3rem", fontWeight: "600", my: 1 }}>
                  Card Number
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="cardNumber"
                  value={formatCardNumber(formik.values.cardNumber)}
                  onChange={formik.handleChange}
                  error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                  helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                  FormHelperTextProps={{
                    sx: {
                      fontSize: "1rem",
                    },
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={2} sx={{ my: 2 }}>
                <Stack flex={1}>
                  <Typography sx={{ fontSize: "1.3rem", fontWeight: "600", my: 1 }}>
                    Expiration Date
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="MM/YY"
                    name="expiryDate"
                    value={formatExpiryDate(formik.values.expiryDate)}
                    onChange={formik.handleChange}
                    error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                    helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                    FormHelperTextProps={{
                      sx: {
                        fontSize: "1rem",
                      },
                    }}
                  />
                </Stack>

                <Stack flex={1}>
                  <Typography sx={{ fontSize: "1.3rem", fontWeight: "600", my: 1 }}>
                    CVV
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="cvv"
                    value={formik.values.cvv}
                    onChange={formik.handleChange}
                    error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                    helperText={formik.touched.cvv && formik.errors.cvv}
                    FormHelperTextProps={{
                      sx: {
                        fontSize: "1rem",
                      },
                    }}
                    inputProps={{
                      maxLength: 4,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                  />
                </Stack>
              </Stack>

              <Button
                variant="contained"
                color="error"
                type="submit"
                sx={{ fontSize: "1.1rem", fontWeight: "500" }}
                onClick={handleConfirmPayment} // Confirm payment on submit
              >
                Confirm Payment
              </Button>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentForm;
