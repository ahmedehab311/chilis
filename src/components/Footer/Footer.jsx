import "./Footer.css";
import { Stack, Box, Typography } from "@mui/material";
import { ContactUs, Email } from "./index.jsx";
import { useTranslation } from "react-i18next";
function Footer() {
  const { t } = useTranslation();
  return (
    <div id="footer">
      <Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            borderTop: "3px solid #fff",
            background: "#e72323",
            position: "relative",
            p: 1,
            "@media (max-width: 700px)": {
              flexDirection: "column"
            },
          }}
          gap={2}
        >
          <Stack>
            <ContactUs />
          </Stack>
          <Stack>
            {/* <Location /> */}
            <Typography
              sx={{
                color: "#fff",
                background: "#e72323",
                fontWight: "600",
                fontSize: "16px",
                textAlign: "center",
                textTransform: "uppercase",
                pb: 2,
              }}
            >
             {t("all rights chilis")}
            </Typography>
          </Stack>

          <Stack>
            <Email />
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}

export default Footer;
