/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Typography, Card, CardContent, Box } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { fetchOrderHistory } from "../../../../rtk/slices/myOrderSlice";
import {
  fetchOrderDetails,
  clearOrderDetails,
} from "../../../../rtk/slices/MyOrderDetailsSlice";
import img from "./meal.jpg";
import OrderStatus from "./orderStauts";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { BASE_URL_images } from "../../apis&fetchData/ApiLinks";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useTranslation } from "react-i18next";
function MyOrders({ currentStatus }) {
  const { t, i18n } = useTranslation();
  const [showCard, setShowCard] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [activeSection, setActiveSection] = useState("Pending");
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails.orderDetails);
  // console.log("Order Details from Redux:", orderDetails);
  const api_token = localStorage.getItem("token");
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    // console.log("Selected Order ID:", selectedOrderId);
    if (selectedOrderId) {
      dispatch(
        fetchOrderDetails({
          order_id: selectedOrderId,
          api_token: api_token,
        })
      );
    }
  }, [dispatch, selectedOrderId]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrderHistory());
    }
  }, [status, dispatch]);

  const handleSectionClick = (sections) => {
    setActiveSection(sections[0]);
    setSelectedOrderId(null);
    setShowCard(false);
  };

  const filterOrdersByStatus = (status) => {
    // console.log("Filtering by status:", status);
    return orders.filter((order) => {
      // console.log("Order Status:", order.status);
      return order.status.toLowerCase() === status.toLowerCase();
    });
  };

  const handleViewDetailsClick = (order) => {
    setSelectedOrderId(order.order_id);
    setShowCard(true);
    dispatch(clearOrderDetails());
    dispatch(
      fetchOrderDetails({
        order_id: order.order_id,
        api_token: localStorage.getItem("token"),
      })
    );
  };

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",

        }}
      >
        <Typography sx={{
          fontSize: "2rem",
          color: "#666"
        }}>{t("myOrders.Loading...")}</Typography>
      </Box>
    );
  }
  if (status === "failed") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography sx={{
          fontSize: "2rem",
          color: "#666"
        }}>{t("myOrders.Please Try Again")}</Typography>
      </Box>
    );
  }
  const convertNumberToArabic = (number) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(number).replace(/[0-9]/g, (digit) => arabicNumbers[digit]);
  };
  const isArabic = i18n.language === "ar";
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        display: "flex",
        mt: "6rem",
        "@media (max-width: 1000px)": { flexDirection: "column !important" },
      }}
    >
      <Stack
        className="leftSection"
        sx={{
          width: "50%",
          padding: 2,
          border: "1px solid #ddd",
          boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
          "@media (max-width: 500px)": { width: "auto" },
        }}
      >
        <SectionButton
          label={t("myOrders.progress")}
          icon={
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
          }
          active={activeSection === "Pending"}
          onClick={() =>
            handleSectionClick(["Pending", "Processing", "In-way", "new"])
          }
          labelStyle={{
            fontSize: "1.2rem",
            marginLeft: ".5rem",
            fontWeight: "600",
          }}
        />
        <SectionButton
          label={t("myOrders.completed")}
          icon={
            <DoneOutlinedIcon
              sx={{
                background: "#fff",
                border: "1px solid #eff2f5",
                padding: ".5rem .5rem",
                borderRadius: "50px",
                boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
                fontSize: "1.8rem",
                verticalAlign: "bottom",
              }}
              labelStyle={{
                fontSize: "1.2rem",
                marginLeft: ".5rem",
                fontWeight: "600",
              }}
            />
          }
          active={activeSection === "Delivered"}
          onClick={() => handleSectionClick(["Delivered"])}
        />
        <SectionButton
          label={t("myOrders.canceled")}
          icon={
            <CloseOutlinedIcon
              sx={{
                background: "#fff",
                border: "1px solid #eff2f5",
                padding: ".5rem .5rem",
                borderRadius: "50px",
                boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075) !important",
                fontSize: "1.8rem",
                verticalAlign: "bottom",
              }}
              labelStyle={{
                fontSize: "1.2rem",
                marginLeft: ".5rem",
                fontWeight: "600",
              }}
            />
          }
          active={activeSection === "canceled"}
          onClick={() => handleSectionClick(["canceled", "Rejected"])}
        />
      </Stack>

      {/* <Stack className="rightSection" sx={{ width: "70%", padding: 2 }}>
        {filterOrdersByStatus(activeSection).length === 0 && !showCard && (
          <Card sx={{ backgroundColor: "white" }}>
            <CardContent>
              <Typography sx={{ textAlign: "center" }}>
                {t("myOrders.noOrdersFound")}
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </Typography>
            </CardContent>
          </Card>
        )} */}
        <Stack className="rightSection" sx={{ width: "70%", padding: 2 }}>
  {filterOrdersByStatus(activeSection).length === 0 && !showCard && (
    <Card sx={{ backgroundColor: "white" }}>
      <CardContent>
        <Typography sx={{ textAlign: "center" }}>
          {t("myOrders.noOrdersFound")}{" "}
          {t(`myOrders.${activeSection}`)} {/* هنا دمجنا الحالة مع النص */}
        </Typography>
      </CardContent>
    </Card>
  )}
        {filterOrdersByStatus(activeSection).map(
          (order) =>
            !showCard && (
              <OrderCard
                key={order.order_id}
                order={order}
                onViewDetailsClick={handleViewDetailsClick}
              />
            )
        )}
        {showCard && orderDetails && (
          <Card sx={{ mt: "2rem" }}>
            <CardContent sx={{ p: 0 }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ borderBottom: "1px solid #dee2e6!important", p: "1rem" }}
              >
                <CalendarTodayOutlinedIcon
                  sx={{ fontSize: "1.2rem", mr: ".4rem" }}
                />
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    color: "#424242",
                    textAlign: "left",
                  }}
                >
                  {orderDetails.created_at}
                </Typography>
              </Stack>
              <Stack
                sx={{ borderBottom: "1px solid #dee2e6!important", p: "1rem" }}
              >
                {["Pending", "Processing", "In Way", "new"].includes(
                  orderDetails.status
                ) && (
                    <Stack>
                      {/* Pending */}
                      <Stack direction={"row"} alignItems={"center"}>
                        <CheckCircleOutlinedIcon
                          sx={{
                            color:
                              orderDetails.status === "Pending"
                                ? "#28a745!important"
                                : "#dc3545!important",
                            fontSize: "1.5rem",
                            fontWeight: "500",
                            m: ".25rem",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "1.3rem",
                            fontWeight: "400",
                            textAlign: "left",
                          }}
                        >
                          {t("myOrders.pending")}
                        </Typography>
                      </Stack>
                      {/* Processing */}
                      <Stack direction={"row"} alignItems={"center"}>
                        <CheckCircleOutlinedIcon
                          sx={{
                            color:
                              orderDetails.status === "Processing"
                                ? "#28a745!important"
                                : "#dc3545!important",
                            fontSize: "1.5rem",
                            fontWeight: "500",
                            m: ".25rem",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "1.3rem",
                            fontWeight: "400",
                            textAlign: "left",
                          }}
                        >

                          {t("myOrders.processing")}
                        </Typography>
                      </Stack>

                      {/* In Way */}
                      <Stack direction={"row"} alignItems={"center"}>
                        <CheckCircleOutlinedIcon
                          sx={{
                            color:
                              orderDetails.status === "In Way"
                                ? "#28a745!important"
                                : "#dc3545!important",
                            fontSize: "1.5rem",
                            fontWeight: "500",
                            m: ".25rem",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "1.3rem",
                            fontWeight: "400",
                            textAlign: "left",
                          }}
                        >
                          {/* In Way */}
                          {t("myOrders.inWay")}
                        </Typography>
                      </Stack>
                    </Stack>
                  )}

                {/* Completed Section */}
                {orderDetails.status === "Delivered" && (
                  <Stack>
                    <Stack direction={"row"} alignItems={"center"}>
                      <CheckCircleOutlinedIcon
                        sx={{
                          color: "#28a745!important",
                          fontSize: "1.5rem",
                          fontWeight: "500",
                          m: ".25rem",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "1.3rem",
                          fontWeight: "400",
                          textAlign: "left",
                        }}
                      >

                        {t("myOrders.delivered")}
                      </Typography>
                    </Stack>
                  </Stack>
                )}

                {/* Canceled Section */}
                {["Canceled", "Rejected"].includes(orderDetails.status) && (
                  <Stack>
                    <Stack direction={"row"} alignItems={"center"}>
                      <CancelOutlinedIcon
                        sx={{
                          color: "#dc3545!important",
                          fontSize: "1.5rem",
                          fontWeight: "500",
                          m: ".25rem",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "1.3rem",
                          fontWeight: "400",
                          textAlign: "left",
                        }}
                      >
                        {orderDetails.status === "Canceled"
                          ? "Canceled"
                          : "Rejected"}
                      </Typography>
                    </Stack>
                  </Stack>
                )}
              </Stack>

              <Stack
                sx={{ borderBottom: "1px solid #dee2e6!important", p: "1rem" }}
              >
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    mb: ".5rem",
                    lineHeight: "1.2",
                    fontWeight: "600",
                    color: "#424242",
                    textAlign: "left",
                  }}
                >
                  {t("myOrders.destination")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    lineHeight: "1.2",
                    fontWeight: "400",
                    color: "#424242",
                    textAlign: "left",
                  }}
                >
                  {orderDetails.address[0].address1}
                </Typography>
              </Stack>
              <div>
                {orderDetails.items.map((item, index) => (
                  <Stack
                    key={index}
                    sx={{
                      borderBottom: "1px solid #dee2e6!important",
                      p: "1rem",
                    }}
                  >
                    <Stack direction={"row"} alignItems={"center"}>
                      <img
                        src={`${BASE_URL_images}${item.info[0].image}`}
                        alt="item image"
                        style={{ width: "100px", height: "auto", m: "1rem" }}
                      />
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: "500",
                          color: "#424242",
                          textAlign: "top",
                          ml: ".8rem",
                        }}
                      >
                        {i18n.language === "ar"
                          ? item.info[0].size_ar
                          : item.info[0].size_en}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      sx={{ justifyContent: "space-between", mb: ".5rem" }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.6rem",
                          fontWeight: "600",
                          color: "#17a2b8!important",
                          mt: ".8rem",
                        }}
                      >
                        {i18n.language === "ar"
                          ? item.info[0].size_ar
                          : item.info[0].size_en}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1.6rem",
                          fontWeight: "600",
                          color: "#17a2b8!important",
                          textAlign: "top",
                        }}
                      >
                        {isArabic
                          ? convertNumberToArabic(item.total_price)
                          : item.total_price}{" "}
                        {t("egp")}
                        {/* {item.total_price} {t("egp")} */}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </div>
              <Stack
                sx={{ borderBottom: "1px solid #dee2e6!important", p: "1rem" }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.7rem",
                      fontWeight: "500",
                      color: "#424242",
                    }}
                  >
                    {t("Subtotal")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.7rem",
                      fontWeight: "500",
                      color: "#424242",
                    }}
                  >
                    {" "}
                    {/* {orderDetails.sub_total} {t("egp")} */}
                    {isArabic
                      ? convertNumberToArabic(orderDetails.sub_total)
                      : orderDetails.sub_total}{" "}
                    {t("egp")}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.7rem",
                      fontWeight: "500",
                      color: "#424242",
                    }}
                  >
                    {t("myOrders.discount")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.7rem",
                      fontWeight: "500",
                      color: "#424242",
                    }}
                  >

                    {isArabic
                      ? convertNumberToArabic(orderDetails.special_discount)
                      : orderDetails.special_discount}{" "}
                    {t("egp")}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.7rem",
                      fontWeight: "500",
                      color: "#424242",
                    }}
                  >
                    {t("myOrders.vat")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.7rem",
                      fontWeight: "500",
                      color: "#424242",
                    }}
                  >
                    {" "}
                    {/* {orderDetails.tax_fees} */}
                    {isArabic
                      ? convertNumberToArabic(orderDetails.tax_fees)
                      : orderDetails.tax_fees}{" "}
                    {t("egp")}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.7rem",
                      fontWeight: "500",
                      color: "#424242",
                    }}
                  >

                    {t("Delivery Fee")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.7rem",
                      fontWeight: "500",
                      color: "#424242",
                    }}
                  >
                    {/* {orderDetails.delivery_fees} */}
                    {isArabic
                      ? convertNumberToArabic(orderDetails.delivery_fees)
                      : orderDetails.delivery_fees}{" "}
                    {t("egp")}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{
                  justifyContent: "space-between",
                  mb: ".5rem",
                  borderBottom: "1px solid #dee2e6!important",
                  p: "1rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.9rem",
                    fontWeight: "bold",
                    color: "#424242",
                  }}
                >
                  {t("Total")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.9rem",
                    fontWeight: "bold",
                    color: "#424242",
                  }}
                >
                  {/* {orderDetails.total} */}
                  {isArabic
                    ? convertNumberToArabic(orderDetails.total)
                    : orderDetails.total}{" "}
                  {t("egp")}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  color: "#000",
                  p: "1rem",
                }}
              >
                {t("myOrders.thankYouOrder")}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Stack>
  );
}

function SectionButton({ label, icon, active, onClick }) {
  return (
    <Stack
      sx={{
        padding: "1rem",
        backgroundColor: active ? "#f0f0f0" : "white",
        cursor: "pointer",
        mb: 1,
        borderRadius: 1,
      }}
      onClick={onClick}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {icon}
        <Typography sx={{ fontSize: "1.2rem", ml: ".5rem", fontWeight: "600" }}>
          {label}
        </Typography>
      </Stack>
    </Stack>
  );
}

// import { useTranslation } from "react-i18next";
function OrderCard({ order, onViewDetailsClick }) {

  const { t,i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const convertNumberToArabic = (number) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(number).replace(/[0-9]/g, (digit) => arabicNumbers[digit]);
  };
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
                {t("myOrders.totalPayment")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "#343a40!important",
                  fontWeight: "bold",
                }}
              >

                {isArabic
                  ? convertNumberToArabic(order.total)
                  : order.total}{" "}
                {t("egp")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default MyOrders;
