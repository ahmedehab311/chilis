import { Button, IconButton, Stack } from "@mui/material";

function AddToCardButton() {
  return (
    <Stack
      // sx={{
      //   mt: "auto",
      //   width: "100%",
      //   textAlign: "center",
      //   '&:active': {
      //     backgroundColor: 'transparent', // Disable active background color change
      //   },
      //   '&:focus': {
      //     backgroundColor: 'inherit', // Disable focus background color change
      //   },
      // }}
      className="AddToCardBtn"
    >
      <Button variant="contained" color="error">
        Add to card
      </Button>
    </Stack>
  );
}

export default AddToCardButton;
