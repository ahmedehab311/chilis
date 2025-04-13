/* eslint-disable react/prop-types */
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
function AddNewAddressButton({ handleClickOpen, buttonStyle, stackStyle }) {
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        alignItems: "center",
        mb: "4px",

        ...stackStyle,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{
        textTransform: "capitalize",
          backgroundColor: "#d32f2f",
          fontSize: "1.2rem",

          fontWeight: "bold",
          fontFamily: "tahoma",
          "&:hover": {
            backgroundColor: "#9a0007",
          },
          ...buttonStyle,
        }}
      >
        {t("address.Add Address")}
      </Button>
    </Stack>
  );
}

export default AddNewAddressButton;
