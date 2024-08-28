// const BASE_URL = "https://myres.me/chilis-dev";
// const API_CITIES = `${BASE_URL}/api/cities`;
// const API_AREAS = `${BASE_URL}/api/areas?city=`;
// const API_ADDRESS = `${BASE_URL}/api/profile/address?api_token=${api_token}`;
// const API_ADD_ADDRESS = `${BASE_URL}/api/profile/address/add?`;
// const API_DELETE_ADDRESS = (id) =>
//   `${BASE_URL}/api/profile/address/delete/${id}?api_token=${api_token}`;
// export {
//   getApiToken,
//   API_AREAS,
//   API_CITIES,
//   API_ADDRESS,
//   API_ADD_ADDRESS,
//   API_DELETE_ADDRESS,
// };
const getApiToken = () => localStorage.getItem("token");

const BASE_URL = "https://myres.me/chilis-dev";
const API_CITIES = `${BASE_URL}/api/cities`;
const API_AREAS = `${BASE_URL}/api/areas?city=`;
const API_ADDRESS = () => `${BASE_URL}/api/profile/address?api_token=${getApiToken()}`;
const API_ADD_ADDRESS = `${BASE_URL}/api/profile/address/add?`;
const API_DELETE_ADDRESS = (id) =>
  `${BASE_URL}/api/profile/address/delete/${id}?api_token=${getApiToken()}`;
export {
  getApiToken,
  API_AREAS,
  API_CITIES,
  API_ADDRESS,
  API_ADD_ADDRESS,
  API_DELETE_ADDRESS,
};
