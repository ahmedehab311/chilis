// /* eslint-disable react/no-unescaped-entities */
// import { Box, Button, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import { useState } from "react";
// import { Link, Link as RouterLink } from "react-router-dom";
// import { toast } from "react-toastify";
// function ForgetPass() {
//   const BASE_URL = "https://myres.me/chilis/api";
//   const [form, setForm] = useState({
//     email: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };
//   const handleForgetPass = async (event) => {
//     try {
//       const api_token = localStorage.getItem("token");
//       if (api_token) {
//         toast.error("API token is missing. Please log in again.");
//         return;
//       }

//       const APIURL = `/forgot-password?phone=${form.email}&api_api_token=${api_token}`;

//       const response = await axios.get(`${BASE_URL}${APIURL}`);
//       console.log(response.data);

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
//     // <Box
//     //   sx={{
//     //     display: "flex",
//     //     flexDirection: "column",
//     //     alignItems: "center",
//     //     justifyContent: "center",
//     //     minHeight: "100vh",
//     //     backgroundColor: "#f5f5f5",
//     //     padding: "20px",
//     //   }}
//     // >
//     //   <Typography variant="h3" gutterBottom>
//     //     Forgot Password
//     //   </Typography>
//     //   <Typography variant="h5" gutterBottom>
//     //     Enter your email address below and we'll send you an email with
//     //     instructions on how to change your password
//     //   </Typography>
//     //   <Box
//     //     component="form"
//     //     onSubmit={handleForgotPassword}
//     //     sx={{
//     //       display: "flex",
//     //       flexDirection: "column",
//     //       gap: 2,
//     //       backgroundColor: "#fff",
//     //       padding: "20px",
//     //       borderRadius: "8px",
//     //       boxShadow: 1,
//     //       width: "100%",
//     //       maxWidth: "400px",
//     //     }}
//     //   >
//     //     <TextField
//     //       label="Email"
//     //       type="email"
//     //       variant="outlined"
//     //       fullWidth
//     //       required
//     //       InputProps={{ style: { fontSize: "1.6rem", fontWeight: "bold" } }}
//     //       InputLabelProps={{ fontSize: "1.6rem", fontWeight: "bold" }}
//     //     />
//     //     <Button
//     //       type="submit"
//     //       variant="contained"
//     //       color="primary"
//     //       sx={{ fontSize: "15px" }}
//     //     >
//     //       Send
//     //     </Button>
//     //     <Typography
//     //       variant="body2"
//     //       align="center"
//     //       sx={{ mt: 2, fontSize: "20px" }}
//     //     >
//     //       <Link component={RouterLink} to="/login">
//     //         Already an account? Sign in
//     //       </Link>
//     //     </Typography>
//     //   </Box>
//     // </Box>
//     <Box
//     sx={{
//       padding: 2,
//       backgroundColor: "#fff",
//       borderRadius: "8px",
//       boxShadow: 1,
//       width: "100%",
//       maxWidth: "800px",
//       margin: "auto",
//     }}
//   >
//     <Typography variant="h6" gutterBottom>
//       Change Password
//     </Typography>
//     <TextField
//       label="Phone"
//       variant="outlined"
//       fullWidth
//       margin="normal"
//       name="email"
//       value={form.email}
//       onChange={handleInputChange}
//     />


//     <Button variant="contained" color="error" onClick={handleForgetPass}>
//  Send
//     </Button>
//   </Box>
//   );
// }

// export default ForgetPass;
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function ForgetPass() {
  const BASE_URL = "https://myres.me/chilis/api";
  const [form, setForm] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleForgetPass = async (event) => {
    event.preventDefault(); 
    try {
      const api_token = localStorage.getItem("token");
      // if (!api_token) {
      //   toast.error("number");
      //   return;
      // }

      const APIURL = `/forgot-password?phone=${form.email}&api_token=${api_token}`;

      const response = await axios.get(`${BASE_URL}${APIURL}`);
      console.log(response.data);

      if (response.data && response.data.response) {
        toast.success("Password reset instructions have been sent to your email!");
      } else {
        throw new Error("Password reset failed");
      }
    } catch (error) {
      toast.error("Failed to reset password.");
      console.error("Error resetting password: ", error);
    }
  };

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "20px",
    }}
  >
      
      <Typography variant="h6" gutterBottom>
        Forgot Password
       </Typography>
     <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={form.email}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="error"
        onClick={handleForgetPass}
      >
        Send
      </Button>
      
    </Box>
  );
}

export default ForgetPass;
