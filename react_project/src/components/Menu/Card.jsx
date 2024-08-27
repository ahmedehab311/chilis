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
import { useDispatch } from "react-redux";
import { fetchIdInfo } from '../../rtk/slices/InfoSlice';
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
  const [dataOptions, setDataOptions] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData();
        setMenuItems(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  // const handleItemClick = async (item) => {
  //   try {
  //     const response = await axios.get(
  //       `https://myres.me/chilis-dev/api/item/${item.id}/1`
  //       // `https://myres.me/chilis/api/item/1/1`
  //     );
  //     setItemDetails(response.data);
  //     setPrice(response.data.info[0].price.price);
  //     setDataExtra(response.data.item_extras[0]?.data || []);
  //     // setDataExtra(response.data. || []);
  //     setDataOptions(response.data.info[0].item_extras[0].data || []);
  //     // console.log("response", response.data.info[0].item_extras[0].data);
  //     // console.log(response.data.item_extras[0]?.data )
  //     setOpenDialog(true);
  //   } catch (error) {
  //     console.error("Error fetching item details:", error);
  //   }
  // };

  // const dispatch = useDispatch();
  const [idInfo, setIdInfo] = useState([]);
  const dispatch = useDispatch();

  const handleItemClick = async (item) => {
    try {
      const response = await axios.get(
        `https://myres.me/chilis-dev/api/item/${item.id}/1`
      );
      if (response.data.info && response.data.info.length > 0) {
        dispatch(fetchIdInfo(item.id));
        console.log("info", item.id);
      } else {
        console.error("No info available in the response");
      }

      if (response && response.data) {
        setItemDetails(response.data);
        setIdInfo(response.data.info[0].id);
        console.log("info", response.data.info[0].id);

        if (response.data.info && response.data.info.length > 0) {
          setPrice(response.data.info[0].price.price);
        } else {
          console.error("Price information is missing in the response");
        }

        if (response.data.item_extras && response.data.item_extras.length > 0) {
          setDataExtra(response.data.item_extras[0]?.data || []);
        } else {
          setDataExtra([]);
        }

        if (
          response.data.info &&
          response.data.info.length > 0 &&
          response.data.info[0].item_extras &&
          response.data.info[0].item_extras.length > 0
        ) {
          setDataOptions(response.data.info[0].item_extras[0].data || []);
        } else {
          setDataOptions([]);
        }

        setOpenDialog(true);
      } else {
        console.error("No data available in the response");
      }
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleCardClick = (index) => {
    setSelectedItem(menuItems[index]);
    console.log("menuItems", menuItems[index]);
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
            dataOptions={dataOptions}
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
