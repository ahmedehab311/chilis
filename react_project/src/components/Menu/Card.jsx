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
} from "./index";
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

  const handleItemClick = (item) => {
    setTempSelectedItemImage(`${BASE_URL}${item.image}`);
    setTempSelectedItemName(item.name_en);
    setTempSelectedItemDescription(item.description_en);
    setTempSelectedItemPrice(item.price);
    setOpenDialog(true);
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
