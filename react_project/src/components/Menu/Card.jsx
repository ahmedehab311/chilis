import { useState } from "react";
import { Typography, Box,Stack } from "@mui/material";
import Card from "@mui/material/Card";
import "./card.css";
import { itemes } from "./itemes.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./sliderMenu.css";
import ItemCard from "./ItemCard.jsx";

function Boxx() {
  const [showCards, setShowCards] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setShowCards(false);
  };

  const handleBackClick = () => {
    setShowCards(true);
    setSelectedItem(null);
    setOpen(false);
  };

  return (
    <Box className="box" >
   <Stack>
   <Typography
          sx={{
            textAlign: "center !important",
            fontSize: "33px",
            fontWeight: "bold",
            // color: "#fff",
            my: 2,
          }}
        >
          MENU
        </Typography>
   </Stack>
      {showCards ? (
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          sx={{p:2}}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {itemes.map((item) => (
            <SwiperSlide key={item.id}>
              <Card
                onClick={() => handleCardClick(item)}
                sx={{
                  maxWidth: 230,
                  p: 1,
                  border: "2px solid #fff",
                  background: "#000",
                  borderRadius: "20px",
                  mx: "auto",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    mb: 2,
                    textTransform: "uppercase",
                    fontSize: "2.5rem",
                  }}
                >
                  {item.title}
                </Typography>
                <img
                  src={item.img}
                  width="50px"
                  style={{ display: "flex", margin: "0 auto" }}
                  alt=""
                />
                <Typography variant="h4" sx={{ fontSize: "20px", my: 1 }}>
                  {item.title2}
                </Typography>
                <Typography sx={{ fontSize: "18px", fontFamily: "Beiruti" }}>
                  {item.category}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ my: 1, fontSize: "12px", color: "#777" }}
                >
                  {item.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography sx={{ color: "#777" }}>{item.price}</Typography>
                  <Typography sx={{ color: "#777" }}>{item.price2}</Typography>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mb: 2, textTransform: "uppercase" }}
          >
            {selectedItem.title}
          </Typography>

          <ItemCard />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Typography
              onClick={handleBackClick}
              sx={{
                cursor: "pointer",
                color: "#fff",
                textDecoration: "underline",
                fontSize: "22px",
              }}
            >
              Go Back
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Boxx;
