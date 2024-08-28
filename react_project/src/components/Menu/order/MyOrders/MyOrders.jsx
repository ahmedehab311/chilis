import { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Typography, Card, CardContent, Box } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import img from "./meal.jpg";

function MyOrders() {
  const [activeSection, setActiveSection] = useState("progress");
  const [orders, setOrders] = useState([]);
  const api_token = localStorage.getItem("token");
  const API_HESTORY = `http://myres.me/chilis-dev/api/user/history?api_token=${api_token}`;

  useEffect(() => {
    console.log("Fetching order history...");
    axios
      .get(API_HESTORY)
      .then((response) => {
        const ordersData = response.data.data.details;
        console.log("Orders Data:", ordersData);
        ordersData.forEach((order, index) => {
          console.log(`Order ${index + 1}:`, order.status);
        });
        setOrders(ordersData);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  }, [API_HESTORY]);

  const handleSectionClick = (section) => {
    console.log("Active Section Clicked:", section);
    setActiveSection(section);
  };

  const filterOrdersByStatus = (status) => {
    const filteredOrders = orders.filter(
      (order) => order.status.toLowerCase() === status.toLowerCase()
    );
    console.log(`Filtering orders with status '${status}':`, filteredOrders);
    return filteredOrders;
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        display: "flex",
        mt: "6rem",
        "@media (max-width: 1000px)": {
          flexDirection: "column !important",
        },
      }}
    >
      <Stack
        className="leftSection"
        sx={{
          width: "50%",
          padding: 2,
          border: "1px solid #ddd",
          boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
          "@media (max-width: 500px)": {
            width: "auto",
          },
        }}
      >
        <Stack
          className="progress"
          sx={{
            padding: "1rem",
            backgroundColor: activeSection === "progress" ? "#f0f0f0" : "white",
            cursor: "pointer",
            mb: 1,
            borderRadius: 1,
          }}
          onClick={() => handleSectionClick("progress")}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <AccessTimeOutlinedIcon
              sx={{
                background: "#fff",
                border: "1px solid #eff2f5",
                padding: ".5rem .5rem",
                borderRadius: "50px",
                boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
                fontSize: "1.8rem",
                verticalAlign: "bottom",
              }}
            />
            <Typography
              sx={{ fontSize: "1.2rem", ml: ".5rem", fontWeight: "600" }}
            >
              Progress
            </Typography>
          </Stack>
        </Stack>
        <Stack
          className="completed"
          sx={{
            padding: "1rem",
            backgroundColor:
              activeSection === "completed" ? "#f0f0f0" : "white",
            cursor: "pointer",
            mb: 1,
            borderRadius: 1,
          }}
          onClick={() => handleSectionClick("completed")}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <DoneOutlinedIcon
              sx={{
                background: "#fff",
                border: "1px solid #eff2f5",
                padding: "5px 5px",
                borderRadius: "50px",
                boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
                fontSize: "1.8rem",
                verticalAlign: "bottom",
              }}
            />
            <Typography
              sx={{ fontSize: "1.2rem", ml: ".5rem", fontWeight: "600" }}
            >
              Completed
            </Typography>
          </Stack>
        </Stack>
        <Stack
          className="canceled"
          sx={{
            padding: "1rem",
            backgroundColor: activeSection === "canceled" ? "#f0f0f0" : "white",
            cursor: "pointer",
            mb: 1,
            borderRadius: 1,
          }}
          onClick={() => handleSectionClick("canceled")}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <CloseOutlinedIcon
              sx={{
                background: "#fff",
                border: "1px solid #eff2f5",
                padding: "5px 5px",
                borderRadius: "50px",
                boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
                fontSize: "1.8rem",
                verticalAlign: "bottom",
              }}
            />
            <Typography
              sx={{ fontSize: "1.2rem", ml: ".5rem", fontWeight: "600" }}
            >
              Canceled
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack className="rightSection" sx={{ width: "70%", padding: 2 }}>
        {activeSection === "progress" &&
          filterOrdersByStatus("new").length === 0 && (
            <Card sx={{ backgroundColor: "white" }}>
              <CardContent>
                <Typography sx={{ textAlign: "center" }}>
                  No Orders Found in Progress
                </Typography>
              </CardContent>
            </Card>
          )}
        {activeSection === "progress" &&
          filterOrdersByStatus("new").map((order) => (
            <Card key={order.order_id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Stack
                  sx={{ display: "felx" }}
                  direction={"row"}
                  alignItems={"center"}
                >
                  <Stack
                    sx={{ display: "felx" }}
                    direction={"row"}
                    alignItems={"center"}
                  >
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
                        boxShadow:
                          "0 .125rem .25rem rgba(0,0,0,.075)!important",
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
                      </Stack>
                      <Typography
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
                            // color: "inh",
                            borderColor: "#cea076",
                          },
                        }}
                      >
                        View Details
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack sx={{ ml: "auto" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        background:
                          "linear-gradient(45deg, #613233 0%, #663435 100%)",
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
                      progress
                    </Typography>
                    <Stack
                      variant="body2"
                      alignItems={"center"}
                      direction={"row"}
                    >
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
                        657.78 EGP
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}

        {activeSection === "completed" &&
          filterOrdersByStatus("Delivered").length === 0 && (
            <Card sx={{ backgroundColor: "white" }}>
              <CardContent>
                <Typography sx={{ textAlign: "center" }}>
                  No Orders Found Completed
                </Typography>
              </CardContent>
            </Card>
          )}
        {activeSection === "completed" &&
          filterOrdersByStatus("Delivered").map((order) => (
            <Card key={order.order_id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">Order ID: {order.order_id}</Typography>
                <Typography variant="body2">
                  Schedule: {order.schedule}
                </Typography>
              </CardContent>
            </Card>
          ))}

        {activeSection === "canceled" &&
          filterOrdersByStatus("Canceled").length === 0 && (
            <Card sx={{ backgroundColor: "white" }}>
              <CardContent>
                <Typography sx={{ textAlign: "center" }}>
                  No Orders Found Canceled
                </Typography>
              </CardContent>
            </Card>
          )}
        {activeSection === "canceled" &&
          filterOrdersByStatus("Canceled").map((order) => (
            <Card key={order.order_id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">Order ID: {order.order_id}</Typography>
                <Typography variant="body2">
                  Schedule: {order.schedule}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Stack>
    </Stack>
  );
}

export default MyOrders;
