/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
import OrderOnline from "./order/OrderOnline/OrderOnline";
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
  const [showOrderNow, setShowOrderNow] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

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


  const handleItemClick = async (item) => {
    try {
      const response = await axios.get(
        `https://myres.me/chilis/api/item/${item.id}/1`
      );
      setItemDetails(response.data);
      setPrice(response.data.info[0].price.price);
      setDataExtra(response.data.item_extras[0]?.data || []);
      console.log(response.data.item_extras[0]?.data )
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching item details: ", error);
    }
  };
  const handleCardClick = (index) => {
    setSelectedItem(menuItems[index]);
    setShowCards(false);
  };

  const handleBackClick = () => {
    setShowCards(true);
    setSelectedItem(null);
    setOpenDialog(false);
  };


  const handleAddToCart = () => {
    if (itemDetails) {
      onAddToCart({
        name_en: itemDetails.name_en,
        price: price,
        extras: dataExtra,
      });
      setOrderDetails({
        name: itemDetails.name_en,
        price: price,
        extras: dataExtra,
      });
      setShowOrderNow(true);
      setOpenDialog(false);
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
      {showOrderNow && orderDetails && (
        <OrderOnline orderDetails={orderDetails} />
      )}
    </Box>
  );
}

export default CardContent;

