/* eslint-disable react/prop-types */
import { Button, Stack } from "@mui/material";

function AddToCardButton({ onClick }) {
  return (
    <Stack className="AddToCardBtn">
      <Button variant="contained" color="error" onClick={onClick}>
        Add to Cart
      </Button>
    </Stack>
  );
}

export default AddToCardButton;
