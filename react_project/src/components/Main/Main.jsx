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
                my: 4,
                color: "#000",
                margin: "5px 0 5px 0 ",
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
              mt: 3,
              letterSpacing: 6,
              fontSize: "18px",
              textTransform: "uppercase",
            }}
            fontFamily={"Baskervville SC"}
          >
            discover our food
          </Typography>
          <div className="borderMain"></div>
          <Typography
            sx={{ mt: 3, mb: 2, fontSize: "15px", fontFamily: "uniform" }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut,
            tempore vel, deserunt accusantium eligendi rerum iusto cum dolorum
            nihil neque cumque aperiam blanditiis? Nam odio, minus debitis ea
            saepe in!
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
