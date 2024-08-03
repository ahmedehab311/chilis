// // import { useState, useEffect } from "react";
// // import PropTypes from 'prop-types';
// import { Box, Typography, TextField, Button } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const Profile = () => {
//   const BASE_URL = "https://myres.me/chilis/api";
//   const [user, setUser] = useState({
//     user_name: "",
//     email: "",
//     phone: ""
//   });

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value
//     }));
//   };
  
//   const handleSave = async () => {
//     try {
//       const APIURL = `/updateUser?user_name=${user.user_name}&email=${user.email}&phone=${user.phone}`;
//       const response = await axios.post(`${BASE_URL}${APIURL}`);

//       if (response.data.response) {
//         localStorage.setItem("user", JSON.stringify(user));
//         toast.success("Profile updated successfully!");
//       } else {
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       toast.error("Failed to update profile.");
//       console.error("Error updating profile: ", error);
//     }
//   };

//   return (
//     <Box
//     sx={{
//       padding: 2,
//       backgroundColor: "#fff",
//       borderRadius: "8px",
//       boxShadow: 1,
//       width: "100%",
//       maxWidth: "800px",
//       margin: "auto"
//     }}
//   >
//     <Typography variant="h6" gutterBottom>
//       My Account
//     </Typography>
//     <TextField
//       label="Name"
//       variant="outlined"
//       fullWidth
//       margin="normal"
//       name="user_name"
//       value={user.user_name}
//       onChange={handleInputChange}
//     />
//     <TextField
//       label="Email"
//       variant="outlined"
//       fullWidth
//       margin="normal"
//       name="email"
//       value={user.email}
//       onChange={handleInputChange}
//     />
//     <TextField
//       label="Phone"
//       variant="outlined"
//       fullWidth
//       margin="normal"
//       name="phone"
//       value={user.phone}
//       onChange={handleInputChange}
//     />
//     <Button
//       variant="contained"
//       color="error"
//       onClick={handleSave}
//     >
//       Save changes
//     </Button>
//     <Button
//       variant="contained"
//       color="error"
//       onClick={handleSave}
//       sx={{ marginLeft: "10px" }}
//     >
//       Change password
//     </Button>
//   </Box>
  
// );
// };


// export default Profile;
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // استخدام useNavigate

const Profile = () => {
  const BASE_URL = "https://myres.me/chilis/api";
  const navigate = useNavigate(); // إنشاء المتغير navigate
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const APIURL = `/profile/update/password?new_password=123456789&api_token=isUDRprbPeleP56iKZWfeAqdwsu9afjeKbPhcjGHRPNLQrWN609QYzv8kRyDDz7M`;
      const response = await axios.post(`${BASE_URL}${APIURL}`);

      if (response.data.response) {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Profile updated successfully!");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile: ", error);
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password"); // التنقل إلى صفحة تغيير كلمة المرور
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: 1,
        width: "100%",
        maxWidth: "800px",
        margin: "auto"
      }}
    >
      <Typography variant="h6" gutterBottom>
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
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={user.email}
        onChange={handleInputChange}
      />
      <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        name="phone"
        value={user.phone}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="error"
        onClick={handleSave}
      >
        Save changes
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleChangePassword} // استخدام handleChangePassword
        sx={{ marginLeft: "10px" }}
      >
        Change password
      </Button>
    </Box>
  );
};

export default Profile;
