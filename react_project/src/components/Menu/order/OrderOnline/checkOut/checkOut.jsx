// /* eslint-disable react/prop-types */
// import {
//   Box,
//   Stack,
//   TextField,
//   Typography,
//   Card,
//   Container,
//   Button,
// } from "@mui/material";
// import "../OrderOnline.css";
// import imgLogo from "../../../../Hero/images/logo.png";
// import Counter from "../../../ButtonsMenu/CounterDiaolgButton";
// import { API_TAX } from "../../../apis&fetchData/ApiLinks";
// import { useEffect, useState } from "react";
// import axios from "axios";
// function CheckOut({
//   totalToPay,
//   handleRemoveItem,
//   cartItems,
//   subtotal,
//   deliveryFee,
//   totalPrices,
//   handleCounterChange,
//   user 
//   setTotalItems
// }) {
//   const [tax, setTax] = useState(null);
//   useEffect(() => {
//     // Fetch tax data when the component mounts
//     const fetchTax = async () => {
//       try {
//         const response = await axios.get(API_TAX);
//         const taxValue = response.data.data.settings.tax;
//         setTax(taxValue);
//         console.log(response.data.data.settings.tax);
//       } catch (error) {
//         console.error("Error fetching tax data:", error);
//       }
//     };

//     fetchTax();
//   }, []);

//   const taxAmount = (subtotal * tax) / 100;
//   const totalWithTax = subtotal + deliveryFee + taxAmount;

//   return (
//     <Container
//       sx={{
//         maxWidth: "600px !important",
//         background: "#fff !important",
//         position: "sticky",
//         margin: "0 auto",
//         mr: "50px",
//         mt: "15px",
//         p: "0px !important",
//         border: "1px solid #dee2e6!important",
//         borderRadius: ".25rem !important",
//         boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
//          "@media (max-width: 1000px)": {
//           // Adjust based on your needs
//           margin: "0 auto ",
//           mt:"2rem"
//         },
//       }}
//     >
//       <Box
//         className="headerOrderOnline"
//         direction={"row"}
//         alignItems={"center"}
//         sx={{ p: 1, borderBottom: "1px solid #999" }}
//       >
//         <img
//           className="imgOrder"
//           alt="Image"
//           width="150px"
//           height="150px"
//           src={imgLogo}
//         />
//         <Typography
//           sx={{
//             fontSize: "18px",
//             fontWeight: 700,
//             ml: 2,
//             fontFamily: "cairo",
//           }}
//         >
//           chilis
//         </Typography>
//       </Box>

//       <Container sx={{ margin: "0 auto" }}>
//         <Box
//           className="orderNow"
//           sx={{
//             borderRadius: "8px",
//           }}
//         >
//           {cartItems.length === 0
//             ? null
//             : cartItems.map((item, index) => (
//                 <Card key={index} sx={{ p: 2, mb: 3 }}>
//                   <Stack sx={{ position: "relative" }}>
//                     <Stack
//                       sx={{ display: "flex" }}
//                       direction={"row"}
//                       alignItems={"center"}
//                     >
//                       <Typography
//                         sx={{
//                           color: "#000",
//                           fontSize: "15px",
//                           fontWeight: 500,
//                           fontFamily: "cairo",
//                         }}
//                       >
//                         {item.name}
//                       </Typography>
//                       <Typography
//                         onClick={() => handleRemoveItem(index)}
//                         sx={{
//                           color: "red",
//                           position: "absolute",
//                           right: "-11px",
//                           top: "-13px",
//                           cursor: "pointer",
//                           fontSize: "1.8rem",
//                           fontWeight: "bold",
//                           fontFamily: "cairo",
//                           "&:hover": {
//                             color: "#e31616!important",
//                           },
//                         }}
//                       >
//                         X
//                       </Typography>
//                     </Stack>

