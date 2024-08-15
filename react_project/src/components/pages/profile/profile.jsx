import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import img from "../profile/user-profile-icon.svg";
import UserInfo from "./userInfo";
import AddressDialog from "../../Menu/order/adderess/addressDaiolg/DialogAdderss.jsx";
import AddNewAddressButton from "../../Menu/order/buttons/AddNewAddressButton.jsx";
const Profile = () => {
  const BASE_URL = "https://myres.me/chilis/api";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  const handleSave = async () => {

    const isConfirmed = window.confirm(
      "Are you sure you want to save these changes?"
    );

    if (!isConfirmed) {
      return; 
    }

    try {
      const api_token = localStorage.getItem("api_token");

      const APIURL = `/profile/update?name=${user.user_name}&phone=${user.phone}&email=${user.email}&api_token=${api_token}`;
      const response = await axios.post(`${BASE_URL}${APIURL}`);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(user));

        window.location.reload();

        localStorage.setItem("profileUpdateSuccess", "true");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile: ", error);
    }
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
        <Stack
          sx={{
            flexGrow: 1,
            width: "60%",
            "@media (max-width: 1000px)": {
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          {/* <Card
            sx={{
              flexGrow: 1,
              border: "1px solid #ddd",
              boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
              ml: "170px",
              "@media (max-width: 1000px)": {
                alignItems: "center",
                maxWidth: "100%",
                ml: "0",
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                justifyContent: "space-between",
                borderBottom: "1px solid #dee2e6",
                padding: "2rem",
                flexWrap: "wrap",
                "@media (max-width:600px)": {
                  justifyContent: "center",
                },
              }}
            >
              <img
                src={img}
                alt="User"
                style={{ borderRadius: "50%", width: "105px", height: "125px" }}
              />
              <Box sx={{ marginLeft: 2 }}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography
                    variant="h6"
                    sx={{
                      // width:"80%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "2rem",
                      fontWeight: "600",
                    }}
                  >
                    {user.user_name}
                    <CheckCircleOutlinedIcon
                      sx={{ color: "#28a745!important", ml: ".3rem" }}
                    />
                  </Typography>
                </Stack>

                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ fontSize: "1.5rem", fontWeight: "500" }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <AddNewAddressButton
              handleClickOpen={handleClickOpen1}
              buttonText="Add Address profile"
              buttonStyle={{
                backgroundColor: "blue",
                "&:hover": { backgroundColor: "darkblue" },
              }}
            />

            <AddressDialog open={openDialog1} onClose={handleClose1} />
          </Card> */}
          <Card
            sx={{
              flexGrow: 1,
              border: "1px solid #ddd",
              boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
              ml: "170px",
              "@media (max-width: 1000px)": {
                alignItems: "center",
                maxWidth: "100%",
                ml: "0",
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                justifyContent: "space-between",
                borderBottom: "1px solid #dee2e6",
                padding: "2rem",
                flexWrap: "wrap",
                "@media (max-width:600px)": {
                  justifyContent: "center",
                },
              }}
            >
              <img
                src={img}
                alt="User"
                style={{ borderRadius: "50%", width: "105px", height: "125px" }}
              />
              <Box sx={{ marginLeft: 2 }}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "2rem",
                      fontWeight: "600",
                    }}
                  >
                    {displayedUser.user_name}
                    <CheckCircleOutlinedIcon
                      sx={{ color: "#28a745!important", ml: ".3rem" }}
                    />
                  </Typography>
                </Stack>

                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ fontSize: "1.5rem", fontWeight: "500" }}
                >
                  {displayedUser.email}
                </Typography>
              </Box>
            </Box>

            <AddNewAddressButton
              handleClickOpen={handleClickOpen1}
              buttonText="Add Address profile"
              buttonStyle={{
                backgroundColor: "blue",
                "&:hover": { backgroundColor: "darkblue" },
              }}
            />

            <AddressDialog open={openDialog1} onClose={handleClose1} />
          </Card>
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
