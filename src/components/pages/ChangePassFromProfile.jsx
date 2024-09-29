// import { Box, Typography, TextField, Button, Stack } from "@mui/material";
// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const ChangePassword = () => {

//   const [form, setForm] = useState({
//     email: "",
//     old_password: "",
//     new_password: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleChangePassword = async () => {
//     try {
//       // const api_token = localStorage.getItem("api_token");
//       const api_token = localStorage.getItem("token");
//       if (!api_token) {
//         toast.error("API token is missing. Please log in again.");
//         return;
//       }

//       const APIURL = `/profile/update/password?email=${form.email}&password=${form.old_password}&new_password=${form.new_password}&api_token=${api_token}`;

//       const response = await axios.post(`${BASE_URL}${APIURL}`);
//       console.log("response", response.data);

//       if (response.data && response.data.response) {
//         toast.success("Password changed successfully!");
//       } else {
//         throw new Error("Password change failed");
//       }
//     } catch (error) {
//       toast.error("Failed to change password.");
//       console.error("Error changing password: ", error);
//     }
//   };

//   return (
//     <Stack>
//       <Box
//         sx={{
//           padding: 2,
//           backgroundColor: "#fff",
//           borderRadius: "8px",
//           boxShadow: 1,
//           maxWidth: "800px",
//           margin: "20px auto",
//           width: "100%",
//           "@media (max-width: 1000px)": {
//             width: "80%",
//           },
//         }}
//       >
//         <Typography
//           variant="h6"
//           gutterBottom
//           sx={{ fontSize: "2.3rem", fontWeight: "600" }}
//         >
//           Change Password
//         </Typography>
//         <Typography
//           variant="h6"
//           gutterBottom
//           sx={{ fontSize: "1.9rem", fontWeight: "400" }}
//         >
//           Enter your email address, old password and new password below.
//         </Typography>

//         <Stack>
//           <Typography sx={{ m: "10px 0 10px 0", fontSize: "1.6rem" }}>
//             Email
//           </Typography>
//           <TextField
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="email"
//             value={form.email}
//             onChange={handleInputChange}
//             placeholder="Enter Your Email Adderss"
//             sx={{
//               m: "0",
//               "& .MuiInputBase-input": {
//                 fontSize: "1.5rem",
//                 color: "gray",
//               },
//               "& .MuiInputLabel-root": {
//                 fontSize: "1.2rem",
//               },
//             }}
//           />
//         </Stack>

//         <Stack>
//           <Typography sx={{ m: "10px 0 10px 0", fontSize: "1.6rem" }}>
//             Old Password
//           </Typography>
//           <TextField
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="old_password"
//             type="password"
//             value={form.old_password}
//             onChange={handleInputChange}
//             placeholder="Enter Old Password"
//             sx={{
//               m: "0",
//               "& .MuiInputBase-input": {
//                 fontSize: "1.5rem",
//                 color: "gray",
//               },
//               "& .MuiInputLabel-root": {
//                 fontSize: "1.2rem",
//               },
//             }}
//           />
//         </Stack>
//         <Stack>
//           <Typography sx={{ m: "10px 0 10px 0", fontSize: "1.6rem" }}>
//             New Password
//           </Typography>
//           <TextField
//             // label="New Password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="new_password"
//             type="password"
//             value={form.new_password}
//             onChange={handleInputChange}
//             placeholder="Enter Nre Password"
//             sx={{
//               m: "0",
//               "& .MuiInputBase-input": {
//                 fontSize: "1.5rem",
//                 color: "gray",
//               },
//               "& .MuiInputLabel-root": {
//                 fontSize: "1.2rem",
//               },
//             }}
//           />
//         </Stack>
//         <Button
//           variant="contained"
//           color="error"
//           onClick={handleChangePassword}
//           sx={{ mt: "1rem" }}
//         >
//           Save changes
//         </Button>
//       </Box>
//     </Stack>
//   );
// };

// export default ChangePassword;
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../setting";
const ChangePassword = () => {
  const [form, setForm] = useState({
    email: "",
    old_password: "",
    new_password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    try {
      const api_token = localStorage.getItem("token");
      if (!api_token) {
        toast.error("API token is missing. Please log in again.");
        return;
      }

      const APIURL = `/profile/update/password?email=${form.email}&password=${form.old_password}&new_password=${form.new_password}&api_token=${api_token}`;

      const response = await axios.post(`${BASE_URL}${APIURL}`);
      console.log(response.data);

      if (response.data && response.data.response) {
        toast.success("Password changed successfully!");
      } else {
        throw new Error("Password change failed");
      }
    } catch (error) {
      toast.error("Failed to change password.");
      console.error("Error changing password: ", error);
    }
  };

  return (
<Stack >
<Box
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: 1,
        maxWidth: "800px",
        margin: "20px auto",
        width: "100%",
        "@media (max-width: 1000px)": {
        width: "80%",
         
        },
      }}
      
    >
      <Typography variant="h6" gutterBottom >
        Change Password
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={form.email}
        onChange={handleInputChange}
      />
      <TextField
        label="Old Password"
        variant="outlined"
        fullWidth
        margin="normal"
        name="old_password"
        type="password"
        value={form.old_password}
        onChange={handleInputChange}
      />
      <TextField
        label="New Password"
        variant="outlined"
        fullWidth
        margin="normal"
        name="new_password"
        type="password"
        value={form.new_password}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="error" onClick={handleChangePassword}>
        Save changes
      </Button>
    </Box>
</Stack>
  );
};

export default ChangePassword;