//                     <Stack
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         m: "10px 0 10px 0",
//                       }}
//                       direction={"row"}
//                       alignItems={"center"}
//                     >
//                       <Typography
//                         sx={{
//                           color: "#17a2b8!important",
//                           fontSize: "2rem",
//                           fontWeight: 400,
//                           fontFamily: "cairo",
//                         }}
//                       >
//                         {item.name}
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color: "#17a2b8!important",
//                           fontSize: "15px",
//                           fontWeight: 500,
//                           fontFamily: "cairo",
//                         }}
//                       >
//                         {item.price} EGP
//                       </Typography>
//                       <Counter
//                         basePrice={item.price}
//                         onChange={(newTotalPrice) =>
//                           handleCounterChange(index, newTotalPrice)
//                         }
//                       />
//                     </Stack>
//                     <Stack
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                       direction={"row"}
//                       alignItems={"center"}
//                     >
//                       <Typography
//                         sx={{
//                           color: "#424242 !important",
//                           fontSize: "1.4rem",
//                           fontWeight: 500,
//                         }}
//                       >
//                         Regular
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color: "#6c757d!important",
//                           fontSize: "1.4rem",
//                           fontWeight: 500,
//                         }}
//                       >
//                         {totalPrices[index] || item.price} EGP
//                       </Typography>
//                     </Stack>
//                     <TextField
//                       placeholder="Enter any special request note"
//                       sx={{
//                         transition: "1s",
//                         "& input::placeholder": {
//                           color: "gray",
//                           fontSize: "13px",
//                           textAlign: "center",
//                         },
//                       }}
//                     />
//                   </Stack>
//                 </Card>
//               ))}
//         </Box>
//       </Container>

//       <Stack className="middleOrder" sx={{ p: 2 }}>
//         <TextField
//           className="formControl"
//           id="outlined-basic"
//           placeholder="Any notes? please enter it here."
//           fullWidth
//           multiline
//           minRows={5}
//           sx={{
//             width: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//             transition: ".5s",
//             "& input::placeholder": {
//               color: "red",
//               fontSize: "22px",
//               textAlign: "center",
//             },
//           }}
//         />
//       </Stack>

//       <Stack className="Delivery" sx={{ m: 2, p: 2 }}>
//         <Stack
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//           direction={"row"}
//           alignItems={"center"}
//         >
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             Subtotal:
//           </Typography>{" "}
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             {subtotal} EGP
//           </Typography>
//         </Stack>
//         <Stack
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//           direction={"row"}
//           alignItems={"center"}
//         >
//           <Typography
//             sx={{
//               fontSize: "15px",
//               fontWeight: "bold",
//               my: 2,
//             }}
//           >
//             Delivery Fee:{" "}
//           </Typography>{" "}
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             {deliveryFee} EGP
//           </Typography>
//         </Stack>
//         <Stack
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//           direction={"row"}
//           alignItems={"center"}
//         >
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             {/* Tax ({tax} %): */}
//           </Typography>
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             {/* {taxAmount.toFixed(2)} EGP */}
//           </Typography>
//         </Stack>
//         <Stack
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//           direction={"row"}
//           alignItems={"center"}
//         >
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             Total:
//           </Typography>
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             {" "}
//             {totalWithTax.toFixed(2)} EGP
//           </Typography>
//         </Stack>
//         <Stack className="stackBtn" sx={{ p: 2 }}>
//           <Button
//             color="error"
//             variant="contained"
//             className="placeOrderBtn"
//             disabled={cartItems.length === 0}
//           >
//             PLACE ORDER
//           </Button>
//         </Stack>
//       </Stack>
//     </Container>
//   );
// }

// export default CheckOut;
/* eslint-disable react/prop-types */
// import {
//   Box,
//   Stack,
//   TextField,
//   Typography,
//   Card,
//   Container,
//   Button,
// } from "@mui/material";
// import "../OrderOnline.css";
// import imgLogo from "../../../../Hero/images/logo.png";
// import Counter from "../../../ButtonsMenu/CounterDiaolgButton";
// import { API_TAX } from "../../../apis&fetchData/ApiLinks";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function CheckOut({
//   totalToPay,
//   handleRemoveItem,
//   cartItems,
//   subtotal,
//   deliveryFee,
//   totalPrices,
//   handleCounterChange,
//   user,
//   setTotalItems
// }) {
//   const [tax, setTax] = useState(0);
//   const [totalWithTax, setTotalWithTax] = useState(0);

//   useEffect(() => {
//     // Fetch tax data when the component mounts
//     const fetchTax = async () => {
//       try {
//         const response = await axios.get(API_TAX);
//         const taxValue = response.data.data.settings.tax;
//         setTax(taxValue);
//         console.log(response.data.data.settings.tax);
//       } catch (error) {
//         console.error("Error fetching tax data:", error);
//       }
//     };

//     fetchTax();
//   }, []);

//   useEffect(() => {
//     const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//     const taxAmount = (subtotal * tax) / 100;
//     setTotalWithTax(subtotal + deliveryFee + taxAmount);
//   }, [cartItems, tax, deliveryFee]);

