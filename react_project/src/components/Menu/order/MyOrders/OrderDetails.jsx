// import { useState, useEffect } from "react";
// import { Stack, Typography, Card, CardContent, Box } from "@mui/material";
// import { fetchOrderHistory } from "../../../../rtk/slices/myOrderSlice"; // فرضًا لديك هذا السلايس

// function OrderDetails({ order }) {
//   const [orderDetail, setOrderDetail] = useState(null);

//   useEffect(() => {
//     if (order) {
//       // نفترض أن fetchOrderDetails هو إجراء في السلايس لجلب تفاصيل الطلب
//       fetchOrderHistory(order.order_id).then((details) => setOrderDetail(details));
//     }
//   }, [order]);

//   if (!orderDetail) return <Typography>Loading...</Typography>;

//   return (
//     <Stack sx={{ width: "100%", padding: 2 }}>
//       <Card sx={{ backgroundColor: "white" }}>
//         <CardContent>
//           <Typography variant="h4">Order Details</Typography>
//           <Typography variant="h6">Order ID: {orderDetail.order_id}</Typography>
//           <Typography variant="body1">Date: {orderDetail.created_at}</Typography>
//           <Typography variant="body1">Total Payment: {orderDetail.total_payment} EGP</Typography>
//           {/* قم بإضافة المزيد من التفاصيل حسب الحاجة */}
//         </CardContent>
//       </Card>
//     </Stack>
//   );
// }

// export default OrderDetails;
