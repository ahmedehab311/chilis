// import {
//   Box,
//   Button,
//   Stack,
//   TextField,
//   Typography,
//   Card,
//   Container,
// } from "@mui/material";
// import "./OrderOnline.css";
// import imgLogo from "../../../Hero/images/logo.png";
// import CounterButton from "../../ButtonsMenu/CounterDiaolgButton";
// import { useEffect, useState } from "react";

// function OrderOnline() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     // Get cart items from localStorage on component mount
//     const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(storedCartItems);
//   }, []);

//   const handleRemoveItem = (index) => {
//     // Get existing cart from localStorage
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     // Remove the item at the specified index
//     cart.splice(index, 1);

//     // Save the updated cart back to localStorage
//     localStorage.setItem("cart", JSON.stringify(cart));

//     // Update the state
//     setCartItems(cart);
//   };

//   return (
//     <Stack sx={{ display: "flex" }} direction={"row"} alignItems={"center"}>
//       <Stack>
//         <Typography>Your Delivery Address List</Typography>
//       </Stack>
//       <Container
//         sx={{
//           margin: "0 auto",

//           boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
//           borderRadius: ".25rem !important",
//           border: "1px solid #dee2e6!important",
//           background: "    background-color: #fff !important;",
//           maxWidth: "600px !important",
//           mr: "50px",
//           mt: "15px",
//           position: "sticky",
//           p: "0px !important",
//         }}
//       >
//         <Box
//           className="headerOrderOnline"
//           direction={"row"}
//           alignItems={"center"}
//           sx={{ p: 1, borderBottom: "1px solid #999" }}
//         >
//           <img
//             className="imgOrder"
//             alt="Image"
//             width="150px"
//             height="150px"
//             src={imgLogo}
//           />
//           <Typography
//             sx={{
//               fontSize: "18px",
//               fontWeight: 700,
//               ml: 2,
//               fontFamily: "cairo",
//             }}
//           >
//             chilis
//           </Typography>
//         </Box>

//         <Container sx={{ margin: "0 auto" }}>
//           <Box
//             className="orderNow"
//             sx={{
//               // p: "10px",
//               // margin: "10px 0 10px 0",
//               borderRadius: "8px",
//             }}
//           >
//             {cartItems.length === 0
//               ? null
//               : cartItems.map((item, index) => (
//                   <Card key={index} sx={{ p: 2, mb: 3 }}>
//                     <Stack
//                       // direction={"row"}
//                       // alignItems={"center"}
//                       // justifyContent={"space-between"}
//                       sx={{ position: "relative" }}
//                     >
//                       <Stack
//                         sx={{ display: "flex" }}
//                         direction={"row"}
//                         alignItems={"center"}
//                       >
//                         <Typography
//                           sx={{
//                             color: "#000",
//                             fontSize: "15px",
//                             fontWeight: 500,
//                             fontFamily: "cairo",
//                           }}
//                         >
//                           {" "}
//                           {item.name}
//                         </Typography>
//                         <Typography
//                           onClick={() => handleRemoveItem(index)}
//                           sx={{
//                             color: "red",
//                             position: "absolute",
//                             right: "-11px",
//                             top: "-13px",
//                             cursor: "pointer",
//                             fontSize: "15px",
//                             fontWeight: 500,
//                             fontFamily: "cairo",
//                           }}
//                         >
//                           X
//                         </Typography>
//                       </Stack>

//                       <Stack
//                         sx={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           m: "10px 0 10px 0",
//                         }}
//                         direction={"row"}
//                         alignItems={"center"}
//                       >
//                         <Typography
//                           sx={{
//                             color: "#17a2b8!important",
//                             fontSize: "13px",
//                             fontWeight: 400,
//                             fontFamily: "cairo",
//                           }}
//                         >
//                           {item.name}
//                         </Typography>
//                         <Typography
//                           sx={{
//                             color: "#17a2b8!important",
//                             fontSize: "15px",
//                             fontWeight: 500,
//                             fontFamily: "cairo",
//                           }}
//                         >
//                           {item.price} EGP
//                         </Typography>
//                         <CounterButton />
//                       </Stack>
//                       <Stack
//                         sx={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                         }}
//                         direction={"row"}
//                         alignItems={"center"}
//                       >
//                         <Typography
//                           sx={{
//                             color: "#424242!important",
//                             fontSize: "15px",
//                             fontWeight: 500,
//                           }}
//                         >
//                           Regular
//                         </Typography>
//                         <Typography
//                           sx={{
//                             color: "#6c757d!important",
//                             fontSize: "15px",
//                             fontWeight: 500,
//                           }}
//                         >
//                           {item.price} EGP
//                         </Typography>
//                       </Stack>
//                       <TextField
//                         placeholder="Enter any special request note"
//                         sx={{
//                           // justifyContent:"center",
//                           // alignItems:"center",
//                           transition: "1s",
//                           "& input::placeholder": {
//                             color: "gray",
//                             fontSize: "13px",
//                             textAlign: "center",
//                           },
//                         }}
//                       />
//                     </Stack>
//                   </Card>
//                 ))}
//           </Box>
//         </Container>