//   return (
//     <Container
//       sx={{
//         maxWidth: "600px !important",
//         background: "#fff !important",
//         position: "sticky",
//         margin: "0 auto",
//         mr: "50px",
//         mt: "15px",
//         p: "0px !important",
//         border: "1px solid #dee2e6!important",
//         borderRadius: ".25rem !important",
//         boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
//         "@media (max-width: 1000px)": {
//           margin: "0 auto",
//           mt: "2rem",
//         },
//       }}
//     >
//       <Box
//         className="headerOrderOnline"
//         direction={"row"}
//         alignItems={"center"}
//         sx={{ p: 1, borderBottom: "1px solid #999" }}
//       >
//         <img
//           className="imgOrder"
//           alt="Image"
//           width="150px"
//           height="150px"
//           src={imgLogo}
//         />
//         <Typography
//           sx={{
//             fontSize: "18px",
//             fontWeight: 700,
//             ml: 2,
//             fontFamily: "cairo",
//           }}
//         >
//           chilis
//         </Typography>
//       </Box>

//       <Container sx={{ margin: "0 auto" }}>
//         <Box
//           className="orderNow"
//           sx={{
//             borderRadius: "8px",
//           }}
//         >
//           {cartItems.length === 0
//             ? null
//             : cartItems.map((item, index) => (
//                 <Card key={index} sx={{ p: 2, mb: 3 }}>
//                   <Stack sx={{ position: "relative" }}>
//                     <Stack
//                       sx={{ display: "flex" }}
//                       direction={"row"}
//                       alignItems={"center"}
//                     >
//                       <Typography
//                         sx={{
//                           color: "#000",
//                           fontSize: "15px",
//                           fontWeight: 500,
//                           fontFamily: "cairo",
//                         }}
//                       >
//                         {item.name}
//                       </Typography>
//                       <Typography
//                         onClick={() => handleRemoveItem(index)}
//                         sx={{
//                           color: "red",
//                           position: "absolute",
//                           right: "-11px",
//                           top: "-13px",
//                           cursor: "pointer",
//                           fontSize: "1.8rem",
//                           fontWeight: "bold",
//                           fontFamily: "cairo",
//                           "&:hover": {
//                             color: "#e31616!important",
//                           },
//                         }}
//                       >
//                         X
//                       </Typography>
//                     </Stack>

//                     <Stack
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         m: "10px 0 10px 0",
//                       }}
//                       direction={"row"}
//                       alignItems={"center"}
//                     >
//                       <Typography
//                         sx={{
//                           color: "#17a2b8!important",
//                           fontSize: "2rem",
//                           fontWeight: 400,
//                           fontFamily: "cairo",
//                         }}
//                       >
//                         {item.name}
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color: "#17a2b8!important",
//                           fontSize: "15px",
//                           fontWeight: 500,
//                           fontFamily: "cairo",
//                         }}
//                       >
//                         {item.price} EGP
//                       </Typography>
//                       <Counter
//                         basePrice={item.price}
//                         onChange={(newTotalPrice) =>
//                           handleCounterChange(index, newTotalPrice)
//                         }
//                       />
//                     </Stack>
//                     <Stack
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                       direction={"row"}
//                       alignItems={"center"}
//                     >
//                       <Typography
//                         sx={{
//                           color: "#424242 !important",
//                           fontSize: "1.4rem",
//                           fontWeight: 500,
//                         }}
//                       >
//                         Regular
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color: "#6c757d!important",
//                           fontSize: "1.4rem",
//                           fontWeight: 500,
//                         }}
//                       >
//                         {totalPrices[index] || item.price} EGP
//                       </Typography>
//                     </Stack>
//                     <TextField
//                       placeholder="Enter any special request note"
//                       sx={{
//                         transition: "1s",
//                         "& input::placeholder": {
//                           color: "gray",
//                           fontSize: "13px",
//                           textAlign: "center",
//                         },
//                       }}
//                     />
//                   </Stack>
//                 </Card>
//               ))}
//         </Box>
//       </Container>

//       <Stack className="middleOrder" sx={{ p: 2 }}>
//         <TextField
//           className="formControl"
//           id="outlined-basic"
//           placeholder="Any notes? please enter it here."
//           fullWidth
//           multiline
//           minRows={5}
//           sx={{
//             width: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//             transition: ".5s",
//             "& input::placeholder": {
//               color: "red",
//               fontSize: "22px",
//               textAlign: "center",
//             },
//           }}
//         />
//       </Stack>

