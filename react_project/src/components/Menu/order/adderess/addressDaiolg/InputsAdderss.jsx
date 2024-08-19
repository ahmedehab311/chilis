/* eslint-disable react/prop-types */
import { Stack, TextField, Typography } from "@mui/material";
function InputsAdderss({
  currentAddress,
  handleInputChange,
  handleBlur,
  errors,
}) {
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
          Street
        </Typography>
        <TextField
          name="street"
          value={currentAddress.street}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={!!errors.street}
          helperText={errors.street}
        />
      </Stack>
      <Stack>
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "1.5rem",
            mb: ".8",
          }}
        >
          building
        </Typography>
        <TextField
          name="building"
          value={currentAddress.building}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={!!errors.building}
          helperText={errors.building}
        />
      </Stack>
      <Stack>
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "1.5rem",
            mb: ".8",
          }}
        >
          floor
        </Typography>
        <TextField
          name="floor"
          value={currentAddress.floor}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={!!errors.floor}
          helperText={errors.floor}
        />
      </Stack>
      <Stack>
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "1.5rem",
            mb: ".8",
          }}
        >
          Apt
        </Typography>
        <TextField
          name="apt"
          value={currentAddress.apt}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </Stack>

      <Stack>
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "1.5rem",
            mb: ".8",
          }}
        >
          delivery Instructions
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
