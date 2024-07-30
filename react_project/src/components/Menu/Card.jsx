import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "./card.css";
import "./sliderMenu.css";
import {
  ItemCard,
  BASE_URL,
  DialogItem,
  fetchData,
  BackButton,
  MenuCard,
  imgLogo,
  API_PRICE,
} from "./index";
import axios from "axios";
function CardContent() {
  const [showCards, setShowCards] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [tempSelectedItemImage, setTempSelectedItemImage] = useState(null);
  const [tempSelectedItemName, setTempSelectedItemName] = useState(null);
  const [tempSelectedItemDescription, setTempSelectedItemDescription] =
    useState(null);
  const [tempSelectedItemPrice, setTempSelectedItemPrice] = useState(null);

  const [price, setPrice] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [dataExtra, setDataExtra] = useState([]);


  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  const handleCardClick = (index) => {
    setSelectedItem(menuItems[index]);
    setShowCards(false);
  };

  const handleBackClick = () => {
    setShowCards(true);
    setSelectedItem(null);
    setOpenDialog(false);
  };

  const handleItemClick = async (item) => {
        try {
          const response = await axios.get(
            `https://myres.me/chilis/api/item/${item.id}/1`
          );
          setItemDetails(response.data);
          setPrice(response.data.info[0].price.price);
          setDataExtra(response.data.item_extras[0]?.data || []);
          setOpenDialog(true);
        } catch (error) {
          console.error("Error fetching item details: ", error);
        }
      };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box className="box">
      {showCards ? (
        <>
          <MenuCard
            handleCardClick={handleCardClick}
            menuItems={menuItems}
            loading={loading}
          />
        </>
      ) : (
        <Box sx={{ mt: 4 }}>
          <BackButton handleBackClick={handleBackClick} />

          <ItemCard
            handleItemClick={handleItemClick}
            selectedItem={selectedItem}
          />
          <DialogItem
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            tempSelectedItemImage={tempSelectedItemImage}
            tempSelectedItemName={tempSelectedItemName}
            tempSelectedItemDescription={tempSelectedItemDescription}
            tempSelectedItemPrice={tempSelectedItemPrice}
            // extra={extra}
            // PriceExtra={PriceExtra}
            itemDetails={itemDetails}
            price={price}
            dataExtra={dataExtra}
            BASE_URL={BASE_URL}
          />
        </Box>
      )}
      <Stack className="stackContainer">
        <img src={imgLogo} className="logoImgMenu" alt="logomenu" />
      </Stack>
    </Box>
  );
}

export default CardContent;
//  


// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Button,
//   IconButton,
//   CircularProgress,
//   Container,
//   Grid,
//   Box,
//   Typography,
//   Card,
//   CardMedia,
//   Stack,
// } from "@mui/material";
// import Counter from "./ButtonsMenu/CounterDiaolgButton";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "./card.css";
// import "./sliderMenu.css";
// import "./Dialog/Dialog.css";
// import AddToCardButton from "./ButtonsMenu/AddToCardButton";

// const APIURL = "https://myres.me/chilis/api/menu/2/1";
// const BASE_URL = "https://myres.me/chilis/";

// function Boxx({ onAddToCart }) {
//   const [showCards, setShowCards] = useState(true);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [price, setPrice] = useState(null);
//   const [itemDetails, setItemDetails] = useState(null);
//   const [dataExtra, setDataExtra] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(APIURL);
//         setMenuItems(response.data.data.menu[0].sections || []);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCardClick = (index) => {
//     setSelectedItem(menuItems[index]);
//     setShowCards(false);
//   };

//   const handleBackClick = () => {
//     setShowCards(true);
//     setSelectedItem(null);
//     setOpenDialog(false);
//   };

//   const handleItemClick = async (item) => {
//     try {
//       const response = await axios.get(
//         `https://myres.me/chilis/api/item/${item.id}/1`
//       );
//       setItemDetails(response.data);
//       setPrice(response.data.info[0].price.price);
//       setDataExtra(response.data.item_extras[0]?.data || []);
//       setOpenDialog(true);
//     } catch (error) {
//       console.error("Error fetching item details: ", error);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleAddToCart = () => {
//     if (itemDetails) {
//       onAddToCart({
//         name_en: itemDetails.name_en,
//         price: price,
//         extras: dataExtra,
//       });
//       setOpenDialog(false); // Close dialog after adding to cart
//     }
//   };

