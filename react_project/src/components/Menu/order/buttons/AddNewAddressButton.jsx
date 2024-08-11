import { Button, Stack } from "@mui/material"

function AddNewAddressButton({handleClickOpen}) {
  return (
    <Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "#d32f2f",
            "&:hover": {
              backgroundColor: "#9a0007",
            },
          }}
        >
          Add New Address
        </Button>
      </Stack>
  )
}

export default AddNewAddressButton