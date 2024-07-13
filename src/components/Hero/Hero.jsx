import logo from "./images/logooo.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box, Container, Stack } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider/Slider.css";
import { images } from "./imagesArray";
import "./Slider/Slider.css"

function Hero() {
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          // mt: 2.5,
          mb:2.5,
          alignItems: "center",
          position: "relative",
        }}
        className="hero"
      >
        <Stack>
          <img src={logo} className="logoImg" alt="logo" />
        </Stack>

   <Box className="sli">
   <Swiper
          // slidesPerView={1}
          // spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {images.map((item) => {
            return (
              <Container key={item.id}>
                <SwiperSlide>
                  <img
                    className="img-fluid"
                    src={item.img}
                    alt=""
                  />
                  {/* <img
                    className="img-fluid"
                    src={item.img}
                    style={{
                      height: "500px",
                      marginTop: "100px",
                    }}
                    alt=""
                  /> */}
                </SwiperSlide>
              </Container>
            );
          })}
        </Swiper>
</Box>
      </Stack>
    </>
  );
}

export default Hero;
