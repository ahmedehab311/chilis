import axios from "axios";
// const BASE_URL_images = "https://myres.me/chilis/";
import { BASE_URL } from "../../setting.jsx";
export const fetchIamgeSlider = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/slider/1`);

    return response.data.data.slider;
  } catch (error) {
    console.error("Error fetching Orders:", error);
    throw error;
  }
};
