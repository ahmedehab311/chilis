/* eslint-disable react/prop-types */
import { Button, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
function OrderButton({ handleItemClick }) {
  const { t } = useTranslation();
  return (
    <IconButton
      // eslint-disable-next-line no-undef
      onClick={() => handleItemClick}
      sx={{ mt: "auto", width: "100%", textAlign: "center" }}
    >
      <Button
        variant="contained"
        color="error"
        sx={{
          textTransform: "uppercase",
          fontSize: "1.2rem",
          fontWeight: "500",
        }}
      >
        {t("order")}
      </Button>
    </IconButton>
  );
}

export default OrderButton;
