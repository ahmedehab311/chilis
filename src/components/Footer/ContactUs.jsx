import { Box, Stack } from "@mui/material";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import { useTranslation } from "react-i18next";
function ContactUs() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        my: 3,
        fontSize: "25px",
        color: "#fff",
        margin: 0,
      }}
    >
      <Stack>
        <WifiCalling3Icon fontSize="25px" />
      </Stack>
      <Stack
        sx={{
          color: "#fff",
          background: "#e72323",
          fontWight: "600",
          fontSize: "2.5rem",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing:2,
          
        }}
      >
        {" "}
        {t("callus")}
      </Stack>
    </Box>
  );
}

export default ContactUs;
