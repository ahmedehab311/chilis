import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
  } from "@mui/material";
function userInfo({handleInputChange,user,handleSave,handleChangePassword}) {
  return (
    <Stack
    direction={"row"}
    alignItems={"center"}
    sx={{ display: "flex", justifyContent: "center" }}
  >
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: 1,
        // width: "100%",
        maxWidth: "800px",
        margin: "4rem 1rem 1rem 1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        va
        riant="h6"
        gutterBottom
        sx={{ fontSize: "2rem", fontWeight: "600" }}
      >
        My Account
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="user_name"
        value={user.user_name}
        onChange={handleInputChange}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1.5rem", // لتغيير حجم النص
            color: "gray",
          },
          "& .MuiInputLabel-root": {
            fontSize: "1.2rem", // لتكبير حجم الـ label
          },
        }}
      />
      <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        name="phone"
        value={user.phone}
        onChange={handleInputChange}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1.5rem", // لتغيير حجم النص
            color: "gray",
          },
          "& .MuiInputLabel-root": {
            fontSize: "1.2rem", // لتكبير حجم الـ label
          },
        }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1.5rem", // لتغيير حجم النص
            color: "gray",
          },
          "& .MuiInputLabel-root": {
            fontSize: "1.2rem", // لتكبير حجم الـ label
          },
        }}
      />

      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        <Button variant="contained" color="error" onClick={handleSave}>
          Save changes
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleChangePassword}
          sx={{ marginLeft: "10px" }}
        >
          Change password
        </Button>
      </Stack>
    </Box>
  </Stack>
  )
}

export default userInfo
