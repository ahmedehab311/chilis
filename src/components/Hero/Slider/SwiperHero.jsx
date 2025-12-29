/* eslint-disable no-unused-vars */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "../Slider/Slider.css";
import { useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchIamgeSlider } from "./ApiSlider";
import { Label } from "@mui/icons-material";
function SwiperHero() {
  const BASE_URL_images = "https://myres.me/chilis/";
  const {
    data: images,
    isLoadingimages,
    errorimages,
    refetch: refetchimages,
  } = useQuery({
    queryKey: ["imagesList"],
    queryFn: () => fetchIamgeSlider(),
  });
  // console.log("images", images); 
  const swiperRef = useRef(null);
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper && images?.length > 0) {
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, [images]);
   <Label text="Email" />
  return (
    <Box
      className="sli"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {images?.length > 0 && (
        <Swiper
          ref={swiperRef}
          className="swiper-hero"
          pagination={{ clickable: true }}
          loop={true}
          navigation={true}
          modules={[Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="image-container">
                <Box
                  component="img"
                  src={`${BASE_URL_images}${image.image}`}
                  alt={`slide-${index}`}
                  sx={{
                    width: "80%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
}


export default SwiperHero;
