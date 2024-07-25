/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";
// import { Box, Button, TextField, Typography, Stack } from "@mui/material";
// import axios from "axios";
// import { useState } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { toast } from "react-toastify";

// const LoginPage = ({ setToken }) => {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
  
//   const BASE_URL = "https://myres.me/chilis/api";
  
//   const login = async (e) => {
//     e.preventDefault();
    
//     const APIURL = `/login?phone=${phone}&password=${password}&email=${phone}`;
//     try {
//       const response = await axios.post(`${BASE_URL}${APIURL}`);

//       console.log("Response:", response.data);
//       if (response.data.response) {
//         const token = response.data.data.token;
//         if (token) {
//           setToken(token);
//           localStorage.setItem("token", token);
//           toast.success("Login successful!");
//           navigate("/");
//         } else {
//           throw new Error("Token not found");
//         }
//       } else {
//         throw new Error(response.data.messages || "Login failed");
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.messages || "Invalid User Name or Password";
//       toast.error(errorMessage);
//       console.error("Error logging in: ", errorMessage);
//     }
//   };


//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "100vh",
//         backgroundColor: "#f5f5f5",
//         padding: "20px",
//       }}
//     >
//       <Stack
//         direction={{ xs: "column", md: "row" }}
//         spacing={4}
//         sx={{ width: "100%", maxWidth: "800px" }}
//       >
//         <Box
//           component="form"
//           onSubmit={login}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             backgroundColor: "#fff",
//             padding: "20px",
//             borderRadius: "8px",
//             boxShadow: 1,
//             flex: 1,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Welcome Back
//           </Typography>
//           <Typography variant="h6" gutterBottom>
//             Sign in to continue
//           </Typography>
//           <TextField
//             label="Enter Your Phone"
//             variant="outlined"
//             fullWidth
//             required
//             onChange={e => setPhone(e.target.value) }
//             value={phone}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             required
//             onChange={e => setPassword(e.target.value) }
//             value={password}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//           >
//             Login
//           </Button>
//           <Typography
//             variant="body2"
//             align="center"
//             sx={{ mt: 1 }}
//           >
//             <RouterLink to="/forgot-password">
//               Forgot Your Password?
//             </RouterLink>
//           </Typography>
//           <Typography
//             variant="body2"
//             align="center"
//             sx={{ mt: 2 }}
//           >
//             <RouterLink to="/register">
//               Don't have an account? Sign up
//             </RouterLink>
//           </Typography>
//         </Box>
//       </Stack>
//     </Box>
//   );
// }

// export default LoginPage;

import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = ({ setToken }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  
  const BASE_URL = "https://myres.me/chilis/api";
  
  const login = async (e) => {
    e.preventDefault();
  
    const APIURL = `/login?phone=${phone}&password=${password}&email=${phone}`;
    try {
      const response = await axios.post(`${BASE_URL}${APIURL}`);
      console.log("Response:", response.data); // تحقق من استجابة API
      if (response.data.response) {
        const token = response.data.data.token;
        if (token) {
          setToken(token);
          localStorage.setItem("token", token);
  
          // تحديث بيانات المستخدم
          setUserData(response.data.data.user); // استخدم بيانات المستخدم مباشرةً
  
          toast.success("Login successful!");
          navigate("/");
        } else {
          throw new Error("Token not found");
        }
      } else {
        throw new Error(response.data.messages || "Login failed");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.messages || "Invalid User Name or Password";
      toast.error(errorMessage);
      console.error("Error logging in: ", errorMessage);
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
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        sx={{ width: "100%", maxWidth: "800px" }}
      >
        <Box
          component="form"
          onSubmit={login}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 1,
            flex: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="h6" gutterBottom>
            Sign in to continue
          </Typography>
          <TextField
            label="Enter Your Phone"
            variant="outlined"
            fullWidth
            required
            onChange={e => setPhone(e.target.value)}
            value={phone}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1 }}
          >
            <RouterLink to="/forgot-password">
              Forgot Your Password?
            </RouterLink>
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            <RouterLink to="/register">
              Don't have an account? Sign up
            </RouterLink>
          </Typography>
        </Box>
      </Stack>

      {/* Display user information if logged in */}
      {userData.userName && (
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: 1,
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            User Information
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.userName}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.email}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.phone}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;
