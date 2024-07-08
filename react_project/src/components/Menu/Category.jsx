import { Container, Typography, Box } from "@mui/material";
import Card from "@mui/material/Card";
// import { useNavigate } from "react-router-dom";
import { itemes } from "./itemes.js";

function Category() {
  // const navigate = useNavigate();

  return (
    <Container className="box" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 2, textTransform: "uppercase" }}
      >
        More Cards
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        {itemes.map((item) => (
          <Card
            key={item.id}
            sx={{
              maxWidth: 230,
              p: 1,
              border: "2px solid #fff",
              background: "#000",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                mb: 2,
                textTransform: "uppercase",
                fontSize: "2.5rem",
              }}
            >
              {item.title}
            </Typography>
            <img
              src={item.img}
              width="50px"
              style={{ display: "flex", margin: "0 auto" }}
              alt=""
            />
            <Typography variant="h4" sx={{ fontSize: "20px", my: 1 }}>
              {item.title2}
            </Typography>
            <Typography sx={{ fontSize: "18px", fontFamily: "Beiruti" }}>
              {item.category}
            </Typography>
            <Typography
              variant="body2"
              sx={{ my: 1, fontSize: "12px", color: "#777" }}
            >
              {item.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ color: "#777" }}>{item.price}</Typography>
              <Typography sx={{ color: "#777" }}>{item.price2}</Typography>
            </Box>
          </Card>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", color: "#00f", textDecoration: "underline" }}
        >
          Go Back
        </Typography>
      </Box>
    </Container>
  );
}

export default Category;
