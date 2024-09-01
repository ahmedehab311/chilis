import { BASE_URL } from "../../../setting.jsx";
const getApiToken = () => localStorage.getItem("token");
const API_CITIES = `${BASE_URL}/cities`;
const API_AREAS = `${BASE_URL}/areas?city=`;
const API_ADDRESS = () =>
  `${BASE_URL}/profile/address?api_token=${getApiToken()}`;
const API_ADD_ADDRESS = `${BASE_URL}/profile/address/add?`;
const API_DELETE_ADDRESS = (id) =>
  `${BASE_URL}/profile/address/delete/${id}?api_token=${getApiToken()}`;
export {
  getApiToken,
  API_AREAS,
  API_CITIES,
  API_ADDRESS,
  API_ADD_ADDRESS,
  API_DELETE_ADDRESS,
};
