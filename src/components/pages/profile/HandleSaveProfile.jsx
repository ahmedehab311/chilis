import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../setting";
export const HandleSave = async (user, t) => {
  try {
    const api_token = localStorage.getItem("token");
    const APIURL = `/profile/update?name=${user.user_name}&phone=${user.phone}&email=${user.email}&api_token=${api_token}`;
    const response = await axios.post(`${BASE_URL}${APIURL}`);
    if (response?.data) {
      localStorage.setItem("user", JSON.stringify(user));
      // window.location.reload();
      localStorage.removeItem("profileUpdateSuccess");
      localStorage.setItem("token", response?.data?.data?.token);
      toast.success(t("profile.updateSuccess"));
    } else {
      throw new Error("Update failed");
    }
  } catch (error) {
    toast.error("Failed to update profile.");
    console.error("Error updating profile: ", error);
  }
};