//       <Stack className="Delivery" sx={{ m: 2, p: 2 }}>
//         <Stack
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//           direction={"row"}
//           alignItems={"center"}
//         >
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             Subtotal:
//           </Typography>{" "}
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             {subtotal} EGP
//           </Typography>
//         </Stack>
//         <Stack
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//           direction={"row"}
//           alignItems={"center"}
//         >
//           <Typography
//             sx={{
//               fontSize: "15px",
//               fontWeight: "bold",
//               my: 2,
//             }}
//           >
//             Delivery Fee:{" "}
//           </Typography>{" "}
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             {deliveryFee} EGP
//           </Typography>
//         </Stack>
//         <Stack
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//           direction={"row"}
//           alignItems={"center"}
//         >
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             Tax ({tax} %):
//           </Typography>
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             {(subtotal * tax / 100).toFixed(2)} EGP
//           </Typography>
//         </Stack>
//         <Stack
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//           direction={"row"}
//           alignItems={"center"}
//         >
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             Total:
//           </Typography>
//           <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
//             {" "}
//             {totalWithTax.toFixed(2)} EGP
//           </Typography>
//         </Stack>
//         <Stack className="stackBtn" sx={{ p: 2 }}>
//           <Button
//             color="error"
//             variant="contained"
//             className="placeOrderBtn"
//             disabled={cartItems.length === 0}
//           >
//             PLACE ORDER
//           </Button>
//         </Stack>
//       </Stack>
//     </Container>
//   );
// }

// export default CheckOut;
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Card,
  Container,
  Button,
} from "@mui/material";
import "../OrderOnline.css";
import imgLogo from "../../../../Hero/images/logo.png";
import Counter from "../../../ButtonsMenu/CounterDiaolgButton";
import { API_TAX } from "../../../apis&fetchData/ApiLinks";
import { useEffect, useState } from "react";
import axios from "axios";

function CheckOut({ handleRemoveItem, handleCounterChange,  deliveryFee, }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);

  useEffect(() => {
    // Fetch tax data when the component mounts
    const fetchTax = async () => {
      try {
        const response = await axios.get(API_TAX);
        const taxValue = response.data.data.settings.tax;
        setTax(taxValue);
        console.log(response.data.data.settings.tax);
      } catch (error) {
        console.error("Error fetching tax data:", error);
      }
    };

    fetchTax();
  }, []);

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxAmount = (subtotal * tax) / 100;
    setTotalWithTax(subtotal + deliveryFee + taxAmount);
  }, [cartItems, tax, deliveryFee]);

  return (
    <Container
      sx={{
        maxWidth: "600px !important",
        background: "#fff !important",
        position: "sticky",
        margin: "0 auto",
        mr: "50px",
        mt: "15px",
        p: "0px !important",
        border: "1px solid #dee2e6!important",
        borderRadius: ".25rem !important",
        boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
        "@media (max-width: 1000px)": {
          margin: "0 auto",
          mt: "2rem",
        },
      }}
    >
      <Box
        className="headerOrderOnline"
        direction={"row"}
        alignItems={"center"}
        sx={{ p: 1, borderBottom: "1px solid #999" }}
      >
        <img
          className="imgOrder"
          alt="Image logo"
          src={imgLogo}
          width={80}
          height={80}
          style={{ marginRight: 10 }}
        />
        <Typography
          sx={{
            color: "#2e7d32",
            fontSize: "2.2rem",
            fontFamily: "cairo",
            fontWeight: "bold",
          }}
        >
          Order
        </Typography>
      </Box>
      {cartItems.length > 0 ? (
        <Stack gap={2} sx={{ p: 3 }}>
          {cartItems.map((item, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Typography>{item.name}</Typography>
              <Counter
                quantity={item.quantity}
                onIncrease={() => handleCounterChange(item, item.quantity + 1)}
                onDecrease={() => handleCounterChange(item, item.quantity - 1)}
              />
              <Typography>{item.price * item.quantity}</Typography>
              <Button onClick={() => handleRemoveItem(item)}>Remove</Button>
            </Card>
          ))}
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography>Subtotal:</Typography>
            <Typography>
              {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography>Tax:</Typography>
            <Typography>{tax}%</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography>Total:</Typography>
            <Typography>{totalWithTax.toFixed(2)}</Typography>
          </Stack>
        </Stack>
      ) : (
        <Typography
          sx={{
            fontSize: "1.6rem",
            fontFamily: "cairo",
            fontWeight: "bold",
            p: 3,
            textAlign: "center",
          }}
        >
          Your cart is empty
        </Typography>
      )}
    </Container>
  );
}

export default CheckOut;
