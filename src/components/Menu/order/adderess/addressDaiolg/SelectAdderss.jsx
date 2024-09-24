/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Stack,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
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
          sx={{
            textTransform: "capitalize",
            fontSize: "1.5rem",
            mb: ".8",
          }}
        >
          Delivery city
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
                {city.name_en}
              </MenuItem>
            ))
          )}
        </Select>
      </Stack>
      <Stack>
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "1.5rem",
            mb: ".8",
          }}
        >
          Delivery Area
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
                {area.name}
              </MenuItem>
            ))
          )}
        </Select>
      </Stack>
    </>
  );
}

export default SelectAdderss;
