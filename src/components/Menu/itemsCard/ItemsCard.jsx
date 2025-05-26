/* eslint-disable react/prop-types */
import { Grid, Typography, Card, CardMedia } from "@mui/material";
import { BASE_URL_images, OrderButton } from "../index";
import { useTranslation } from "react-i18next";
const ItemCard = ({ handleItemClick, selectedItem }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const truncateText = (text, length) => {
    if (text.length > length) {
      const slicedText = text.slice(0, length).trimEnd();
      return (
        <>
          {slicedText}
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              textTransform: "uppercase",
              color: "#d32f2f",
       
            }}
          >
            {t("readMore")}
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
          fontFamily: "BlackFont",
          fontWeight: "bold",
          letterSpacing: "2px",
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
                  // background: "#000",
                  background: "#22235b",
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
                    color: "#fff",
                    fontFamily: "BlackFont",
                    letterSpacing: "2px",
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
                  variant="h5"
                  sx={{
                    fontSize: "20px",
                    my: 1,
                    color: "#fff",
                    textAlign: "left",
        fontFamily: "tahoma",
                    // fontWeight: "bold",
                  }}
                >
                  {truncateText(
  (isArabic ? item.description_ar : item.description_en).trim(),
  60
)}
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
