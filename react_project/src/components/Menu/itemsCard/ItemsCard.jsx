/* eslint-disable react/prop-types */
import { Grid, Typography, Card, CardMedia } from "@mui/material";
import { BASE_URL_images, OrderButton } from "../index";
const ItemCard = ({ handleItemClick, selectedItem }) => {
  const truncateText = (text, length) => {
    if (text.length > length) {
      return (
        <>
          {text.slice(0, length)}
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              textTransform: "capitalize",
              color: "#d32f2f",
            }}
          >
            Read More
          </span>
        </>
      );
    }
    return text;
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 2,
          textTransform: "uppercase",
          color: "#fff",
        }}
      >
        {selectedItem ? selectedItem.name_en : ""}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {Array.isArray(selectedItem?.items) &&
          selectedItem.items.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  p: 1,
                  border: "2px solid #fff",
                  background: "#000",
                  borderRadius: "20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "97%",
                }}
                onClick={() => handleItemClick(item)}
              >
                <Typography
                  variant="h3"
                  sx={{
                    mb: 2,
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontSize: "2.4rem",
                    fontWeight: "bold",
                    color: "#c0b56e",
                    fontFamily: "cairo",
                  }}
                >
                  {item.name_en}
                </Typography>

                <CardMedia
                  component="img"
                  height="140"
                  image={`${BASE_URL_images}${item.image}`}
                  alt={item.description_ar}
                  sx={{ objectFit: "cover", width: "100%" }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "left",
                    mb: 2,
                    textTransform: "uppercase",
                    fontSize: "1.5rem",
                    color: "#e8d56a",
                    marginBottom: 0,
                    marginTop: "10px",
                    fontFamily: "Brother  !important",
                  }}
                >
                  {item.name_en}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "20px",
                    my: 1,
                    color: "#fff",
                    textAlign: "left",
                    fontFamily: "uniform !important",
                  }}
                >
                  {truncateText(item.description_en, 60)}
                </Typography>
                <Typography sx={{ fontSize: "18px", color: "#777" }}>
                  {item.price}
                </Typography>
                <OrderButton handleItemClick={handleItemClick} />
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default ItemCard;
