import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../setting";
import { useTranslation } from "react-i18next";

export const HandleSave = async (user, t) => { // أضف t كوسيط
  const isConfirmed = window.confirm(t("profile.confirmSave"));

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

// import axios from "axios";
// import { toast } from "react-toastify";



// export const handleSave = async (user) => {
//   // استرجاع التوكن من localStorage
//   // const api_token = localStorage.getItem("api_token");
//   const api_token = localStorage.getItem("token");
//   // const api_token = localStorage.getItem("api_token");

//   const isConfirmed = window.confirm(
//     "Are you sure you want to save these changes?"
//   );

//   if (!isConfirmed) {
//     return;
//   }

//   try {
//     const APIURL = `/profile/update?name=${user.user_name}&phone=${user.phone}&email=${user.email}&api_token=${api_token}`;
//     const response = await axios.post(`${BASE_URL}${APIURL}`);

//     if (response.data) {
//       localStorage.setItem("user", JSON.stringify(user));

//       window.location.reload();

//       localStorage.setItem("profileUpdateSuccess", "true");
//     } else {
//       throw new Error("Update failed");
//     }
//   } catch (error) {
//     toast.error("Failed to update profile.");
//     console.error("Error updating profile: ", error);
//   }
// };
