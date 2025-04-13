  import { Swiper, SwiperSlide } from "swiper/react";
  import { Navigation } from "swiper/modules";
  import { Box } from "@mui/material";
  import "swiper/css";
  import "swiper/css/navigation";
  import "../Slider/Slider.css";
import photo1 from "../images/triple_dipper.png"
import photo2 from "../images/ANCHO SALMON 9.24 (1).png"
import photo3 from "../images/GUACAMOLE-BURGER-2--NO-KNIFE-slider.jpg"

  function SwiperHero() {
    const images = [ photo2, photo3, photo1];
    return (
      <Box className="sli">
        <Swiper
          className="swiper-hero"
          pagination={{ clickable: true }}
          loop={true}
          navigation={true}
          modules={[Navigation]}
        >
          {/* {["aa", "aaa"].map((item, index) => (
            <SwiperSlide key={index}>
              <div className="image-container">
                <img src={backGroundRed} alt="" className="image image1" />
              
              </div>
            </SwiperSlide>
          ))} */}
          {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="image-container">
              <img src={image} alt={`slide-${index}`} className="image image1" />
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </Box>
    );
  }

  export default SwiperHero;

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import { Box } from "@mui/material";
// import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage
// import "swiper/css";
// import "swiper/css/navigation";
// import "../Slider/Slider.css";
// import backGroundRed from "../images/Group 2.png";

// function SwiperHero() {
//   return (
//     <Box className="sli">
//       <Swiper
//         className="swiper-hero"
//         pagination={{ clickable: true }}
//         loop={true}
//         navigation={true}
//         modules={[Navigation]}
//       >
//         {["aa", "aaa"].map((item, index) => (
//           <SwiperSlide key={index}>
//             <div className="image-container">
//               <LazyLoadImage
//                 src={backGroundRed} 
//                 alt=""
//                 className="image image1"
//                 effect="black" // Optional: adds a blur effect while loading
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </Box>
//   );
// }

// export default SwiperHero;