//         <Stack className="middleOrder" sx={{ p: 2 }}>
//           <TextField
//             className="formControl"
//             id="outlined-basic"
//             placeholder="Any notes? please enter it here."
//             fullWidth
//             multiline
//             minRows={5} // هذا يحدد الحد الأدنى لعدد الأسطر
//             sx={{
//               width: "100%",
//               justifyContent: "center",
//               alignItems: "center",
//               transition: ".5s",
//               "& input::placeholder": {
//                 color: "red",
//                 fontSize: "22px",
//                 textAlign: "center",
//               },
//             }}
//           />
//         </Stack>

//         <Stack className="Delivery" sx={{ m: 2, p: 2 }}>
//           <Stack
//             direction={"row"}
//             alignItems={"center"}
//             justifyContent={"space-between"}
//             sx={{ mb: 2 }}
//           >
//             <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
//               Subtotal
//             </Typography>

//             <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
//               0 EGP {/* مجموع كل الارقام اللي في السعر  */}
//             </Typography>
//           </Stack>
//           <Stack
//             direction={"row"}
//             alignItems={"center"}
//             justifyContent={"space-between"}
//             sx={{ mb: 2 }}
//           >
//             <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
//               Delivery Fees
//             </Typography>
//             <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
//               50 EGP
//             </Typography>
//           </Stack>
//           <Stack
//             direction={"row"}
//             alignItems={"center"}
//             justifyContent={"space-between"}
//           >
//             <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
//               TO PAY
//             </Typography>
//             <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
//               50 EGP
//             </Typography>
//           </Stack>
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
//       </Container>
//     </Stack>
//   );
// }

// export default OrderOnline;
import {
  Box,
  Stack,
  TextField,
  Typography,
  Card,
  Container,
} from "@mui/material";
import "./OrderOnline.css";
import imgLogo from "../../../Hero/images/logo.png";
import Counter from "../../ButtonsMenu/CounterDiaolgButton";
import { useEffect, useState } from "react";

