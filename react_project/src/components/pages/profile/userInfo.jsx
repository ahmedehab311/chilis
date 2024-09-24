import { Box, Typography, TextField, Button, Stack } from "@mui/material";
function userInfo({
  handleInputChange,
  user,
  handleSave,
  handleChangePassword,
}) {

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        flexGrow: 2,
        width: "100%",
        padding: 2,
        "@media (max-width: 1000px)": {
          width: "80%",
        },
      }}
    >
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: 1,
          width: "100%",
          maxWidth: "800px",
          margin: " 34px 0 0 37px",
          justifyContent: "center",
          alignItems: "center",
          "@media (max-width: 1000px)": {
            margin: " 0 0 0 0",
          },
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
        <Stack sx={{ textTransform: "capitalize", fontSize: "1.5rem" }}>
          <Typography sx={{  m: ".5rem 0 .5rem 0", fontSize: "1.6rem" }}>
            name
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            name="user_name"
            value={user.user_name}
            onChange={handleInputChange}
            sx={{
             mt:0,
             "& .MuiInputBase-input": {
               fontSize: "1.3rem",
               color: "gray",
             },
             "& .MuiInputLabel-root": {
               fontSize: "1.2rem",
             },
           }}
          />
        </Stack>
        {/* <Stack>
          <Typography sx={{  m: ".5rem 0 .5rem 0", fontSize: "1.6rem" }}>
            Phone
          </Typography>
          <TextField
            variant="outlined"
        fullWidth
        margin="normal"
        name="phone"
        value={user.phone}
        onChange={handleInputChange}
        type="tel"
        inputMode="numeric" // Use numeric mode for numeric keyboards on mobile
        pattern="[0-9]*" // Restrict input to numbers only
        sx={{
          m: 0,
          "& .MuiInputBase-input": {
            fontSize: "1.3rem",
            color: "gray",
          },
          "& .MuiInputLabel-root": {
            fontSize: "1.2rem",
          },
        }}
      />
        </Stack> */}
        <Stack>
      <Typography sx={{ m: ".5rem 0", fontSize: "1.6rem" }}>
        Phone
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        margin="normal"
        name="phone"
        value={user.phone}
        onChange={(e) => {
          // Ensure only numeric values are set
          const value = e.target.value.replace(/\D/g, '');
          handleInputChange({ target: { name: 'phone', value } });
        }}
        type="tel"
        inputMode="numeric" // Use numeric mode for numeric keyboards on mobile
        pattern="[0-9]*" // Restrict input to numbers only
        sx={{
          m: 0,
          "& .MuiInputBase-input": {
            fontSize: "1.3rem",
            color: "gray",
          },
          "& .MuiInputLabel-root": {
            fontSize: "1.2rem",
          },
        }}
      />
    </Stack>
        <Stack>
          <Typography sx={{ m: ".5rem 0 .5rem 0", fontSize: "1.6rem" }}>
            Email
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            sx={{
              m: 0,
              "& .MuiInputBase-input": {
                fontSize: "1.5rem",
                color: "gray",
              },
              "& .MuiInputLabel-root": {
                fontSize: "1.2rem",
              },
            }}
          />
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{ display: "flex", flexWrap: "wrap", mt: "3rem" }}
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
  );
}

export default userInfo;
