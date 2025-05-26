import logo from "./images/logo.png";
import { Stack } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider/Slider.css";
import "./Slider/Slider.css";
import SwiperHero from "./Slider/SwiperHero";
import "./hero.css";
import { useLocation } from "react-router-dom";
function Hero() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  if (!isHomePage) {
    return null;
  }
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          width: "100vw",
          height: "70vh",
          alignItems: "center",
          position: "relative",
        }}
        className="hero"
      >
        <Stack>
          <img src={logo} className="logoImg" alt="logo" />
        </Stack>

        <SwiperHero className="swiper-hero" />
      </Stack>
    </>
  );
}

export default Hero;
