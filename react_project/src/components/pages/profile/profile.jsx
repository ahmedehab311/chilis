import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserInfo from "./userInfo";
import UserCard from "./InfoUserCard/UserCard.jsx";
import { handleSave } from "./HandleSaveProfile.jsx";
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    phone: "",
  });

  const [displayedUser, setDisplayedUser] = useState({
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
      setDisplayedUser({
        user_name: storedUser.user_name,
        email: storedUser.email,
        phone: storedUser.phone,
      });
    }
  }, []);
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  if (storedUser) {
    setUser(storedUser);
    setDisplayedUser(storedUser);
  }
}, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const onSave = () => {
    handleSave(user);
  };
  useEffect(() => {
    if (localStorage.getItem("profileUpdateSuccess") === "true") {
      toast.success("Profile updated successfully!");

      localStorage.removeItem("profileUpdateSuccess");
    }
  }, []);

  const handleChangePassword = () => {
    navigate("/change-password");
  };
  const [openDialog1, setOpenDialog1] = useState(false);

  const handleClickOpen1 = () => {
    setOpenDialog1(true);
  };

  const handleClose1 = () => {
    setOpenDialog1(false);
  };

  return (
    <>
      <Stack
        spacing={4}
        direction={"row"}
        alignItems="flex-start"
        justifyContent="center"
        sx={{
          mt: "6rem",
          display: "flex",
          "@media (max-width: 1000px)": {
            flexDirection: "column !important",
            alignItems: "center",
          },
        }}
      >
        <UserCard
          displayedUser={displayedUser}
          handleClickOpen1={handleClickOpen1}
          openDialog1={openDialog1}
          handleClose1={handleClose1}
        />
        <UserInfo
          handleInputChange={handleInputChange}
          handleChangePassword={handleChangePassword}
          handleSave={onSave}
          user={user}
        />
      </Stack>
    </>
  );
};

export default Profile;
