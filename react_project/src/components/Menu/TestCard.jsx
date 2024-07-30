
function TestCard() {



    // const handleItemClick = async (item) => {    
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

    // setOpenDialog(true);
//   };




    // const handleItemClick = async (item) => {    
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
//   };


    
  return (
    <div>
      
    </div>
  )
}

export default TestCard
