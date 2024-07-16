import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box, Container } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "../Slider/Slider.css";
import { images } from "../imagesArray";
function SwiperHero() {
  return (
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
              <img className="img-fluid" src={item.img} alt="" />
            </SwiperSlide>
          </Container>
        );
      })}
    </Swiper>
 </Box>
  );
}

export default SwiperHero;
