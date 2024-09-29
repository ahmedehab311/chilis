/* eslint-disable react/prop-types */
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
function DiaolgLabels({ handleSelectLabel, currentAddress }) {
  const { t } = useTranslation();
  return (
    <Stack
      direction="row"
      spacing={1}
      mt={2}
      sx={{
        justifyContent: "center",
        "@media (max-width: 700px)": {
          flexWrap: "wrap !important",
        },
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleSelectLabel("Home")}
        sx={{
          fontSize: "1.1rem",
          fontWeight: "500",

          border: currentAddress.label === t("address.labels.home") ? "2px solid #d32f2f" : "",
        }}
      >
        {t("address.labels.home")}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleSelectLabel("Work")}
        sx={{
          fontSize: "1.1rem",
          fontWeight: "500",
          border: currentAddress.label === t("address.labels.work") ? "2px solid #d32f2f" : "",
        }}
      >
        {t("address.labels.work")}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleSelectLabel("Other")}
        sx={{
          fontSize: "1.1rem",
          fontWeight: "500",
          border: currentAddress.label === t("address.labels.other") ? "2px solid #d32f2f" : "",
        }}
      >
        {t("address.labels.other")}
      </Button>
    </Stack>
  );
}

export default DiaolgLabels;
