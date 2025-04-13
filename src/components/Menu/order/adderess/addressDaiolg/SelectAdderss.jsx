/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Stack,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
function SelectAdderss({
  selectedCity,
  setSelectedCity,
  currentAddress,
  setCurrentAddress,
  loadingCities,
  cities,
  areas,
  setAreas,
  loadingAreas,
  setSelectedArea = () => {},
}) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      deliveryCity: event.target.value,
      deliveryArea: "",
    }));
    setAreas([]);
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      deliveryArea: event.target.value,
    }));
  };
  return (
    <>
      <Stack>
        <Typography
          gutterBottom
          sx={{
            textTransform: "capitalize",
            fontSize: "1.5rem",
            mb: ".8",
          // fontWeight: "bold",
          fontFamily: "tahoma",
          }}
        >
          {t("address.Delivery city")}
        </Typography>
        <Select
          value={currentAddress.deliveryCity}
          onChange={handleCityChange}
          displayEmpty
          inputProps={{ "aria-label": "City" }}
          sx={{ fontSize: "1.3rem", fontWeight: "500", fontFamily: "tahoma", }}
          MenuProps={{
            PaperProps: {
              style: {
                fontSize: "1.9rem",
              },
            },
          }}
        >
        <MenuItem value="" disabled sx={{ fontSize: "1.2rem", fontFamily: "tahoma" }}>
    {isArabic ? "اختر المدينة" : "Select City"}
  </MenuItem>
          {loadingCities ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            cities.map((city) => (
              <MenuItem
                key={city.id}
                value={city.id}
                sx={{ fontSize: "1.2rem", fontWeight: "500", fontFamily: "tahoma", }}
              >
                {isArabic ? city.name_ar : city.name_en}
              </MenuItem>
            ))
          )}
        </Select>
      </Stack>
      <Stack>
        <Typography
          gutterBottom
          sx={{
            textTransform: "capitalize",
            fontSize: "1.5rem",
            mb: ".8",
          }}
        >
          {t("address.Delivery Area")}
        </Typography>
        <Select
          value={currentAddress.deliveryArea}
          onChange={handleAreaChange}
          displayEmpty
          inputProps={{ "aria-label": "Area" }}
          disabled={loadingAreas || !currentAddress.deliveryCity}
          sx={{ fontSize: "1.3rem", fontWeight: "500" }}
          MenuProps={{
            PaperProps: {
              style: {
                fontSize: "1.9rem",
                fontFamily: "tahoma",
              },
            },
          }}
        >
                <MenuItem value="" disabled sx={{ fontSize: "1.2rem", fontFamily: "tahoma" }}>
    {isArabic ? "اختر المنطقة" : "Select Area"}
  </MenuItem>
          {loadingAreas ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            areas.map((area) => (
              <MenuItem
                key={area.id}
                value={area.id}
                sx={{ fontSize: "1.2rem", fontWeight: "500", fontFamily: "tahoma", }}
              >
                {isArabic ? area.name_ar : area.name_en}
              </MenuItem>
            ))
          )}
        </Select>
      </Stack>
    </>
  );
}

export default SelectAdderss;
