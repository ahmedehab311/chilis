import logo from "./images/logo.png";
import {Stack } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider/Slider.css";
import "./Slider/Slider.css";
import SwiperHero from "./Slider/SwiperHero";
import "./hero.css"
function Hero() {
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          // mt: 2.5,
          mb: 2.5,
          alignItems: "center",
          position: "relative",
        }}
        className="hero"
      >
        <Stack>
          <img src={logo} className="logoImg" alt="logo" />
        </Stack>

        <SwiperHero />
      </Stack>
    </>
  );
}

export default Hero;
