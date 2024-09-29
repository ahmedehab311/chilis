/* eslint-disable react/prop-types */
import { Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
function InputsAdderss({
  currentAddress,
  handleInputChange,
  handleBlur,
  errors,
}) {
  const { t } = useTranslation();
  return (
    <>
      <Stack>
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "1.5rem",
            mb: ".8",
          }}
          gutterBottom
        >
          {t("address.street")}
        </Typography>
        <TextField
          name="street"
          value={currentAddress.street}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={!!errors.street}
          // helperText={errors.street}
        />
        {errors.street && (
          <span style={{ color: "red", fontSize: "1.1rem" }}>
            {errors.street}
          </span>
        )}
      </Stack>
      <Stack>
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "1.5rem",
            mb: ".8",
          }}
          gutterBottom
        >
          {t("address.building")}
        </Typography>
        <TextField
          name="building"
          value={currentAddress.building}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={!!errors.building}
          // helperText={errors.building}
        />
        {errors.building && (
          <span style={{ color: "red", fontSize: "1.1rem" }}>
            {errors.building}
          </span>
        )}
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
          {t("address.floor")}
        </Typography>
        <TextField
          name="floor"
          value={currentAddress.floor}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={!!errors.floor}
        />
           {errors.floor && (
          <span style={{ color: "red", fontSize: "1.1rem" }}>
            {errors.floor}
          </span>
        )}
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
          {t("address.apt")}
        </Typography>
        <TextField
          name="apt"
          value={currentAddress.apt}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={!!errors.apt}
        />
          {errors.apt && (
          <span style={{ color: "red", fontSize: "1.1rem" }}>
            {errors.apt}
          </span>
        )}
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
          {t("address.deliveryInstructions")}
        </Typography>
        <TextField
          name="deliveryInstructions"
          value={currentAddress.deliveryInstructions}
          onChange={handleInputChange}
        />
      </Stack>
    </>
  );
}

export default InputsAdderss;
