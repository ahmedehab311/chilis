/* eslint-disable react/prop-types */
import { Grid, Typography, Card, CardMedia } from "@mui/material";
import { BASE_URL_images, OrderButton } from "../index";
import { useTranslation } from "react-i18next";
const ItemCard = ({ handleItemClick, selectedItem }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
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
            {t("readMore" ) }
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
        {isArabic ? selectedItem.name_ar : selectedItem.name_en}
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
                  {isArabic ? item.name_ar : item.name_en}
                </Typography>

                <CardMedia
                  component="img"
                  height="140"
                  image={`${BASE_URL_images}${item.image}`}
                  alt={isArabic ? item.description_ar : item.description_en}
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
                  {isArabic ? item.name_ar : item.name_en}
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
                  {truncateText(
                    isArabic ? item.description_ar : item.description_en,
                    60
                  )}
                </Typography>
                <Typography sx={{ fontSize: "18px", color: "#777" }}>
                  {isArabic ? item.name_ar : item.name_en}
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
