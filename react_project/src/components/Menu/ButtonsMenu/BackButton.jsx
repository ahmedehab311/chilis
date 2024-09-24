/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material"

function BackButton({handleBackClick}) {
  return (
    <Box sx={{ mt: 4 }}>
    <Button variant="contained" color="error" onClick={handleBackClick}>
      Back
    </Button>
  </Box>
  )
}

export default BackButton
