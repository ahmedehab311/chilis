/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DialogActions, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
function AddAddressDiaolg({ handleClose, handleAddAddress, onClose }) {
  const { t, i18n } = useTranslation();
  return (
    <DialogActions>
      <Button
        onClick={onClose}
        color="error"
        sx={{ fontSize: "1.2rem", fontWeight: "600" }}
      >
        {t("cancel")}
      </Button>
      <Button
        onClick={handleAddAddress}
        color="error"
        sx={{ fontSize: "1.2rem", fontWeight: "600" }}
      >
        {t("address.Add Address")}
      </Button>
    </DialogActions>
  );
}

export default AddAddressDiaolg;
