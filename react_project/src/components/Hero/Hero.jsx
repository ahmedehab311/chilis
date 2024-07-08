import logo from "./images/logooo.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box, Stack } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider/Slider.css";
import { images } from "./imagesArray";

function Hero() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          // mt: 2.5,
          alignItems: "center",
          position: "relative",
        }}
        className="hero"
      >
        <Stack>
          <img src={logo} className="logoImg" alt="logo" />
        </Stack>

        <Swiper
          slidesPerView={1}
          // spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {/* <SwiperSlide>
            <img
              className="img-fluid"
              src={img1}
              style={{
                width: "fitContent",
                height: "500px",
                marginTop: "100px",
              }}
              alt=""
            />
          </SwiperSlide> */}

          {images.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <img
                  className="img-fluid"
                  src={item.img}
                  style={{
                    width: "fitContent",
                    height: "500px",
                    marginTop: "100px",
                  }}
                  alt=""
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </>
  );
}

export default Hero;