function OrderOnline() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrices, setTotalPrices] = useState({});

  useEffect(() => {
    // الحصول على العناصر المخزنة في السلة من localStorage عند تحميل المكون
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);

    // تهيئة الأسعار الإجمالية
    const initialPrices = {};
    storedCartItems.forEach((item, index) => {
      initialPrices[index] = item.price;
    });
    setTotalPrices(initialPrices);
  }, []);

  useEffect(() => {
    // تحديث الأسعار الإجمالية عند تغيير العناصر في السلة
    const updatedPrices = {};
    cartItems.forEach((item, index) => {
      updatedPrices[index] = totalPrices[index] || item.price;
    });
    setTotalPrices(updatedPrices);
  }, [cartItems]);

  const handleCounterChange = (index, newTotalPrice) => {
    setTotalPrices((prevPrices) => ({
      ...prevPrices,
      [index]: newTotalPrice,
    }));
  };

  const handleRemoveItem = (index) => {
    // الحصول على السلة الحالية من localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // إزالة العنصر من السلة
    cart.splice(index, 1);

    // حفظ السلة المحدثة في localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // تحديث الحالة
    setCartItems(cart);
    setTotalPrices((prevPrices) => {
      const newPrices = { ...prevPrices };
      delete newPrices[index];
      return newPrices;
    });
  };

  const subtotal = Object.values(totalPrices).reduce(
    (acc, price) => acc + price,
    0
  );
  const deliveryFee = 50;
  const totalToPay = subtotal + deliveryFee;

  return (
    <Stack sx={{ display: "flex" }} direction={"row"} alignItems={"center"}>
      <Stack>
        {/* <Typography>Your Delivery Address List</Typography> */}
      </Stack>
      <Container
        sx={{
          margin: "0 auto",
          boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
          borderRadius: ".25rem !important",
          border: "1px solid #dee2e6!important",
          background: "#fff !important",
          maxWidth: "600px !important",
          mr: "50px",
          mt: "15px",
          position: "sticky",
          p: "0px !important",
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
            alt="Image"
            width="150px"
            height="150px"
            src={imgLogo}
          />
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              ml: 2,
              fontFamily: "cairo",
            }}
          >
            chilis
          </Typography>
        </Box>

        <Container sx={{ margin: "0 auto" }}>
          <Box
            className="orderNow"
            sx={{
              borderRadius: "8px",
            }}
          >
            {cartItems.length === 0
              ? null
              : cartItems.map((item, index) => (
                  <Card key={index} sx={{ p: 2, mb: 3 }}>
                    <Stack sx={{ position: "relative" }}>
                      <Stack
                        sx={{ display: "flex" }}
                        direction={"row"}
                        alignItems={"center"}
                      >
                        <Typography
                          sx={{
                            color: "#000",
                            fontSize: "15px",
                            fontWeight: 500,
                            fontFamily: "cairo",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          onClick={() => handleRemoveItem(index)}
                          sx={{
                            color: "red",
                            position: "absolute",
                            right: "-11px",
                            top: "-13px",
                            cursor: "pointer",
                            fontSize: "15px",
                            fontWeight: 500,
                            fontFamily: "cairo",
                          }}
                        >
                          X
                        </Typography>
                      </Stack>

                      <Stack
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          m: "10px 0 10px 0",
                        }}
                        direction={"row"}
                        alignItems={"center"}
                      >
                        <Typography
                          sx={{
                            color: "#17a2b8!important",
                            fontSize: "13px",
                            fontWeight: 400,
                            fontFamily: "cairo",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#17a2b8!important",
                            fontSize: "15px",
                            fontWeight: 500,
                            fontFamily: "cairo",
                          }}
                        >
                          {item.price} EGP
                        </Typography>
                        <Counter
                          basePrice={item.price}
                          onChange={(newTotalPrice) =>
                            handleCounterChange(index, newTotalPrice)
                          }
                        />
                      </Stack>
                      <Stack
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        direction={"row"}
                        alignItems={"center"}
                      >
                        <Typography
                          sx={{
                            color: "#424242!important",
                            fontSize: "15px",
                            fontWeight: 500,
                          }}
                        >
                          Regular
                        </Typography>
                        <Typography
                          sx={{
                            color: "#6c757d!important",
                            fontSize: "15px",
                            fontWeight: 500,
                          }}
                        >
                          {totalPrices[index] || item.price} EGP
                        </Typography>
                      </Stack>
                      <TextField
                        placeholder="Enter any special request note"
                        sx={{
                          transition: "1s",
                          "& input::placeholder": {
                            color: "gray",
                            fontSize: "13px",
                            textAlign: "center",
                          },
                        }}
                      />
                    </Stack>
                  </Card>
                ))}
          </Box>
        </Container>

        <Stack className="middleOrder" sx={{ p: 2 }}>
          <TextField
            className="formControl"
            id="outlined-basic"
            placeholder="Any notes? please enter it here."
            fullWidth
            multiline
            minRows={5}
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              transition: ".5s",
              "& input::placeholder": {
                color: "red",
                fontSize: "22px",
                textAlign: "center",
              },
            }}
          />
        </Stack>

        <Stack className="Delivery" sx={{ m: 2, p: 2 }}>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            direction={"row"}
            alignItems={"center"}
          >
            <Typography sx={{ fontWeight: 600 }}>Subtotal:</Typography>{" "}
            <Typography sx={{fontSize:"15px" , fontWeight:"bold"}}>{subtotal} EGP</Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            direction={"row"}
            alignItems={"center"}
          >
            <Typography sx={{ fontWeight: 600, my: 2 }}>
              Delivery Fee:{" "}
            </Typography>{" "}
            <Typography  sx={{fontSize:"15px" , fontWeight:"bold"}}>{deliveryFee} EGP</Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            direction={"row"}
            alignItems={"center"}
          >
            <Typography sx={{ fontWeight: 600 }}>Total:</Typography>{" "}
            <Typography  sx={{fontSize:"15px" , fontWeight:"bold"}}> {totalToPay} EGP</Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}

export default OrderOnline;
