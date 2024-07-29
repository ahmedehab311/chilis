/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./Dialog.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  RadioGroup,
  FormControlLabel,
  TextField,
  Radio,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { CounterDiaolgButton, AddToCardButton } from "../index";
function DialogItem({
  openDialog,
  handleCloseDialog,
  tempSelectedItemImage,
  tempSelectedItemName,
  tempSelectedItemPrice,
  tempSelectedItemDescription,
  extra,
  PriceExtra,
  extra2,
  PriceExtra2,
  extra3,
  PriceExtra3,
}) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="item-dialog-title"
      aria-describedby="item-dialog-description"
      maxWidth="lg"
      sx={{ border: "2px solid #c0b56e" }}
    >
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Box>
          <Stack>
            <img
              src={tempSelectedItemImage}
              alt={tempSelectedItemName}
              width={300}
              height={200}
              className="imgDialog"
            />
          </Stack>
        </Box>
        <DialogContentText id="item-dialog-description" sx={{ mx: 3 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <DialogTitle id="item-dialog-title">
              {tempSelectedItemName}
            </DialogTitle>
            <Stack direction={"row"} alignItems={"center"}>
              \
              <CounterDiaolgButton />
              <span style={{ color: "#000", fontSize: "12px" }}>
                {tempSelectedItemPrice
                  ? `${tempSelectedItemPrice} EGP`
                  : "Price not available"}
              </span>
            </Stack>
          </Stack>
          <div className="borderItem"></div>
          <Typography
            variant="h5"
            sx={{ mb: 2, color: "#000", fontFamily: "uniform" }}
          >
            {tempSelectedItemDescription}
          </Typography>
          <Stack>
            <FormControl component="fieldset">
              <Typography variant="h6" sx={{ color: "#000" }}>
                Any special request?
              </Typography>
            </FormControl>
            <TextField
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              sx={{ mt: 0, mb: 1 }}
            />
            <Stack>
              <Typography
                variant="h6"
                sx={{ color: "#000", textAlign: "left" }}
              >
                Option
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#000",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
             {`${extra}`}
              </Typography>
              <RadioGroup sx={{ display: "flex " }}>
                <Stack direction={"row"}>
                 
                  <FormControlLabel
                    sx={{ color: "#000" }}
                    value="beef"
                    control={<Radio sx={{ color: "#000" }} />}
                    label={`${extra2} ${PriceExtra2} EGP`}
                  />
                  <FormControlLabel
                    sx={{ color: "#000" }}
                    value="combo"
                    control={<Radio sx={{ color: "#000" }} />}
                    label={`${extra3} ${PriceExtra3} EGP`}
                  />
                </Stack>
              </RadioGroup>
            </Stack>
            <AddToCardButton />
          </Stack>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default DialogItem;
