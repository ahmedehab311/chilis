import { Box, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import img from "./main.jpg";
import "./Main.css";
function Main() {
  return (
    <div id="about">
      <Container sx={{ display: "flex", alignItems: "center", mt: 4, ml: 0 }}>
        <Box sx={{ flexGrow: 1 }}>
          <img
            src={img}
            width="500px"
            height="400px"
            alt="img"
            className="imgMain"
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography
            variant="h2"
            className="text"
            sx={{
              mb: 2,
              textTransform: "capitalize",
              fontFamily: "cairo",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            <div
              style={{
                // my: "3rem",
                color: "#000",
                // margin: "5px 0 5px 0 ",
                fontFamily: "cairo",
              }}
            >
              chilis{" "}
              <span style={{ color: "red", fontFamily: "cairo" }}>Egypt</span>
            </div>
            for getting real transparent
          </Typography>
          <Typography
            sx={{
              color: "#555",
              // mt: "1.5rem",
              letterSpacing: 5,
              fontSize: "18px",
              textTransform: "uppercase",
              my:"1rem"
            }}
            fontFamily={"Baskervville SC"}
          >
            discover our food
          </Typography>
          <div className="borderMain"></div>
          <Typography
            sx={{
              mt: "1.1rem",
              mb: 2,
              fontSize: "1.3rem",
              fontWeight: "600",
              color: "#000",
              fontFamily: "uniform",
              "@media (max-width: 1000px)": {
                width: "100% !important",
              },
            }}
          >
            As one of the country's longest-standing international restaurant
            chains, Chili's has been part of the Egyptian dining scene for over
            30 years. In addition to serving American and Tex-Mex cuisine,
            Chili's has become a cherished part of the community, known for its
            warm atmosphere and memorable moments. Having been in business for
            three decades, Chili's hasn't only provided quality food but has
            also become a cherished part of the community. Chili's Egypt's menu
            reflects the global brand's commitment to quality and flavor. More
            than just a restaurant, Chili's Egypt is a place where people meet
            and celebrate life's small and big moments. As a result of the
            friendly and dedicated staff at Chili's, every visit to the
            restaurant is memorable and enjoyable. Chili's remains committed to
            serving quality food in a lively environment as it continues to grow
            and evolve. The Chili's Egypt restaurant is the perfect choice for a
            flavorful adventure, whether you are looking for a casual lunch, a
            family dinner, or a night out with friends. A new era in Egypt has
            begun with Elite line holding company since 2024. Join us at Chili's
            Egypt and discover why we've been a favorite for 30 incredible
            years. Welcome to Chili's, where every meal is a celebration of good
            times and great food.
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{
              textTransform: "uppercase",
              fontSize: "15px",
              fontWeight: "bold",
            }}
            className="btn"
          >
            read more
          </Button>
          {/* <Stack> */}
        </Box>
      </Container>
    </div>
  );
}

export default Main;
