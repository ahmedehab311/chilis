import { Button, IconButton } from "@mui/material"

function AddToCardButton() {
  return (
    <IconButton sx={{ mt: "auto", width: "100%", textAlign: "center" }} className="AddToCardBtn">
    <Button variant="contained" color="error">
      Add to card
    </Button>
  </IconButton>
  )
}

export default AddToCardButton
