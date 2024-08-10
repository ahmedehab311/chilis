import { Button, Stack } from "@mui/material";

function DiaolgLabels({ handleSelectLabel, currentAddress }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      mt={2}
      sx={{
        "@media (max-width: 700px)": {
          flexWrap: "wrap !important",
        },
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleSelectLabel("Home")}
        sx={{
          border: currentAddress.label === "Home" ? "2px solid #d32f2f" : "",
        }}
      >
        Home
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleSelectLabel("Work")}
        sx={{
          border: currentAddress.label === "Work" ? "2px solid #d32f2f" : "",
        }}
      >
        Work
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleSelectLabel("Other")}
        sx={{
          border: currentAddress.label === "Other" ? "2px solid #d32f2f" : "",
        }}
      >
        Other
      </Button>
    </Stack>
  );
}

export default DiaolgLabels;
