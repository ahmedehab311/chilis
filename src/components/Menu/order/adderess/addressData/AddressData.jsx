/* eslint-disable react/prop-types */
import { Button, Card, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
function AddressData({
  handleDeleteAddress,
  addressData,
  unavailableAddresses,
  onAddressSelect,
  showDeleteIcon,
}) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedId = localStorage.getItem("activeIndex");
    return savedId !== null ? parseInt(savedId, 10) : null;
  });

  useEffect(() => {
    const savedId = localStorage.getItem("activeIndex");

    // التأكد من أن العناوين متوفرة وأن هناك عناوين في القائمة
    if (addressData.length > 0) {
      // التحقق إذا كان هناك عنوان محفوظ في localStorage
      if (
        savedId &&
        addressData.some((address) => address.id === parseInt(savedId, 10))
      ) {
        setActiveIndex(parseInt(savedId, 10));
        const selectedAddress = addressData.find(
          (address) => address.id === parseInt(savedId, 10)
        );
        if (selectedAddress) {
          onAddressSelect(selectedAddress);
        }
      }
      // إذا كانت القائمة تحتوي على عنوان واحد ولم يتم تحديد عنوان من قبل
      else if (addressData.length === 1 && activeIndex === null) {
        const firstAddress = addressData[0];
        setActiveIndex(firstAddress.id);
        localStorage.setItem("activeIndex", firstAddress.id.toString());
        onAddressSelect(firstAddress);
      }
      // التحقق من أن activeIndex الحالي متوافق مع العناوين الحالية
      else if (
        activeIndex !== null &&
        addressData.some((address) => address.id === activeIndex)
      ) {
        const selectedAddress = addressData.find(
          (address) => address.id === activeIndex
        );
        if (selectedAddress) {
          onAddressSelect(selectedAddress);
        }
      }
    } else {
      setActiveIndex(null);
      localStorage.removeItem("activeIndex");
    }
  }, [addressData, activeIndex, onAddressSelect]);

  const isAddressAvailable = (address) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const currentTimeMinutes = hours * 60 + minutes;
    console.log("Current Time", { hours, minutes, currentTimeMinutes });
    console.log("address", address);
    let isAvailable = false;
    if (address && Array.isArray(address.area.area_branches)) {
      address.area.area_branches.forEach((branch) => {
        const [openHour, openMinute] = branch.branch.open
          .split(":")
          .map(Number);
        let [deliveryHour, deliveryMinute] = branch.last_delivery
          .split(":")
          .map(Number);

        // If last_delivery is "00:00:00", set it to a default value (e.g., 23:59)
        if (deliveryHour === 0 && deliveryMinute === 0) {
          deliveryHour = 23;
          deliveryMinute = 59;
        }

        const branchOpenMinutes = openHour * 60 + openMinute;
        const branchLastDeliveryMinutes = deliveryHour * 60 + deliveryMinute;
        console.log("Branch Times", {
          openHour,
          openMinute,
          deliveryHour,
          deliveryMinute,
          branchOpenMinutes,
          branchLastDeliveryMinutes,
        });
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

  const addressAvailability = useMemo(() => {
    return addressData.map((address) => {
      return {
        ...address,
        isAvailable:
          Array.isArray(unavailableAddresses) &&
          !unavailableAddresses.includes(address.id) &&
          isAddressAvailable(address),
      };
    });
  }, [addressData, unavailableAddresses]);

  const handleCardClick = (address) => {
    if (address) {
      if (address.isAvailable) {
        setActiveIndex(address.id);
        localStorage.setItem("activeIndex", address.id.toString());
        onAddressSelect(address);
      } else {
        // console.log("Address is not available for delivery.");
      }
    } else {
      console.error("Invalid address:", address);
    }
  };
  // console.log("unavailableAddresses",unavailableAddresses)

  const handleClick = (index) => () => {
    const address = addressAvailability[index];
    handleCardClick(address);
  };
  // console.log("branches",);

  return (
    <>
      {addressAvailability.length > 0 ? (
        addressAvailability.map((address, index) => (
          <Card
            key={index}
            sx={{
              mb: 3,
              border:
                activeIndex === address.id && address.isAvailable
                  ? "2px solid #d32f2f"
                  : "none",
              backgroundColor: address.isAvailable ? "#fff" : "#f8d7da",
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
                  fontFamily: "tahoma",
                }}
              >
                {address.address_name}
              </Typography>
              <br />
              {!address.isAvailable && (
                <Typography
                  sx={{
                    color: "#d32f2f",
                    fontSize: "1.2rem",
                    ml: "2rem",
                    fontFamily: "tahoma",
                  }}
                >
                  {t("This address is currently unavailable for delivery")}
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
                    fontFamily: "tahoma",
                  }}
                >
                  {address.building}, {address.street},{" "}
                  {/* {address.area.area_name_en}{" "} */}
                  {isArabic
                    ? address.area.area_name_ar
                    : address.area.area_name_en}{" "}
                  , {/* {address.city.name_en}  */}
                  {isArabic ? address.city.name_ar : address.city.name_en},
                  Building: {address.building} - Floor: {address.floor}
                </Typography>
              </Stack>
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
        ))
      ) : (
        <Typography
          sx={{
            fontFamily: "tahoma",
          }}
        >
          No addresses available
        </Typography>
      )}
    </>
  );
}

export default AddressData;
