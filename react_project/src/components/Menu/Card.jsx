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

  const [extra, setExtra] = useState(null);
  const [PriceExtra, setPriceExtra] = useState(null);

  const [extra2, setExtra2] = useState(null);
  const [PriceExtra2, setPriceExtra2] = useState(null);

  const [extra3, setExtra3] = useState(null);
  const [PriceExtra3, setPriceExtra3] = useState(null);

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
    setTempSelectedItemImage(`${BASE_URL}${item.image}`);
    setTempSelectedItemName(item.name_en);
    setTempSelectedItemDescription(item.description_en);

    try {
      const response = await fetch(`${API_PRICE}?item_id=${item.id}`);

      if (!response.ok) {
        console.error(`Error fetching price: ${response.statusText}`);
        setTempSelectedItemPrice("Price not available");
        return;
      }

      const priceData = await response.json();
      console.log("Fetched price data:", priceData);

      if (priceData.info && Array.isArray(priceData.info)) {
        const itemInfo = priceData.info[0];

        if (itemInfo && itemInfo.price) {
          setTempSelectedItemPrice(itemInfo.price.price);

          setExtra(itemInfo.item_extras[0].category_en);
          setPriceExtra(itemInfo.item_extras[0].price_en);

          setExtra2(priceData.item_extras[0].data[0].description_en);
          setPriceExtra2(priceData.item_extras[0].data[0].price_en);

          setExtra3(priceData.item_extras[0].data[1].description_en);
          setPriceExtra3(priceData.item_extras[0].data[1].price_en);

          console.log("item info:", itemInfo);

        } else {
          console.error("Price not found for the selected item.");
          setTempSelectedItemPrice("Price not available");
        }
      } else {
        console.error(
          "Invalid data structure or 'info' field not found:",
          priceData
        );
        setTempSelectedItemPrice("Price not available");
      }
    } catch (error) {
      console.error("Error fetching price: ", error);
      setTempSelectedItemPrice("Price not available");
    }

    // try {
    //   const response = await fetch(`${API_PRICE}?item_id=${item.id}`);
  
    //   if (!response.ok) {
    //     console.error(`Error fetching price: ${response.statusText}`);
    //     setTempSelectedItemPrice("Price not available");
    //     return;
    //   }
  
    //   const priceData = await response.json();
    //   console.log("Fetched price data:", priceData);
  
    //   if (priceData.info && Array.isArray(priceData.info)) {
    //     const itemInfo = priceData.info[0];
  
    //     if (itemInfo && itemInfo.price) {
    //       setTempSelectedItemPrice(itemInfo.price.price);
  
    //       // Handle dynamic extras
    //       const extras = priceData.item_extras || [];

    //       setExtra(extras[0]?.description_en || "No extra available");
    //       setPriceExtra(extras[0]?.price_en || "N/A");
  
    //       setExtra2(extras[1]?.description_en || "No extra available");
    //       setPriceExtra2(extras[1]?.price_en || "N/A");
  
    //       setExtra3(extras[2]?.description_en || "No extra available");
    //       setPriceExtra3(extras[2]?.price_en || "N/A");
  
    //       console.log("item info:", itemInfo);
    //     } else {
    //       console.error("Price not found for the selected item.");
    //       setTempSelectedItemPrice("Price not available");
    //     }
    //   } else {
    //     console.error(
    //       "Invalid data structure or 'info' field not found:",
    //       priceData
    //     );
    //     setTempSelectedItemPrice("Price not available");
    //   }
    // } catch (error) {
    //   console.error("Error fetching price: ", error);
    //   setTempSelectedItemPrice("Price not available");
    // }






    //   try {
    //     const response = await fetch(`${API_PRICE}?item_id=${item.id}`);

    //     if (!response.ok) {
    //       console.error(`Error fetching price: ${response.statusText}`);
    //       return;
    //     }

    //     const priceData = await response.json();
    //     console.log("Fetched price data:", priceData);

    //     if (priceData.info[0].price) {
    //       setTempSelectedItemPrice(priceData.info[0].price.price);
    //     } else {
    //       console.error("Price not found in the response data.");
    //       setTempSelectedItemPrice("Price not available");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching price: ", error);
    //     setTempSelectedItemPrice("Price not available");
    //   }

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
            extra={extra}
            PriceExtra={PriceExtra}
            extra2={extra2}
            PriceExtra2={PriceExtra2}
            extra3={extra3}
            PriceExtra3={PriceExtra3}
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
