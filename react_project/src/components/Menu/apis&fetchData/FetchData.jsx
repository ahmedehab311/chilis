import axios from "axios";
import { APIURL } from "./ApiLinks";

export const fetchData = async () => {
  try {
    const response = await axios.get(APIURL);
    // console.log(response.data.data.menu[0]);
    return response.data.data.menu[0].sections || [];
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; 
  }
};
