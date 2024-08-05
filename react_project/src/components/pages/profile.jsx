// // import { Box, Typography, TextField, Button } from "@mui/material";
// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { toast } from "react-toastify";
// // import { useNavigate } from "react-router-dom"; // استخدام useNavigate

// // const Profile = () => {
// //   const BASE_URL = "https://myres.me/chilis/api";
// //   const navigate = useNavigate(); // إنشاء المتغير navigate
// //   const [user, setUser] = useState({
// //     user_name: "",
// //     email: "",
// //     phone: ""
// //   });

// //   useEffect(() => {
// //     const storedUser = JSON.parse(localStorage.getItem("user"));
// //     if (storedUser) {
// //       setUser(storedUser);
// //     }
// //   }, []);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setUser((prevUser) => ({
// //       ...prevUser,
// //       [name]: value
// //     }));
// //   };

// //   const handleSave = async () => {
// //     try {
// //       const api_token = localStorage.getItem("api_token");

// //       const APIURL = `/profile/update/password?new_password=${form.new_password}&api_token=${api_token}`;
// //       const response = await axios.post(`${BASE_URL}${APIURL}`);

// //       if (response.data.response) {
// //         localStorage.setItem("user", JSON.stringify(user));
// //         toast.success("Profile updated successfully!");
// //       } else {
// //         throw new Error("Update failed");
// //       }
// //     } catch (error) {
// //       toast.error("Failed to update profile.");
// //       console.error("Error updating profile: ", error);
// //     }
// //   };

// //   const handleChangePassword = () => {
// //     navigate("/change-password"); // التنقل إلى صفحة تغيير كلمة المرور
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         padding: 2,
// //         backgroundColor: "#fff",
// //         borderRadius: "8px",
// //         boxShadow: 1,
// //         width: "100%",
// //         maxWidth: "800px",
// //         margin: "auto"
// //       }}
// //     >
// //       <Typography variant="h6" gutterBottom>
// //         My Account
// //       </Typography>
// //       <TextField
// //         label="Name"
// //         variant="outlined"
// //         fullWidth
// //         margin="normal"
// //         name="user_name"
// //         value={user.user_name}
// //         onChange={handleInputChange}
// //       />
// //       <TextField
// //         label="Email"
// //         variant="outlined"
// //         fullWidth
// //         margin="normal"
// //         name="email"
// //         value={user.email}
// //         onChange={handleInputChange}
// //       />
// //       <TextField
// //         label="Phone"
// //         variant="outlined"
// //         fullWidth
// //         margin="normal"
// //         name="phone"
// //         value={user.phone}
// //         onChange={handleInputChange}
// //       />
// //       <Button
// //         variant="contained"
// //         color="error"
// //         onClick={handleSave}
// //       >
// //         Save changes
// //       </Button>
// //       <Button
// //         variant="contained"
// //         color="error"
// //         onClick={handleChangePassword} // استخدام handleChangePassword
// //         sx={{ marginLeft: "10px" }}
// //       >
// //         Change password
// //       </Button>
// //     </Box>
// //   );
// // };

// // export default Profile;
// import { Box, Typography, TextField, Button } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const BASE_URL = "https://myres.me/chilis/api";
//   const navigate = useNavigate();
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
//       const api_token = localStorage.getItem("api_token");
//       const APIURL = `/profile/update?name=${user.user_name}&phone=${user.phone}&email=${user.email}&api_token=${api_token}`;
//       const response = await axios.post(`${BASE_URL}${APIURL}`);

//       if (response.data.response) {
//         console.log(response.data.response)
//         localStorage.setItem("user", JSON.stringify(user));
//         console.log(user)
//         toast.success("Profile updated successfully!");
//       } else {
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       toast.error("Failed to update profile.");
//       console.error("Error updating profile: ", error);
//     }
//   };

//   const handleChangePassword = () => {
//     navigate("/change-password");
//   };

//   return (
//     <Box
//       sx={{
//         padding: 2,
//         backgroundColor: "#fff",
//         borderRadius: "8px",
//         boxShadow: 1,
//         width: "100%",
//         maxWidth: "800px",
//         margin: "auto"
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         My Account
//       </Typography>
//       <TextField
//         label="Name"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         name="user_name"
//         value={user.user_name}
//         onChange={handleInputChange}
//       />
//       <TextField
//         label="Email"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         name="email"
//         value={user.email}
//         onChange={handleInputChange}
//       />
//       <TextField
//         label="Phone"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         name="phone"
//         value={user.phone}
//         onChange={handleInputChange}
//       />
//       <Button
//         variant="contained"
//         color="error"
//         onClick={handleSave}
//       >
//         Save changes
//       </Button>
//       <Button
//         variant="contained"
//         color="error"
//         onClick={handleChangePassword} // استخدام handleChangePassword
//         sx={{ marginLeft: "10px" }}
//       >
//         Change password
//       </Button>
//     </Box>
//   );
// };

// export default Profile;
import { Box, Typography, TextField, Button, Stack, CardMedia } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import img from "./user-profile-icon"

 const Profile = () => {
  const BASE_URL = "https://myres.me/chilis/api";
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        user_name: storedUser.user_name,
        email: storedUser.email,
        phone: storedUser.phone,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const api_token = localStorage.getItem("api_token");

      const APIURL = `/profile/update?name=${user.user_name}&phone=${user.phone}&email=${user.email}&api_token=${api_token}`;
      const response = await axios.post(`${BASE_URL}${APIURL}`);

      if (response.data) {
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
    navigate("/change-password");
  };

  return (
<>
<Stack direction={"row"} alignItems={"center"}  sx={{display:"flex"}}>

    <Box sx={{
       padding: 2,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: 1,
        // width: "100%",
        maxWidth: "800px",
        // margin: "auto",
    }}>
    
   <Stack alignItems={"end"}>
   {/* <img src={img} alt="User" style={{ borderRadius: '50%', width: '100px', height: '100px' }} /> */}
   <Typography sx={{fontSize:"22px", fontWight:"bold"}}>{user.user_name}</Typography>
   <Typography sx={{fontSize:"18px", fontWight:"bold"}}>{user.email}</Typography>
   </Stack>
    </Box>


    <Box
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: 1,
        // width: "100%",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <Typography va riant="h6" gutterBottom>
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
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        name="phone"
        value={user.phone}
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
      
    </Box>
</Stack>
</>
  );
};

export default Profile;
