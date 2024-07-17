import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  RadioGroup,
  FormControlLabel,
  TextField,
  Radio,
  Button,
  IconButton,
} from "@mui/material";
import Counter from "./counter.jsx";
import { Stack, Grid } from "@mui/material";
import {
  Typography,
  Box,
  CardMedia,
  Container,
  CircularProgress,
} from "@mui/material";
import Card from "@mui/material/Card";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./card.css";
import "./sliderMenu.css";
import { BackToMenuClick } from "./index.jsx";

function Boxx() {
  const [showCards, setShowCards] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); 
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const APIURL = "https://myres.me/chilis/api/menu/2/1";
  const BASE_URL = "https://myres.me/chilis/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIURL);
        console.log(response.data.data.menu[0].sections);
        setMenuItems(response.data.data.menu[0].sections || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (index) => {
    setSelectedItem(menuItems[index]);
    setSelectedItemIndex(index);
    setShowCards(false);
  };

  const handleBackClick = () => {
    setShowCards(true);
    setSelectedItem(null);
    setOpenDialog(false); // إغلاق الـ Dialog عند الرجوع للقائمة الرئيسية
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpenDialog(true); // فتح الـ Dialog عند الضغط على عنصر
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // إغلاق الـ Dialog عند الضغط على زر "Back to Menu" داخل الـ Dialog نفسه
  };

  return (
    <Box className="box">
      {showCards ? (
        <>
          <Typography
            sx={{
              textAlign: "center !important",
              fontSize: "33px",
              fontWeight: "bold",
              my: 2,
            }}
          >
            MENU
          </Typography>
          <Container sx={{ maxWidth: "100% !important" }}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                  0: { slidesPerView: 1 },
                  600: { slidesPerView: 2 },
                  900: { slidesPerView: 3 },
                  1300: { slidesPerView: 4 },
                }}
              >
                {Array.isArray(menuItems) &&
                  menuItems.map((menuItem, index) => (
                    <SwiperSlide key={index}>
                      <Card
                        className="card"
                        sx={{
                          maxWidth: 230,
                          py: 3,
                          px: 6,
                          border: "2px solid #fff",
                          background: "#000",
                          borderRadius: "20px",
                          mx: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() => handleCardClick(index)}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            textAlign: "center",
                            mb: 2,
                            textTransform: "uppercase",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#c0b56e",
                          }}
                        >
                          {menuItem.name_en}
                        </Typography>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`${BASE_URL}${menuItem.image}`}
                          alt={menuItem.description_ar}
                          sx={{ objectFit: "cover", width: "100%" }}
                        />
                        <Typography
                          variant="h4"
                          sx={{ fontSize: "20px", my: 1, color: "#fff" }}
                        >
                          {menuItem.description_en}
                        </Typography>
                      </Card>
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </Container>
        </>
      ) : (
        <Box sx={{ mt: 4 }}>
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
              selectedItem.items.map((item, index) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
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
                      {item.name_en}
                    </Typography>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${BASE_URL}${item.image}`}
                      alt={item.description_ar}
                      sx={{ objectFit: "cover", width: "100%" }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontSize: "20px", my: 1, color: "#fff" }}
                    >
                      {item.description_en}
                    </Typography>
                    <Typography sx={{ fontSize: "18px", color: "#777" }}>
                      {item.price}
                    </Typography>
                    <IconButton onClick={() => handleItemClick(item)}>
                      <Button variant="contained" color="error">ORDER</Button>
                    </IconButton>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Dialog
            open={openDialog} // استخدام حالة الـ Dialog الجديدة
            onClose={handleCloseDialog}
            aria-labelledby="item-dialog-title"
            aria-describedby="item-dialog-description"
            maxWidth="md"
          >
            <DialogContent
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Box>
                <img
                  src={selectedItem?.image}
                  alt={selectedItem?.name_en}
                  width={300}
                  height={200}
                  className="imgDialog"
                />
              </Box>
              <DialogContentText id="item-dialog-description" sx={{ mx: 3 }}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <DialogTitle id="item-dialog-title">
                    {selectedItem?.name_en}
                  </DialogTitle>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Counter />
                    <span style={{ color: "#000", fontSize: "12px" }}>
                      {selectedItem?.price}
                    </span>
                  </Stack>
                </Stack>
                <div className="borderItem"></div>
                <Typography variant="body1" sx={{ mb: 2, color: "#000" }}>
                  {selectedItem?.description_en}
                </Typography>
                <Stack>
                  <FormControl component="fieldset">
                    <Typography variant="h6" sx={{ color: "#000" }}>
                      Any special request?
                    </Typography>
                  </FormControl>
                  <TextField
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 0, mb: 1 }}
                  />
                  <Stack>
                    <Typography variant="h6" sx={{ color: "#000", textAlign: "left" }}>
                      Option
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "#000", textTransform: "capitalize", textAlign: "left" }}
                    >
                      Add one
                    </Typography>
                    <RadioGroup sx={{ display: "flex " }}>
                      <Stack direction={"row"}>
                        <FormControlLabel
                          sx={{ color: "#000" }}
                          value="chicken"
                          control={<Radio sx={{ color: "#000" }} />}
                          label="Chicken 510 EGP"
                        />
                        <FormControlLabel
                          value="beef"
                          control={<Radio sx={{ color: "#000" }} />}
                          label="Beef 650 EGP"
                          sx={{ color: "#000" }}
                        />
                        <FormControlLabel
                          value="combo"
                          control={<Radio sx={{ color: "#000" }} />}
                          label="Combo 610 EGP"
                          sx={{ color: "#000" }}
                        />
                      </Stack>
                    </RadioGroup>
                  </Stack>
                </Stack>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <BackToMenuClick handleBackClick={handleBackClick} />
        </Box>
      )}
    </Box>
  );
}

export default Boxx;