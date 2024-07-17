import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Stack, Typography } from "@mui/material";

function Email() {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Stack>
        <EmailOutlinedIcon
          fontSize="25px"
          sx={{
            marginBottom: "12px",
            fontSize: "22px",
            color: "#fff",
            marginRight: "6px",
          }}
        />
      </Stack>
      <Stack>
        <Typography
          sx={{
            fontSize: "14px",
            width: "100%",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          E-mail.info@chilis.eg.com
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Email;
