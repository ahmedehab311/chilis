/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "./card.css";
import "./sliderMenu.css";
import {
  ItemCard,
  BASE_URL_images,
  DialogItem,
  fetchData,
  BackButton,
  MenuCard,
  imgLogo,
} from "./index";
import OrderOnline from "./order/OrderOnline/OrderOnline";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemDetails } from "../../rtk/slices/InfoSlice";
function CardContent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showCards, setShowCards] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [showOrderNow, setShowOrderNow] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [price, setPrice] = useState(null);
  const [dataExtra, setDataExtra] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionName, setSelectedOptionName] = useState("");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const itemDetails = useSelector((state) => state.info.itemDetails);
  const [idInfo, setIdInfo] = useState([]);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData();
        setMenuItems(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (itemDetails) {
      setOpenDialog(true);
    }
  }, [itemDetails]);

  const handleItemClick = (item) => {
    dispatch(fetchItemDetails(item.id));
  };
  const handleCardClick = (index) => {
    setSelectedItem(menuItems[index]);
    // console.log("menuItems", menuItems[index]);
    setShowCards(false);
  };

  const handleBackClick = () => {
    setShowCards(true);
    setSelectedItem(null);
    setOpenDialog(false);
  };

  // const handleAddToCart = () => {
  //   if (itemDetails) {
  //     onAddToCart({
  //       name_en: itemDetails.name_en,
  //       price: price,
  //       extras: dataExtra,
  //     });
  //     setOrderDetails({
  //       name: itemDetails.name_en,
  //       price: price,
  //       extras: dataExtra,
  //     });
  //     setShowOrderNow(true);
  //     setOpenDialog(false);
  //   }
  // };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetSelections();
  };
  const resetSelections = () => {
    setSelectedOption("");
    setSelectedExtras([]);
    setQuantity(1);
  };
  useEffect(() => {
    setOpenDialog(false);
  }, [location.pathname]);
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
            tempSelectedItemImage={itemDetails?.image || "default-image.jpg"}
            tempSelectedItemName={itemDetails?.name_en || "Default Name"}
            tempSelectedItemDescription={
              itemDetails?.description || "Default Description"
            }
            tempSelectedItemPrice={
              itemDetails?.info[0]?.price?.price || "Default Price"
            }
            itemDetails={itemDetails}
            price={itemDetails?.info[0]?.price?.price}
            dataExtra={itemDetails?.item_extras[0]?.data || []}
            dataOptions={itemDetails?.info[0]?.item_extras[0]?.data || []}
            BASE_URL_images={BASE_URL_images}
            selectedOption={selectedOption}
            selectedExtras={selectedExtras}
            setSelectedExtras={setSelectedExtras}
            setSelectedOption={setSelectedOption}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedOptionName={selectedOptionName}
            setSelectedOptionName={setSelectedOptionName}
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
