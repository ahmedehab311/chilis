/* eslint-disable react/prop-types */
import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
function DiolgTitle({ onClose }) {
  const { t } = useTranslation();

  return (
    <>
      <Stack sx={{ p: 2 }} direction={"row"} alignItems={"center"}>
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: "500",
            textAlign: "left",
          }}
        >
          {t("address.Add Delivery Address")}
        </Typography>
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "transparent", // إزالة لون الخلفية عند التمرير
              opacity: "1",
              transition: ".5s",
            },
            cursor: "pointer", // أو يمكنك ضبط المؤشر ليبقى كما هو
            position: "absolute",
            top: 8,
            right: 8,
            opacity: ".6",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
    </>
  );
}

export default DiolgTitle;
