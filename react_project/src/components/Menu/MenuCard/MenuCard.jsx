/* eslint-disable react/prop-types */
import "./MenuCard.css";
import {
  CircularProgress,
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../sliderMenu.css";
import { BASE_URL_images } from "../apis&fetchData/ApiLinks";


function MenuCard({ handleCardClick, menuItems, loading }) {
  return (
    <>
      <Typography
        sx={{
          textAlign: "center !important",
          fontSize: "45px",
          fontWeight: "bold",
          my: 3,
          fontFamily: "cairo",
        }}
        variant="h2"
      >
        MENU
      </Typography>
      <Container sx={{ maxWidth: "100% !important" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Swiper
            className="swiper-menu"
            slidesPerView={1}
            spaceBetween={0.5}
            pagination={{ clickable: true }}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1300: { slidesPerView: 4 },
            }}
          >
            {Array.isArray(menuItems) &&
              menuItems.map((menuItem, index) => (
                <SwiperSlide key={index}>
                  <Card
                    className="card"
                    sx={{
                      maxWidth: 230,
                      py: 3,
                      px: 6,
                      border: "2px solid #fff",
                      background: "#000",
                      borderRadius: "20px",
                      mx: "auto",
                      cursor: "pointer",
                    }}
                    onClick={() => handleCardClick(index)}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: "center",
                        mb: 2,
                        textTransform: "uppercase",
                        fontSize: " 1.8rem",
                        fontWeight: "bold",
                        color: "#c0b56e",
                        fontFamily: "cairo",
                      }}
                    >
                      {menuItem.name_en}
                    </Typography>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${BASE_URL_images}${menuItem.image}`}
                      alt={menuItem.description_ar}
                      sx={{ objectFit: "cover", width: "100%" }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "20px",
                        my: 1,
                        color: "#bbb6b6",
                        fontFamily: "uniform !important",
                        lineHeight: 1.3,
                      }}
                    >
                      {menuItem.description_en}
                    </Typography>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </Container>
    </>
  );
}

export default MenuCard;