//   return (
//     <Box className="box">
//       {showCards ? (
//         <>
//           <Typography
//             sx={{
//               textAlign: "center !important",
//               fontSize: "33px",
//               fontWeight: "bold",
//               my: 2,
//             }}
//           >
//             MENU
//           </Typography>
//           <Container sx={{ maxWidth: "100% !important" }}>
//             {loading ? (
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "100vh",
//                 }}
//               >
//                 <CircularProgress />
//               </Box>
//             ) : (
//               <Swiper
//                 slidesPerView={1}
//                 pagination={{ clickable: true }}
//                 loop={true}
//                 navigation={{
//                   nextEl: ".swiper-button-next",
//                   prevEl: ".swiper-button-prev",
//                 }}
//                 modules={[Navigation]}
//                 className="mySwiper"
//                 breakpoints={{
//                   0: { slidesPerView: 1 },
//                   600: { slidesPerView: 2 },
//                   900: { slidesPerView: 3 },
//                   1300: { slidesPerView: 4 },
//                 }}
//               >
//                 {Array.isArray(menuItems) &&
//                   menuItems.map((menuItem, index) => (
//                     <SwiperSlide key={index}>
//                       <Card
//                         className="card"
//                         sx={{
//                           maxWidth: 230,
//                           py: 3,
//                           px: 6,
//                           border: "2px solid #fff",
//                           background: "#000",
//                           borderRadius: "20px",
//                           mx: "auto",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => handleCardClick(index)}
//                       >
//                         <Typography
//                           variant="h4"
//                           sx={{
//                             textAlign: "center",
//                             mb: 2,
//                             textTransform: "uppercase",
//                             fontSize: "1.5rem",
//                             fontWeight: "bold",
//                             color: "#c0b56e",
//                           }}
//                         >
//                           {menuItem.name_en}
//                         </Typography>
//                         <CardMedia
//                           component="img"
//                           height="140"
//                           image={`${BASE_URL}${menuItem.image}`}
//                           alt={menuItem.description_ar}
//                           sx={{ objectFit: "cover", width: "100%" }}
//                         />
//                         <Typography
//                           variant="h4"
//                           sx={{ fontSize: "20px", my: 1, color: "#fff" }}
//                         >
//                           {menuItem.description_en}
//                         </Typography>
//                       </Card>
//                     </SwiperSlide>
//                   ))}
//                 <div className="swiper-button-next"></div>
//                 <div className="swiper-button-prev"></div>
//               </Swiper>
//             )}
//           </Container>
//         </>
//       ) : (
//         <Box sx={{ mt: 4 }}>
//           <Typography
//             variant="h4"
//             sx={{
//               textAlign: "center",
//               mb: 2,
//               textTransform: "uppercase",
//               color: "#fff",
//             }}
//           >
//             {selectedItem ? selectedItem.name_en : ""}
//           </Typography>
//           <Grid container spacing={2} justifyContent="center">
//             {Array.isArray(selectedItem?.items) &&
//               selectedItem.items.map((item) => (
//                 <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
//                   <Card
//                     sx={{
//                       p: 1,
//                       border: "2px solid #fff",
//                       background: "#000",
//                       borderRadius: "20px",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => handleItemClick(item)}
//                   >
//                     <Typography
//                       variant="h3"
//                       sx={{
//                         textAlign: "center",
//                         mb: 2,
//                         textTransform: "uppercase",
//                         fontSize: "2.5rem",
//                         color: "#e8d56a",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {item.name_en}
//                     </Typography>
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={`${BASE_URL}${item.image}`}
//                       alt={item.description_ar}
//                       sx={{ objectFit: "cover", width: "100%" }}
//                     />
//                     <Typography
//                       variant="h4"
//                       sx={{ fontSize: "20px", my: 1, color: "#fff" }}
//                     >
//                       {item.description_en}
//                     </Typography>
//                     <Typography sx={{ fontSize: "18px", color: "#777" }}>
//                       {item.price}
//                     </Typography>
//                     <IconButton onClick={() => handleItemClick(item)}>
//                       <Button variant="contained" color="error">
//                         ORDER
//                       </Button>
//                     </IconButton>
//                   </Card>
//                 </Grid>
//               ))}
//           </Grid>

//           <Dialog
//             open={openDialog}
//             onClose={handleCloseDialog}
//             aria-labelledby="item-dialog-title"
//             aria-describedby="item-dialog-description"
//             maxWidth="lg"
//             sx={{ border: "2px solid #c0b56e" }}
//           >
//             {itemDetails && (
//               <DialogContent
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   mb: 2,
//                 }}
//               >
//                 <Box>
//                   <img
//                     src={`${BASE_URL}${itemDetails.image}`}
//                     alt={itemDetails.name_en}
//                     width={300}
//                     height={200}
//                     className="imgDialog"
//                   />
//                 </Box>
//                 <DialogContentText id="item-dialog-description" sx={{ mx: 3 }}>
//                   <Stack
//                     direction={"row"}
//                     alignItems={"center"}
//                     justifyContent={"space-between"}
//                   >
//                     <DialogTitle id="item-dialog-title">
//                       {itemDetails.name_en}
//                     </DialogTitle>
//                     <Stack direction={"row"} alignItems={"center"}>
//                       <Counter />
//                       <span style={{ color: "#000", fontSize: "12px" }}>
//                         {price} EGP
//                       </span>
//                     </Stack>
//                   </Stack>
//                   <div className="borderItem"></div>
//                   <Typography variant="body1" sx={{ mb: 2, color: "#000" }}>
//                     {itemDetails.description_en}
//                   </Typography>

//                   {dataExtra && dataExtra.length > 0 && (
//                     <FormControl component="fieldset">
//                       <Typography variant="h6" sx={{ color: "#000" }}>
//                         Option
//                       </Typography>
//                       <Typography variant="h6" sx={{ color: "#000" }}>
//                         Add on
//                       </Typography>
//                       <RadioGroup>
//                         {dataExtra.map((extra, index) => (
//                           <FormControlLabel
//                             key={index}
//                             sx={{ color: "#000" }}
//                             value={extra.description_en}
//                             control={<Radio sx={{ color: "#000" }} />}
//                             label={`${extra.description_en} - ${extra.price_en} EGP`}
//                           />
//                         ))}
//                       </RadioGroup>
//                     </FormControl>
//                   )}
//                   <AddToCardButton onAddToCart={handleAddToCart} />
//                 </DialogContentText>
//               </DialogContent>
//             )}
//           </Dialog>
//           {/* <Diolg/> */}
//           <Box sx={{ textAlign: "center", mt: 4 }}>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleBackClick}
//             >
//               Back
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default Boxx;
