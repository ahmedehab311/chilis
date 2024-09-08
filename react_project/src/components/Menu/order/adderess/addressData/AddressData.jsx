/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { Card, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState, useEffect } from "react";

function AddressData({
  handleDeleteAddress,
  addressData,
  unavailableAddresses,
  onAddressSelect,
  showDeleteIcon, 
}) {
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedId = localStorage.getItem("activeIndex");
    return savedId !== null ? parseInt(savedId, 10) : null;
  });

  useEffect(() => {
    if (
      activeIndex !== null &&
      !isNaN(activeIndex) &&
      addressData.some((address) => address.id === activeIndex) 
    ) {
      const selectedAddress = addressData.find(
        (address) => address.id === activeIndex
      );
      localStorage.setItem("activeIndex", activeIndex.toString());
      onAddressSelect(selectedAddress); 
    }
  }, [activeIndex, addressData, onAddressSelect]);

  const isAddressAvailable = (address) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const currentTimeMinutes = hours * 60 + minutes;

    let isAvailable = false;
    if (address && Array.isArray(address.branches)) {
      address.branches.forEach((branch) => {
        console.log(`Checking branch: ${branch.address_en}`);
        console.log(
          `Open: ${branch.open}, Last Delivery: ${branch.last_delivery}`
        );

        const [openHour, openMinute] = branch.open.split(":").map(Number);
        const [deliveryHour, deliveryMinute] = branch.last_delivery
          .split(":")
          .map(Number);

        const branchOpenMinutes = openHour * 60 + openMinute;
        const branchLastDeliveryMinutes = deliveryHour * 60 + deliveryMinute;

        if (branchLastDeliveryMinutes < branchOpenMinutes) {
          if (
            currentTimeMinutes >= branchOpenMinutes ||
            currentTimeMinutes <= branchLastDeliveryMinutes
          ) {
            isAvailable = true;
          }
        } else {
          if (
            currentTimeMinutes >= branchOpenMinutes &&
            currentTimeMinutes <= branchLastDeliveryMinutes
          ) {
            isAvailable = true;
          }
        }
      });
    } else {
      console.error("Branches data is missing or invalid.");
    }

    return isAvailable;
  };


  const handleCardClick = (address) => {
    if (address) {
      console.log(`Selected address: ${address.address_name}`);
      const isAvailable = isAddressAvailable(address);

      if (isAvailable) {
        setActiveIndex(address.id); 
        onAddressSelect(address); 
      } else {
        console.log("Address is not available for delivery.");
      }
    } else {
      console.error("Invalid address:", address);
    }
  };

  const handleClick = (index) => () => {
    const address = addressData[index];
    if (isAddressAvailable(address)) {
      handleCardClick(address);
    }
  };
  return (
    <>
      {addressData.length > 0 ? (
        addressData.map((address, index) => {
          const isAvailable =
            Array.isArray(unavailableAddresses) &&
            !unavailableAddresses.includes(address.id) &&
            isAddressAvailable(address);
          console.log(
            `Address: ${address.address_name}, isAvailable: ${isAvailable}`
          );

          return (
            <Card
              key={index}
              sx={{
                mb: 3,
                border: activeIndex === address.id  ? "2px solid #d32f2f" : "none",
                backgroundColor: isAvailable ? "#fff" : "#f8d7da",
              }}
              onClick={handleClick(index)}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{
                  justifyContent: "space-between",
                  background: "#f8f9fa!important",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    lineHeight: "1.2",
                  }}
                >
                  {address.address_name}
                </Typography>
                <br />
                {!isAvailable && (
                  <Typography
                    sx={{ color: "#d32f2f", fontSize: "1.2rem", ml: "2rem" }}
                  >
                    This address is currently unavailable for delivery.
                  </Typography>
                )}
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  p: ".5rem",
                  justifyContent: "space-between",
                }}
                direction={"row"}
                alignItems={"center"}
              >
                <Stack sx={{ p: "1.5rem" }}>
                  <Typography
                    sx={{
                      display: "flex",
                      color: "#6c757d!important",
                      fontSize: "1.3rem",
                      fontWeight: "500",
                      lineHeight: "1.2",
                      textTransform: "capitalize",
                    }}
                  >
                    {address.building}, {address.street},
                    {address.area.area_name_en},{address.city.name_en},Building:
                    {address.building} - Floor: {address.floor}
                  </Typography>
                </Stack>
                {/* <Stack

                  fontSize="22px"
                  direction={"row"}
                  alignItems={"center"}
                  sx={{
                    justifyContent: "space-between",
                    mr: 2,
                    display: "flex",
                  }}
                >
                  <DeleteOutlineOutlinedIcon
                    sx={{
                      cursor: "pointer",
                      color: "#d32f2f",
                      "&:hover": { color: "#a30000" },
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteAddress(address.id);
                    }}
                  />
                </Stack> */}
                {location.pathname !== "/order-online" && showDeleteIcon && (
                  <Stack
                    fontSize="22px"
                    direction={"row"}
                    alignItems={"center"}
                    sx={{
                      justifyContent: "space-between",
                      mr: 2,
                      display: "flex",
                    }}
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{
                        cursor: "pointer",
                        color: "#d32f2f",
                        "&:hover": { color: "#a30000" },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteAddress(address.id);
                      }}
                    />
                  </Stack>
                )}
              </Stack>
            </Card>
          );
        })
      ) : (
        <Typography>{/* No addresses available */}</Typography>
      )}
    </>
  );
}

export default AddressData;
