import { Box, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import img from "./main.jpg";
function Main() {
  return (
    <div id="about">
      <Container
        sx={{ display: "flex", alignItems: "center", flexGrow: 1, mt: 4 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <img
            src={img}
            width="500px"
            height="400px"
            alt="img"
            className="img"
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography
            variant="h2"
            className="text"
            sx={{ fontSize: "20px", mb: 2, textTransform: "capitalize" }}
          >
            <div style={{ marginBottom: 4 }}>
              chilis <span style={{ color: "red" }}>Egypt</span>
            </div>
            for getting real transparent
          </Typography>
          <Typography
            sx={{
              color: "#555",
              mt: 3,
              // mb: 2,
              letterSpacing: 6,
              fontSize: "18px",
              textTransform: "uppercase",
            }}
            fontFamily={"Baskervville SC"}
          >
            discover our food
          </Typography>
          <div className="borderMain"></div>
          <Typography sx={{ mt: 3, mb: 2, fontSize: "15px" }}>
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
        </Box>
      </Container>
    </div>
  );
}

export default Main;
