/* eslint-disable react/prop-types */
import {
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DiaolgButtonsAddress from "../../buttons/AddressDiaolgButtons";
import DiaolgLabels from "../../buttons/DiaolgLabels";

function AddressDialog({
  open,
  handleClose,
  currentAddress,
  cities,
  areas,
  loadingCities,
  loadingAreas,
  handleCityChange,
  handleAreaChange,
  handleInputChange,
  handleBlur,
  errors,
  handleSelectLabel,
  handleAddAddress,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth // لجعل العرض 100%
      maxWidth="sm" // لتحديد أقصى عرض للـ Dialog، يمكن تغييره حسب الحاجة (xs, sm, md, lg, xl)
    >
      <DialogTitle>
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "500",
            textAlign: "left",
          }}
        >
          Add Address
        </Typography>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
       <Stack>
       <Typography sx={{textTransform:"capitalize" , fontSize:"1.5rem",mb:".8"}}>Delivery city</Typography>
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
     <Typography sx={{textTransform:"capitalize" , fontSize:"1.5rem",mb:".8"}}>Delivery Area</Typography>
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
       <Stack>
       <Typography sx={{textTransform:"capitalize" , fontSize:"1.5rem",mb:".8"}}>Street</Typography>
       <TextField
            name="street"
            // label="Street"
            value={currentAddress.street}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.street}
            helperText={errors.street}
          />
       </Stack>
          <Stack>
          <Typography sx={{textTransform:"capitalize" , fontSize:"1.5rem",mb:".8"}}>building</Typography>
          <TextField
            name="building"
            // label="Building"
            value={currentAddress.building}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.building}
            helperText={errors.building}
          />
          </Stack>
       <Stack>
       <Typography sx={{textTransform:"capitalize" , fontSize:"1.5rem",mb:".8"}}>floor</Typography>
       <TextField
            name="floor"
            // label="Floor"
            value={currentAddress.floor}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.floor}
            helperText={errors.floor}
          />
       </Stack>
       <Stack>
       <Typography sx={{textTransform:"capitalize" , fontSize:"1.5rem",mb:".8"}}>Apt</Typography>
       <TextField
            name="apt"
            // label="Apt"
            value={currentAddress.apt}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
       </Stack>
          
       <Stack>
       <Typography sx={{textTransform:"capitalize" , fontSize:"1.5rem",mb:".8"}}>delivery Instructions</Typography>
       <TextField
            name="deliveryInstructions"
            // label="Delivery Instructions"
            value={currentAddress.deliveryInstructions}
            onChange={handleInputChange}
          />
       </Stack>
          
          
          <DiaolgLabels
            handleSelectLabel={handleSelectLabel}
            currentAddress={currentAddress}
          />
        </Stack>
      </DialogContent>

      <DiaolgButtonsAddress
        handleClose={handleClose}
        handleAddAddress={handleAddAddress}
      />
    </Dialog>
  );
}

export default AddressDialog;
