import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import img from "./user-profile-icon"
import CardProfile from "./AuthUseProfile";
import UserInfo from "./userInfo";
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
      {/* <Stack
      spacing={4}
        direction={"row"}
        alignItems={"center"}
        sx={{
          mt: "6rem",
          display: "flex",
          "@media (max-width: 1000px)": {
            flexDirection: "column !important",
          },
        }}
      >
        <CardProfile user={user} />
        <UserInfo
          handleInputChange={handleInputChange}
          handleChangePassword={handleChangePassword}
          handleSave={handleSave}
          user={user}
        />
      </Stack> */}
      <Stack
      spacing={4}
      direction={"row" }
      alignItems="flex-start"
      // alignItems="center"
      justifyContent="center"
      sx={{
          mt: "6rem",
          display: "flex",
          "@media (max-width: 1000px)": {
            flexDirection: "column !important",
            alignItems:"center"
          },
        }}
    >
     <Stack
       sx={{
        flexGrow: 1,
        
        // width: { md: "70%" }, //
        width:"60%", 
        
        "@media (max-width: 1000px)": {
          // width: "159%",
        alignItems: "center",
        justifyContent: "center",
        },
      }}
      >
     <CardProfile user={user} />
     </Stack>
      <UserInfo
        handleInputChange={handleInputChange}
        handleChangePassword={handleChangePassword}
        handleSave={handleSave}
        user={user}
      />
    </Stack>
    </>
  );
};

export default Profile;
