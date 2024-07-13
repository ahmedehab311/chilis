import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Box, Stack, Typography } from "@mui/material";

function Box3() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Stack>
        <EmailOutlinedIcon fontSize='20px' margin />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: "12px", width:"100%" }}>AhmedEhab.47aa@gmail.com</Typography>
      </Stack>

    </Box>
  )
}

export default Box3
