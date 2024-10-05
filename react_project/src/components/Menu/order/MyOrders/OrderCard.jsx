import { useTranslation } from "react-i18next";
function OrderCard({ order, onViewDetailsClick }) {

  const { t } = useTranslation();
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Stack direction={"row"} alignItems={"center"}>
          <Stack direction={"row"} alignItems={"center"}>
            <Stack
              sx={{
                width: "180px",
                height: "90px",
                padding: "8px",
                borderRadius: ".5rem",
                border: "1px solid #f8f9fa",
                transition: "background-color 0.9s ease",
                cursor: "pointer",
                mr: "1.5rem",
                boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                },
              }}
            >
              <Box
                component="img"
                src={img}
                alt="logo"
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: ".5rem",
                  objectFit: "contain",
                }}
              />
            </Stack>
            <Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <Typography sx={{ fontSize: "2rem", color: "#000 " }}>
                  Order
                </Typography>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "600",
                    ml: ".5rem",
                    color: "#17a2b8!important",
                  }}
                >
                  {order.order_id}
                </Typography>
                {/* <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "600",
                    ml: ".5rem",
                    color: "#17a2b8!important",
                  }}
                >
                  {order.status}
                </Typography> */}
              </Stack>
              <Typography
                onClick={() => onViewDetailsClick(order)}
                sx={{
                  border: "2px solid #bd946d",
                  textAlign: "center",
                  width: "fit-content",
                  mt: "1.3rem",
                  p: ".8rem 2rem",
                  fontSize: "1.6rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition:
                    "background-color 0.6s ease, color 0.6s ease, border-color 0.6s ease",
                  borderRadius: ".8rem",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(135deg, #cea076 0%, #bd946d 100%)",
                    borderColor: "#cea076",
                  },
                }}
              >
                {t("myOrders.viewDetails")}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ ml: "auto" }}>
            <Typography
              variant="h6"
              sx={{
                background: "linear-gradient(45deg, #613233 0%, #663435 100%)",
                color: "#fff",
                textAlign: "center",
                width: "fit-content",
                mt: "1.3rem",
                p: ".5rem 6rem",
                fontSize: "1.3rem",
                fontWeight: "500",
                borderRadius: ".8rem",
                mb: ".9rem",
              }}
            >
              {order.status}
            </Typography>
            <Stack alignItems={"center"} direction={"row"}>
              <AccessTimeOutlinedIcon sx={{ mr: ".4rem" }} />
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "#424242",
                  fontWeight: "bold",
                }}
              >
                {order.created_at}
              </Typography>
            </Stack>
            <Stack>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "#6c757d!important",
                  fontWeight: "600",
                }}
              >
                Total Payment
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "#343a40!important",
                  fontWeight: "bold",
                }}
              >
                {order.total}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default MyOrders;