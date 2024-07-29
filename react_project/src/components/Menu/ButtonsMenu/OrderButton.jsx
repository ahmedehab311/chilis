/* eslint-disable react/prop-types */
import { Button, IconButton } from "@mui/material";
function OrderButton({ handleItemClick }) {
  return (
    <IconButton
      // eslint-disable-next-line no-undef
      onClick={() => handleItemClick}
      sx={{ mt: "auto", width: "100%", textAlign: "center" }}
    >
      <Button variant="contained" color="error">
        ORDER
      </Button>
    </IconButton>
  );
}

export default OrderButton;
