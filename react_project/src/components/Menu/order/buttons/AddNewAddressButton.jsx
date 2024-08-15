/* eslint-disable react/prop-types */
import { Button, Stack } from "@mui/material";

function AddNewAddressButton({
  handleClickOpen,
  buttonText,
  buttonStyle,
  stackStyle,
}) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        mb: "4px",
        ...stackStyle,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#d32f2f",
          "&:hover": {
            backgroundColor: "#9a0007",
          },
          ...buttonStyle,
        }}
      >
        {buttonText}
      </Button>
    </Stack>
  );
}

export default AddNewAddressButton;
