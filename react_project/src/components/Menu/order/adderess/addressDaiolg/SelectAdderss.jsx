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
          }}
        >
          {t("address.Delivery city")}
        </Typography>
        <Select
          value={currentAddress.deliveryCity}
          onChange={handleCityChange}
          displayEmpty
          inputProps={{ "aria-label": "City" }}
        >
          {loadingCities ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
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
        >
          {loadingAreas ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            areas.map((area) => (
              <MenuItem key={area.id} value={area.id}>
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
