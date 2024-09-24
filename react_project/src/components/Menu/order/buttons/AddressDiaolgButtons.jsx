/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DialogActions, Button } from "@mui/material";
function AddAddressDiaolg({ handleClose, handleAddAddress, onClose }) {
  return (
    <DialogActions>
      <Button
        onClick={onClose}
        color="error"
        sx={{ fontSize: "1.2rem", fontWeight: "600" }}
      >
        Cancel
      </Button>
      <Button
        onClick={handleAddAddress}
        color="error"
        sx={{ fontSize: "1.2rem", fontWeight: "600" }}
      >
        Add Address
      </Button>
    </DialogActions>
  );
}

export default AddAddressDiaolg;
