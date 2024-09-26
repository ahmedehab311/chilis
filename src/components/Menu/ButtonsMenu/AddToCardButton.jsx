/* eslint-disable react/prop-types */
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
function AddToCardButton({ onClick }) {
  const { t } = useTranslation();
  // const isArabic = i18n.language === "ar";
  return (
    <Stack className="AddToCardBtn">
      <Button variant="contained" color="error" onClick={onClick} sx={{fontSize:"1.3rem"}}>
        {t('Add to Cart')}
      </Button>
    </Stack>
  );
}

export default AddToCardButton;
