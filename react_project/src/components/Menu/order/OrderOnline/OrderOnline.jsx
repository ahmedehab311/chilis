import { Box, Button, Stack, TextField, Typography, Card, Container } from "@mui/material";
// import { useCart } from "../../../hooks/CardContext";
import "./OrderOnline.css";
import imgLogo from "../../../Hero/images/logo.png";
import CounterBtn from "../../ButtonsMenu/CounterDiaolgButton";

function OrderOnline() {
  // const { cart, removeFromCart } = useCart();

  return (
 <>
<Stack sx={{display:"flex"}} direction={"row"} alignItems={"center"}>


    <Stack>
    <Typography>
    Your Delivery Address List
    </Typography>  
    
    </Stack>
    <Container sx={{ margin: "0 auto", border: "2px solid #dcc" }}>
      <Stack
        className="headerOrderOnline"
        direction={"row"}
        alignItems={"center"}
      >
        <img
          className="imgOrder"
          alt="Image"
          width="150px"
          height="150px"
          src={imgLogo}
        />
        <Typography sx={{ fontSize: "18px", fontWeight: 700, ml: 2 }}>
          chilis
        </Typography>
      </Stack>

      <Box
        className="orderNow"
        sx={{
          // background: "#a7a7a7",
          p: "10px",
          margin: "10px 0 10px 0",
          borderRadius: "8px",
        }}
      >
        <Card sx={{ p: 2, mb: 2 }}>
          <Stack
            direction={"column"}
            spacing={2}
            alignItems={"flex-start"}
            sx={{ width: "100%" }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ width: "100%" }}
            >
              <Typography sx={{ color: "#fff", fontSize: "15px", fontWeight: 500 }}>
                wings trio Original
              </Typography>
              <Typography
                sx={{
                  color: "red",
                  fontSize: "15px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                X
              </Typography>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ width: "100%" }}
            >
              <Typography
                sx={{
                  color: "#17a2b8",
                  fontSize: "18px",
                  fontWeight: "bold !important",
                }}
              >
                wings trio Original
              </Typography>
              <Typography
                sx={{ color: "#17a2b8", fontSize: "18px", fontWeight: 600 }}
              >
                265 EGP
              </Typography>
              <CounterBtn />
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ width: "100%" }}
            >
              <Typography sx={{ color: "#fff", fontSize: "18px", fontWeight: 500 }}>
                Honey Chipotle
              </Typography>
              <Typography sx={{ color: "#fff", fontSize: "18px", fontWeight: 500 }}>
                265 EGP
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Box>

      <Stack className="middleOrder" sx={{ p: 2 }}>
        <TextField
          id="outlined-basic"
          placeholder="Any notes? please enter it here"
          fullWidth
        />
      </Stack>

      <Stack className="Delivery" sx={{ m: 2, p: 2 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mb: 2 }}
        >
          <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>Subtotal</Typography>
          <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>0 EGP</Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mb: 2 }}
        >
          <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
            Delivery Fees
          </Typography>
          <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>50 EGP</Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>TO PAY</Typography>
          <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>50 EGP</Typography>
        </Stack>
      </Stack>

      <Stack className="stackBtn" sx={{ p: 2 }}>
        <Button
          color="error"
          variant="contained"
          className="placeOrderBtn"
          disabled
        >
          PLACE ORDER
        </Button>
      </Stack>
    </Container>

</Stack>
 </>
  );
}

export default OrderOnline;
